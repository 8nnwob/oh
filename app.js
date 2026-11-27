const WORDS = [
  { word: 'deliberate', ipa: '/dɪˈlɪbərət/', type: 'ADJECTIVE', level: 'B2', topic: 'thinking', meaning: '深思熟慮的；故意的', example: 'She made a <strong>deliberate</strong> choice to slow down.', translation: '她慎重地做了放慢腳步的選擇。', synonyms: 'intentional, considered', usage: 'deliberate decision / action；也可作動詞，表示「仔細考慮」。' },
  { word: 'resilient', ipa: '/rɪˈzɪliənt/', type: 'ADJECTIVE', topic: 'growth', meaning: '有韌性的；能迅速復原的', example: 'Children are often surprisingly <strong>resilient</strong>.', translation: '孩子往往有著驚人的復原力。', synonyms: 'tough, adaptable', usage: 'resilient to change；形容人或系統從困難中恢復的能力。' },
  { word: 'subtle', ipa: '/ˈsʌtəl/', type: 'ADJECTIVE', level: 'C2', topic: 'thinking', meaning: '微妙的；不易察覺的', example: 'There is a <strong>subtle</strong> difference in the two shades.', translation: '這兩種色調之間有細微的差別。', synonyms: 'delicate, understated', usage: 'a subtle change / hint / flavor；通常指細緻而不明顯。' },
  { word: 'sustain', ipa: '/səˈsteɪn/', type: 'VERB', level: 'C2', topic: 'growth', meaning: '維持；支撐；承受', example: 'Small habits help <strong>sustain</strong> long-term progress.', translation: '小習慣有助於維持長期進步。', synonyms: 'maintain, support', usage: 'sustain growth / attention / an injury；依語境可指維持或承受。' },
  { word: 'concise', ipa: '/kənˈsaɪs/', type: 'ADJECTIVE', topic: 'communication', meaning: '簡潔的；言簡意賅的', example: 'Please keep your summary clear and <strong>concise</strong>.', translation: '請讓摘要保持清楚簡潔。', synonyms: 'brief, succinct', usage: 'a concise explanation / summary；強調用較少文字說清楚。' },
  { word: 'inevitable', ipa: '/ɪnˈevɪtəbəl/', type: 'ADJECTIVE', level: 'C1', topic: 'thinking', meaning: '不可避免的；必然發生的', example: 'Some mistakes are <strong>inevitable</strong> when learning.', translation: '學習時有些錯誤在所難免。', synonyms: 'unavoidable, certain', usage: 'It is inevitable that...；常描述無法避免的結果。' },
  { word: 'coherent', ipa: '/koʊˈhɪrənt/', type: 'ADJECTIVE', level: 'C2', topic: 'communication', meaning: '連貫的；有條理的', example: 'The report presents a <strong>coherent</strong> argument.', translation: '這份報告提出了有條理的論點。', synonyms: 'logical, consistent', usage: 'a coherent argument / explanation；指各部分彼此連接、整體合理。' },
  { word: 'nuance', ipa: '/ˈnuːɑːns/', type: 'NOUN', topic: 'communication', meaning: '細微差異；微妙之處', example: 'The translation captures the <strong>nuance</strong> of the original.', translation: '這個譯文捕捉到了原文的微妙之處。', synonyms: 'subtlety, distinction', usage: 'a nuance of meaning；常指不容易用單一字詞表達的細節。' },
  { word: 'foster', ipa: '/ˈfɑːstər/', type: 'VERB', topic: 'growth', meaning: '培養；促進；鼓勵', example: 'Reading together can <strong>foster</strong> curiosity.', translation: '一起閱讀能培養好奇心。', synonyms: 'nurture, encourage', usage: 'foster trust / creativity / growth；帶有逐步培育、促進之意。' },
  { word: 'pragmatic', ipa: '/præɡˈmætɪk/', type: 'ADJECTIVE', topic: 'thinking', meaning: '務實的；講求實際的', example: 'We need a <strong>pragmatic</strong> solution that works today.', translation: '我們需要一個今天就行得通的務實方案。', synonyms: 'practical, realistic', usage: 'a pragmatic approach / solution；著眼於可行結果，而非理論。' },
  { word: 'ambiguous', ipa: '/æmˈbɪɡjuəs/', type: 'ADJECTIVE', level: 'C2', topic: 'communication', meaning: '模稜兩可的；含糊不清的', example: 'The instructions were too <strong>ambiguous</strong> to follow.', translation: '這些指示太含糊，讓人無所適從。', synonyms: 'unclear, vague', usage: 'an ambiguous statement；可能有不只一種解讀。' },
  { word: 'convey', ipa: '/kənˈveɪ/', type: 'VERB', level: 'C1', topic: 'communication', meaning: '傳達；表達；運送', example: 'A simple gesture can <strong>convey</strong> a lot.', translation: '一個簡單的手勢就能傳達很多意思。', synonyms: 'communicate, express', usage: 'convey a message / feeling / idea；著重把訊息從一方傳到另一方。' },
  { word: 'persuasive', ipa: '/pəˈsweɪsɪv/', type: 'ADJECTIVE', level: 'C1', topic: 'communication', meaning: '有說服力的；能使人信服的', example: 'She gave a <strong>persuasive</strong> explanation for the change.', translation: '她對這項改變提出了有說服力的解釋。', synonyms: 'convincing, compelling', usage: 'a persuasive argument / speaker；描述能讓人相信或採取行動的表達。' },
  { word: 'clarify', ipa: '/ˈklærɪfaɪ/', type: 'VERB', level: 'C1', topic: 'communication', meaning: '澄清；說明清楚', example: 'Could you <strong>clarify</strong> what you mean by “flexible”?', translation: '你可以說明「有彈性」的意思嗎？', synonyms: 'explain, make clear', usage: 'clarify a point / meaning；常用來請人補充細節或簡化說明。' },
  { word: 'analytical', ipa: '/ˌænəˈlɪtɪkəl/', type: 'ADJECTIVE', level: 'C1', topic: 'thinking', meaning: '善於分析的；分析性的', example: 'An <strong>analytical</strong> approach helped the team find the cause.', translation: '分析性的做法幫助團隊找到原因。', synonyms: 'logical, systematic', usage: 'an analytical mind / approach；強調仔細拆解資訊來理解問題。' },
  { word: 'evaluate', ipa: '/ɪˈvæljueɪt/', type: 'VERB', level: 'C1', topic: 'thinking', meaning: '評估；判斷價值或成效', example: 'We need to <strong>evaluate</strong> each option before deciding.', translation: '做決定前，我們需要評估每個選項。', synonyms: 'assess, appraise', usage: 'evaluate a result / option / performance；根據標準判斷品質或重要性。' },
  { word: 'infer', ipa: '/ɪnˈfɜr/', type: 'VERB', level: 'C2', topic: 'thinking', meaning: '推斷；根據資訊得出結論', example: 'From the clues, we can <strong>infer</strong> that the meeting was moved.', translation: '從這些線索，我們可以推斷會議改了時間。', synonyms: 'deduce, conclude', usage: 'infer something from evidence；聽者或讀者推論出來，與說話者「暗示」不同。' },
  { word: 'sustainable', ipa: '/səˈsteɪnəbəl/', type: 'ADJECTIVE', level: 'C1', topic: 'growth', meaning: '可持續的；能長期維持的', example: 'A <strong>sustainable</strong> routine leaves room for rest.', translation: '可持續的日常安排也會留出休息空間。', synonyms: 'maintainable, long-term', usage: 'sustainable growth / change；描述能長期延續的狀態或做法。' }
];

const STORAGE_KEY = 'words-daily-v1';
const $ = id => document.getElementById(id);
const dateKey = (date = new Date()) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
const initialState = () => ({ known: {}, again: {}, completed: [], streak: 0, lastDay: '', sessionDate: '', sessionQueue: [], sessionPosition: 0, quizMode: 'englishToChinese', dailyNewCount: 5, topic: 'all' });
const validDate = value => {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
};
const cleanDates = value => Object.fromEntries(Object.entries(value && typeof value === 'object' && !Array.isArray(value) ? value : {}).filter(([index, date]) => Number.isInteger(Number(index)) && Number(index) >= 0 && Number(index) < WORDS.length && validDate(date)));
function normalizeState(source) {
  if (!source || typeof source !== 'object' || Array.isArray(source)) return initialState();
  const cleanQueue = Array.isArray(source.sessionQueue) ? [...new Set(source.sessionQueue.filter(index => Number.isInteger(index) && index >= 0 && index < WORDS.length))] : [];
  return {
    ...initialState(),
    known: cleanDates(source.known),
    again: cleanDates(source.again),
    completed: Array.isArray(source.completed) ? [...new Set(source.completed.filter(validDate))] : [],
    streak: Number.isInteger(source.streak) && source.streak >= 0 ? source.streak : 0,
    lastDay: validDate(source.lastDay) ? source.lastDay : '',
    sessionDate: validDate(source.sessionDate) ? source.sessionDate : '',
    sessionQueue: cleanQueue,
    sessionPosition: Number.isInteger(source.sessionPosition) ? Math.max(0, Math.min(source.sessionPosition, cleanQueue.length)) : 0,
    quizMode: ['englishToChinese', 'chineseToEnglish'].includes(source.quizMode) ? source.quizMode : 'englishToChinese',
    dailyNewCount: [3, 5, 8].includes(source.dailyNewCount) ? source.dailyNewCount : 5,
    topic: ['all', 'communication', 'thinking', 'growth'].includes(source.topic) ? source.topic : 'all'
  };
}
function load() {
  try { return normalizeState(JSON.parse(localStorage.getItem(STORAGE_KEY))); }
  catch { return initialState(); }
}
let state = load();
let queue = [];
let position = 0;
let revealed = false;
function save() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }

function startSession() {
  const today = dateKey();
  if (state.completed.includes(today)) {
    queue = [];
    position = 0;
  } else if (state.sessionDate === today && Array.isArray(state.sessionQueue)) {
    queue = state.sessionQueue;
    position = state.sessionPosition || 0;
  } else {
    const known = Object.keys(state.known).map(Number);
    const again = Object.keys(state.again).filter(i => state.again[i] <= today).map(Number);
    const due = known.filter(i => state.known[i] <= today);
    const fresh = WORDS.map((word, i) => ({ word, i })).filter(entry => !known.includes(entry.i) && !again.includes(entry.i) && (state.topic === 'all' || entry.word.topic === state.topic)).map(entry => entry.i);
    queue = [...new Set([...again, ...due, ...fresh.slice(0, state.dailyNewCount)])];
    position = 0;
    state.sessionDate = today;
    state.sessionQueue = queue;
    state.sessionPosition = 0;
    save();
  }
  revealed = false;
  render();
}

function updateStats() {
  const today = dateKey();
  $('learned-count').textContent = Object.keys(state.known).length;
  $('due-count').textContent = Object.values(state.known).filter(date => date <= today).length + Object.values(state.again).filter(date => date <= today).length;
  $('streak-count').textContent = state.streak || 0;
  $('today').textContent = new Date().toLocaleDateString('zh-TW', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'short' });
}

function completeSession() {
  const today = dateKey();
  if (!queue.length || state.completed.includes(today)) return;
  state.completed.push(today);
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  state.streak = state.lastDay === dateKey(yesterday) ? (state.streak || 0) + 1 : 1;
  state.lastDay = today;
  save();
}

function render() {
  updateStats();
  const card = $('word-card');
  const actions = $('actions');
  const total = queue.length;
  $('progress-label').textContent = total ? `${String(Math.min(position + 1, total)).padStart(2, '0')} / ${String(total).padStart(2, '0')}` : 'DONE';
  $('progress-bar').style.width = `${total ? Math.min(position / total * 100, 100) : 100}%`;

  if (position >= total) {
    completeSession();
    updateStats();
    $('session-label').textContent = 'SESSION COMPLETE';
    $('session-title').textContent = '今天的練習';
    card.innerHTML = `<div class="empty-state"><div class="check">${total ? '✓' : '✳'}</div><h3>${total ? '今天完成得很好。' : '今天沒有待辦單字。'}</h3><p>${total ? '已更新你的學習進度，明天再繼續累積。' : '明天再來看看有沒有新字與複習內容。'}</p></div>`;
    actions.innerHTML = '';
    return;
  }

  $('session-label').textContent = 'TODAY\'S SESSION';
  $('session-title').textContent = '今天的單字';
  const word = WORDS[queue[position]];
  const topicFilter = $('topic-filter');
  topicFilter.value = state.topic;
  topicFilter.onchange = () => { state.topic = topicFilter.value; save(); };
  const dailyLimit = $('daily-limit');
  dailyLimit.value = String(state.dailyNewCount || 5);
  dailyLimit.onchange = () => { state.dailyNewCount = Number(dailyLimit.value); save(); };
  const modeSelect = $('quiz-mode');
  modeSelect.value = state.quizMode;
  modeSelect.onchange = () => { state.quizMode = modeSelect.value; save(); revealed = false; render(); };
  const prompt = state.quizMode === 'chineseToEnglish'
    ? `<div class="meaning prompt-meaning">${word.meaning}</div><span class="word-type">${word.type}${word.level ? ` · CEFR ${word.level}` : ''}</span>`
    : `<div class="word">${word.word}</div><div class="ipa">${word.ipa}</div>`;
  card.innerHTML = revealed
    ? `<div class="word-top"><div><div class="word">${word.word}</div><div class="ipa">${word.ipa}</div></div><span class="word-type">${word.type}${word.level ? ` · CEFR ${word.level}` : ''}</span></div><div class="meaning">${word.meaning}</div><div class="example">${word.example}<div class="example-zh">${word.translation}</div></div><div class="details"><div class="detail"><b>SIMILAR WORDS</b>${word.synonyms}</div><div class="detail"><b>USAGE NOTE</b>${word.usage}</div></div><span class="word-index">WORD ${String(queue[position] + 1).padStart(2, '0')}</span>`
    : `<div class="prompt-area">${prompt}<div class="reveal-hint">先試著回想${state.quizMode === 'chineseToEnglish' ? '英文單字' : '中文意思'}，再翻開單字卡 ✦</div></div><span class="word-index">WORD ${String(queue[position] + 1).padStart(2, '0')}</span>`;
  actions.innerHTML = revealed
    ? '<button class="button secondary" data-result="again">再練一次 · 明天</button><button class="button" data-result="known">熟悉 · 安排複習</button>'
    : '<button class="button" id="reveal">翻開答案</button>';
  const revealButton = $('reveal');
  if (revealButton) revealButton.onclick = () => { revealed = true; render(); };
  actions.querySelectorAll('[data-result]').forEach(button => button.onclick = () => mark(button.dataset.result, queue[position]));
}

function mark(result, index) {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const inTwoDays = new Date();
  inTwoDays.setDate(inTwoDays.getDate() + 2);
  if (result === 'known') {
    delete state.again[index];
    state.known[index] = dateKey(inTwoDays);
  } else {
    delete state.known[index];
    state.again[index] = dateKey(tomorrow);
  }
  position++;
  state.sessionPosition = position;
  save();
  revealed = false;
  render();
}

$('quiz-mode').value = state.quizMode;
$('export-button').onclick = () => {
  const backup = { format: 'words-daily-progress', version: 1, exportedAt: new Date().toISOString(), state };
  const blobUrl = URL.createObjectURL(new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' }));
  const link = document.createElement('a');
  link.href = blobUrl;
  link.download = `words-daily-progress-${dateKey()}.json`;
  link.click();
  URL.revokeObjectURL(blobUrl);
};
$('import-file').onchange = async event => {
  const file = event.target.files[0];
  if (!file) return;
  try {
    const backup = JSON.parse(await file.text());
    if (backup.format !== 'words-daily-progress' || backup.version !== 1 || !backup.state || typeof backup.state !== 'object') throw new Error('格式不支援');
    if (!confirm('匯入會取代這台裝置目前的學習進度。確定繼續嗎？')) return;
    const source = backup.state;
    state = normalizeState(source);
    save();
    startSession();
  } catch {
    alert('無法匯入這份進度檔。請選擇由字日匯出的 JSON 備份。');
  } finally {
    event.target.value = '';
  }
};
$('reset-button').onclick = () => {
  if (confirm('確定清除這台裝置上的學習進度？')) {
    localStorage.removeItem(STORAGE_KEY);
    state = load();
    startSession();
  }
};
startSession();
