const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const appSource = fs.readFileSync(path.join(__dirname, '..', 'app.js'), 'utf8');

function boot(initialState) {
  const elements = new Map();
  const getElement = id => {
    if (!elements.has(id)) {
      elements.set(id, {
        value: '', textContent: '', innerHTML: '', style: {}, dataset: {},
        addEventListener() {}, querySelectorAll() { return []; }, click() {}
      });
    }
    return elements.get(id);
  };
  const storage = new Map(initialState ? [['words-daily-v1', JSON.stringify(initialState)]] : []);
  const context = {
    document: { getElementById: getElement, createElement: () => ({ click() {} }) },
    localStorage: {
      getItem: key => storage.get(key) ?? null,
      setItem: (key, value) => storage.set(key, value),
      removeItem: key => storage.delete(key)
    },
    URL: { createObjectURL() {}, revokeObjectURL() {} },
    Blob: class {},
    Date, Math, Number, String, Object, Array, JSON, Set, confirm: () => true, alert() {}
  };
  vm.runInNewContext(appSource, context, { filename: 'app.js' });
  return JSON.parse(storage.get('words-daily-v1'));
}

test('daily new word quota is separate from due reviews', () => {
  const state = boot({
    known: { 0: '2000-01-01' },
    again: { 1: '2000-01-01' },
    dailyNewCount: 3,
    sessionDate: '',
    sessionQueue: []
  });

  assert.deepEqual(state.sessionQueue, [1, 0, 2, 3, 4]);
});

test('stored state drops invalid word indices and bounds the session position', () => {
  const state = boot({
    known: { 999: '2000-01-01', 0: '2000-01-01' },
    sessionDate: `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')}`,
    sessionQueue: [0, 999, 1],
    sessionPosition: 99
  });

  assert.deepEqual(state.sessionQueue, [0, 1]);
  assert.equal(state.sessionPosition, 2);
  assert.deepEqual(state.known, { 0: '2000-01-01' });
});
