import { NextResponse } from 'next/server'

export async function POST(req) {
  try {
    const { messages, model, system } = await req.json()

    // Check for BYOP key in header (client sends it if they have one)
    const byopKey = req.headers.get('x-byop-key')
    const apiKey = byopKey || process.env.POLLINATIONS_API_KEY

    if (!apiKey) {
      return NextResponse.json({ error: 'no_key' }, { status: 401 })
    }

    const fullMessages = [
      ...(system ? [{ role: 'system', content: system }] : []),
      ...messages
    ]

    const res = await fetch('https://gen.pollinations.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: model || 'mistral',
        messages: fullMessages,
        stream: false,
        seed: -1
      })
    })

    if (res.status === 402) {
      return NextResponse.json({ error: 'quota_exceeded' }, { status: 402 })
    }
    if (!res.ok) {
      return NextResponse.json({ error: 'api_error' }, { status: 500 })
    }

    const data = await res.json()
    const content = data?.choices?.[0]?.message?.content
    if (!content) return NextResponse.json({ error: 'empty_response' }, { status: 500 })

    return NextResponse.json({ content })
  } catch (e) {
    return NextResponse.json({ error: 'server_error', msg: e.message }, { status: 500 })
  }
}
