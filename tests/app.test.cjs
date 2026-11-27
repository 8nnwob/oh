const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const appSource = fs.readFileSync(path.join(__dirname, '..', 'app.js'), 'utf8');
const sourceList = fs.readFileSync(path.join(__dirname, '..', 'knowledge', 'vocabulary-sources.md'), 'utf8');

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
  const alerts = [];
  const blobs = [];
  const downloads = [];
  const utterances = [];
  let cancelCount = 0;
  const context = {
    document: { getElementById: getElement, createElement: () => ({ click() { downloads.push({ href: this.href, download: this.download }); } }) },
    localStorage: {
      getItem: key => storage.get(key) ?? null,
      setItem: (key, value) => storage.set(key, value),
      removeItem: key => storage.delete(key)
    },
    URL: { createObjectURL: blob => { blobs.push(blob); return 'blob:backup'; }, revokeObjectURL() {} },
    Blob: class { constructor(parts, options) { this.parts = parts; this.type = options.type; } },
    SpeechSynthesisUtterance: class { constructor(text) { this.text = text; this.lang = ''; } },
    speechSynthesis: { cancel() { cancelCount += 1; }, speak(utterance) { utterances.push(utterance); } },
    Date, Math, Number, String, Object, Array, JSON, Set, confirm: () => true, alert: message => alerts.push(message)
  };
  vm.runInNewContext(`${appSource}\nglobalThis.__WORDS = WORDS;`, context, { filename: 'app.js' });
  return { state: JSON.parse(storage.get('words-daily-v1')), words: context.__WORDS, storage, elements, alerts, blobs, downloads, utterances, getCancelCount: () => cancelCount };
}

test('daily new word quota is separate from due reviews', () => {
  const { state } = boot({
    known: { 0: '2000-01-01' },
    again: { 1: '2000-01-01' },
    dailyNewCount: 3,
    sessionDate: '',
    sessionQueue: []
  });

  assert.deepEqual(state.sessionQueue, [1, 0, 2, 3, 4]);
});

test('stored state drops invalid word indices and bounds the session position', () => {
  const { state } = boot({
    known: { 999: '2000-01-01', '01': '2000-01-01', 0: '2000-01-01', 2: '2025-02-31' },
    sessionDate: `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')}`,
    sessionQueue: [0, 999, 1],
    sessionPosition: 99
  });

  assert.deepEqual(state.sessionQueue, [0, 1]);
  assert.equal(state.sessionPosition, 2);
  assert.deepEqual(state.known, { 0: '2000-01-01', 1: '2000-01-01' });
});

test('dictionary additions are appended and CEFR labels use known levels', () => {
  const { words } = boot();

  assert.equal(words.length, 24);
  assert.deepEqual(Array.from(words.slice(12), word => word.word), [
    'persuasive', 'clarify', 'analytical', 'evaluate', 'infer', 'sustainable',
    'negotiate', 'specify', 'assess', 'adapt', 'initiative', 'thrive'
  ]);
  assert.ok(words.every(word => word.level === undefined || ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].includes(word.level)));
  const documentedWords = new Set(Array.from(sourceList.matchAll(/^\| ([a-z]+) \| (?:A1|A2|B1|B2|C1|C2) \|/gm), match => match[1]));
  const taggedWords = Array.from(words).filter(word => word.level).map(word => word.word);
  assert.deepEqual(taggedWords.filter(word => !documentedWords.has(word)), []);
  assert.equal(documentedWords.size, taggedWords.length);
  const topicCounts = Array.from(words).reduce((counts, word) => ({ ...counts, [word.topic]: (counts[word.topic] || 0) + 1 }), {});
  assert.deepEqual(topicCounts, { thinking: 8, growth: 7, communication: 9 });
});

test('progress import sanitizes invalid dates, indices, and settings before restoring', async () => {
  const { storage, elements } = boot();
  const today = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')}`;
  const target = {
    value: 'backup.json',
    files: [{ text: async () => JSON.stringify({
      format: 'words-daily-progress', version: 1,
      state: {
        known: { '01': '2000-01-01', 999: '2000-01-01', 2: '2025-02-31' },
        again: [], completed: ['2025-02-31'], streak: -3,
        sessionDate: today, sessionQueue: [0, 999, 1], sessionPosition: 99,
        quizMode: 'invalid', dailyNewCount: 10, topic: 'invalid'
      }
    }) }]
  };

  await elements.get('import-file').onchange({ target });
  const state = JSON.parse(storage.get('words-daily-v1'));
  assert.deepEqual(state.known, { 1: '2000-01-01' });
  assert.deepEqual(state.completed, [today]);
  assert.equal(state.streak, 1);
  assert.deepEqual(state.sessionQueue, [0, 1]);
  assert.equal(state.sessionPosition, 2);
  assert.equal(state.quizMode, 'englishToChinese');
  assert.equal(state.dailyNewCount, 5);
  assert.equal(state.topic, 'all');
  assert.equal(target.value, '');
});

test('progress import rejects an unsupported backup format without changing state', async () => {
  const { storage, elements, alerts } = boot();
  const before = storage.get('words-daily-v1');
  const target = { value: 'bad.json', files: [{ text: async () => JSON.stringify({ format: 'unknown', version: 1, state: {} }) }] };

  await elements.get('import-file').onchange({ target });
  assert.equal(storage.get('words-daily-v1'), before);
  assert.equal(alerts.length, 1);
  assert.equal(target.value, '');
});

test('progress export creates a versioned JSON backup download', () => {
  const { elements, blobs, downloads } = boot();

  elements.get('export-button').onclick();
  assert.equal(blobs.length, 1);
  assert.equal(blobs[0].type, 'application/json');
  const backup = JSON.parse(blobs[0].parts[0]);
  assert.equal(backup.format, 'words-daily-progress');
  assert.equal(backup.version, 1);
  assert.ok(backup.exportedAt);
  assert.ok(backup.state);
  assert.match(downloads[0].download, /^words-daily-progress-\d{4}-\d{2}-\d{2}\.json$/);
  assert.equal(downloads[0].href, 'blob:backup');
});

test('English pronunciation uses speech synthesis and cancels overlapping speech', () => {
  const { elements, utterances, getCancelCount } = boot();

  assert.match(elements.get('word-card').innerHTML, /id="pronounce"/);
  elements.get('pronounce').onclick();
  assert.equal(utterances.length, 1);
  assert.equal(utterances[0].text, 'deliberate');
  assert.equal(utterances[0].lang, 'en-US');
  assert.equal(getCancelCount(), 1);
});

test('Chinese-to-English hides pronunciation until answer reveal', () => {
  const { elements, utterances } = boot({ quizMode: 'chineseToEnglish' });
  const card = elements.get('word-card');

  assert.doesNotMatch(card.innerHTML, /id="pronounce"/);
  assert.doesNotMatch(card.innerHTML, /deliberate/);
  elements.get('reveal').onclick();
  assert.match(card.innerHTML, /id="pronounce"/);
  assert.match(card.innerHTML, /deliberate/);
  elements.get('pronounce').onclick();
  assert.equal(utterances[0].text, 'deliberate');
});
