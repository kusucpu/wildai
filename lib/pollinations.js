// ── Chat ──────────────────────────────────────────────────────────

export function getByopKey() {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('byop_key') || null
}

export function setByopKey(key) {
  if (typeof window === 'undefined') return
  if (key) localStorage.setItem('byop_key', key)
  else localStorage.removeItem('byop_key')
}

export async function chat(messages, model = 'mistral', system = '') {
  const byopKey = getByopKey()

  const headers = { 'Content-Type': 'application/json' }
  if (byopKey) headers['x-byop-key'] = byopKey

  const res = await fetch('/api/chat', {
    method: 'POST',
    headers,
    body: JSON.stringify({ messages, model, system })
  })

  if (res.status === 402) throw new Error('quota_exceeded')
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error || 'api_error')
  }

  const data = await res.json()
  return data.content
}

// ── Image ─────────────────────────────────────────────────────────
// Free models: flux, zimage, klein — no key needed

const IMAGE_BASE = 'https://gen.pollinations.ai/image'

export function buildImageUrl(prompt, opts = {}) {
  const {
    model = 'flux',
    width = 1024,
    height = 1024,
    seed = -1,
    enhance = false,
    negativePrompt = ''
  } = opts

  const p = new URLSearchParams({
    model,
    width: String(width),
    height: String(height),
    seed: seed === -1 ? String(Math.floor(Math.random() * 999999)) : String(seed),
    enhance: String(enhance),
    nologo: 'true'
  })
  if (negativePrompt) p.set('negative_prompt', negativePrompt)

  return `${IMAGE_BASE}/${encodeURIComponent(prompt)}?${p}`
}

export const FREE_IMAGE_MODELS = [
  { id: 'flux', name: 'Flux Schnell', desc: 'fast, high quality' },
  { id: 'zimage', name: 'Z-Image Turbo', desc: '2x upscale, sharp' },
  { id: 'klein', name: 'FLUX.2 Klein', desc: 'alpha, creative' }
]

export const FREE_CHAT_MODELS = [
  { id: 'qwen-safety', name: 'Qwen Guard', note: 'cheapest, safe' },
  { id: 'nova-fast', name: 'Nova Micro', note: 'ultra fast' },
  { id: 'mistral', name: 'Mistral Small', note: 'balanced ✨' },
  { id: 'openai-fast', name: 'GPT-5 Nano', note: 'smart fast' },
  { id: 'gemini-fast', name: 'Gemini Flash', note: 'google, vision' },
  { id: 'grok', name: 'Grok Fast', note: 'real-time vibes' },
  { id: 'qwen-coder', name: 'Qwen Coder', note: 'code stuff' },
]

export const RATIOS = [
  { id: '1:1',   label: 'Square',      w: 1024, h: 1024 },
  { id: '3:4',   label: 'Portrait',    w: 768,  h: 1024 },
  { id: '4:3',   label: 'Landscape',   w: 1024, h: 768  },
  { id: '9:16',  label: 'Story',       w: 576,  h: 1024 },
  { id: '16:9',  label: 'Widescreen',  w: 1024, h: 576  },
]

export const STYLE_SUFFIXES = {
  none:       '',
  artistic:   ', artistic, painterly, expressive brushwork',
  realistic:  ', photorealistic, DSLR, 8k, sharp focus',
  '3d':       ', 3D render, octane, volumetric lighting, CGI',
  anime:      ', anime style, vibrant, cel shaded, Studio Ghibli',
  pixel:      ', pixel art, 16-bit, retro game sprite',
  cyberpunk:  ', cyberpunk, neon city, rain, blade runner',
  fantasy:    ', epic fantasy, magical, detailed environment',
  watercolor: ', watercolor painting, soft edges, pastel tones',
  sketch:     ', pencil sketch, lineart, monochrome illustration',
  logo:       ', vector logo design, clean, minimal, flat design',
  cinematic:  ', cinematic lighting, film grain, anamorphic lens',
}

// backward compat shim
export const pollinations = {
  get pollenKey() { return getByopKey() },
  setPollenKey: setByopKey,
  chat,
}
