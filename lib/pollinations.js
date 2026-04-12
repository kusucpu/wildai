export function getByopKey() {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('byop_key') || null
}

export function setByopKey(key) {
  if (typeof window === 'undefined') return
  if (key) localStorage.setItem('byop_key', key)
  else localStorage.removeItem('byop_key')
}

export async function chat(messages, model = 'nova-fast', system = '') {
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

export async function generateImage(prompt, opts = {}) {
  const byopKey = getByopKey()
  const headers = { 'Content-Type': 'application/json' }
  if (byopKey) headers['x-byop-key'] = byopKey

  const { model = 'flux', width = 1024, height = 1024, enhance = false, negativePrompt = '' } = opts
  const seed = Math.floor(Math.random() * 999999) // always random

  const res = await fetch('/api/image', {
    method: 'POST',
    headers,
    body: JSON.stringify({ prompt, model, width, height, seed, enhance, negativePrompt })
  })

  if (!res.ok) throw new Error('image generation failed')
  const data = await res.json()
  return data.url
}

export const FREE_IMAGE_MODELS = [
  { id: 'flux',   name: 'Flux Schnell',  desc: 'fast, high quality' },
  { id: 'zimage', name: 'Z-Image Turbo', desc: 'sharp, 2x upscale' },
  { id: 'klein',  name: 'FLUX.2 Klein',  desc: 'creative, alpha' }
]

export const FREE_CHAT_MODELS = [
  { id: 'nova-fast',    name: 'Nova Micro',    note: 'default, ultra fast' },
  { id: 'qwen-safety',  name: 'Qwen Guard',    note: 'cheapest, safe' },
  { id: 'mistral',      name: 'Mistral Small', note: 'balanced' },
  { id: 'openai-fast',  name: 'GPT-5 Nano',    note: 'smart fast' },
  { id: 'gemini-fast',  name: 'Gemini Flash',  note: 'google, vision' },
  { id: 'grok',         name: 'Grok Fast',     note: 'real-time' },
  { id: 'qwen-coder',   name: 'Qwen Coder',    note: 'code stuff' },
]

export const RATIOS = [
  { id: '1:1',  label: 'Square',     w: 1024, h: 1024 },
  { id: '3:4',  label: 'Portrait',   w: 768,  h: 1024 },
  { id: '4:3',  label: 'Landscape',  w: 1024, h: 768  },
  { id: '9:16', label: 'Story',      w: 576,  h: 1024 },
  { id: '16:9', label: 'Widescreen', w: 1024, h: 576  },
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

export const RANDOM_PROMPTS = [
  'a dragon made of stained glass flying over a neon Tokyo at night',
  'cozy underground library lit by bioluminescent mushrooms',
  'astronaut eating instant noodles on the moon, lo-fi aesthetic',
  'a cat wearing a tiny business suit presenting at a board meeting',
  'vintage robot sitting on a park bench feeding pigeons, watercolor',
  'underwater city with jellyfish as street lights, cinematic',
  'wolf made of northern lights running through a pine forest',
  'tiny village inside a snow globe, macro photography',
  'samurai frog meditating on a lily pad, ukiyo-e style',
  'cloud kingdom above the storm, golden hour, epic fantasy',
  'coffee shop on Saturn\'s rings, cozy, warm lighting',
  'an old lighthouse keeper who is secretly a mermaid, painterly',
  'robot graveyard at sunset, rust and wildflowers, melancholic',
  'street market on a floating island, anime style, vibrant',
]

// backward compat
export const pollinations = {
  get pollenKey() { return getByopKey() },
  setPollenKey: setByopKey,
  chat,
}
