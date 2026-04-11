const CHAT_KEY = 'wai_chat'
const IMG_KEY = 'wai_img'
const MAX_CHAT = 100
const MAX_IMG = 200

function safeGet(key) {
  try { return JSON.parse(localStorage.getItem(key) || '[]') }
  catch { return [] }
}
function safeSet(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)) }
  catch (e) { console.warn('storage full', e) }
}

function calcSize() {
  let total = 0
  for (const k in localStorage) {
    if (Object.prototype.hasOwnProperty.call(localStorage, k)) {
      total += (localStorage[k].length + k.length) * 2
    }
  }
  return total
}

export const storage = {
  // ── Chat ──
  getChats() { return safeGet(CHAT_KEY) },

  addChat({ mode, model, messages }) {
    const history = this.getChats()
    const first = messages.find(m => m.role === 'user')
    history.unshift({
      id: Date.now(),
      ts: new Date().toISOString(),
      mode,
      model,
      preview: first?.content?.slice(0, 80) || 'no preview',
      messages
    })
    safeSet(CHAT_KEY, history.slice(0, MAX_CHAT))
  },

  deleteChat(id) {
    safeSet(CHAT_KEY, this.getChats().filter(c => c.id !== id))
  },

  clearChats() { localStorage.removeItem(CHAT_KEY) },

  // ── Images ──
  getImages() { return safeGet(IMG_KEY) },

  addImage(img) {
    const history = this.getImages()
    history.unshift({ id: Date.now(), ts: new Date().toISOString(), ...img })
    safeSet(IMG_KEY, history.slice(0, MAX_IMG))
  },

  deleteImage(id) {
    safeSet(IMG_KEY, this.getImages().filter(i => i.id !== id))
  },

  clearImages() { localStorage.removeItem(IMG_KEY) },

  // ── Stats ──
  getStats() {
    const used = calcSize()
    const max = 100 * 1024 * 1024
    return {
      usedMB: (used / 1024 / 1024).toFixed(1),
      totalMB: '100',
      pct: Math.min(100, (used / max * 100)).toFixed(0)
    }
  }
}
