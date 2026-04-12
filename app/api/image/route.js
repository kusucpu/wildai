import { NextResponse } from 'next/server'

const FREE_IMG_IDS = ['flux', 'zimage', 'klein']

export async function POST(req) {
  try {
    const { prompt, model, width, height, seed } = await req.json()

    // Reject free models from hitting this route (should not happen)
    if (FREE_IMG_IDS.includes(model)) {
      return NextResponse.json({ error: 'use direct URL for free models' }, { status: 400 })
    }

    const byopKey = req.headers.get('x-byop-key')
    if (!byopKey) {
      return NextResponse.json({ error: 'premium model needs BYOP key' }, { status: 401 })
    }

    const params = new URLSearchParams({
      model:  model || 'flux',
      width:  String(width || 1024),
      height: String(height || 1024),
      seed:   String(seed ?? Math.floor(Math.random() * 999999)),
      nologo: 'true',
      key:    byopKey,
    })

    const url = `https://gen.pollinations.ai/image/${encodeURIComponent(prompt)}?${params}`
    return NextResponse.json({ url })
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
