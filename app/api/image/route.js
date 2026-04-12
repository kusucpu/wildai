import { NextResponse } from 'next/server'

export async function POST(req) {
  try {
    const { prompt, model, width, height, seed, enhance, negativePrompt } = await req.json()
    const byopKey = req.headers.get('x-byop-key')
    const apiKey = byopKey || process.env.POLLINATIONS_API_KEY

    const params = new URLSearchParams({
      model: model || 'flux',
      width: String(width || 1024),
      height: String(height || 1024),
      seed: String(seed ?? Math.floor(Math.random() * 999999)),
      nologo: 'true',
      enhance: String(enhance || false),
    })
    if (negativePrompt) params.set('negative_prompt', negativePrompt)
    if (apiKey) params.set('key', apiKey)

    const url = `https://gen.pollinations.ai/image/${encodeURIComponent(prompt)}?${params}`
    return NextResponse.json({ url })
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
