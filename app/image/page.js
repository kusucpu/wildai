'use client'
import { useState, useEffect } from 'react'
import { buildImageUrl, FREE_IMAGE_MODELS, RATIOS, STYLE_SUFFIXES, chat } from '@/lib/pollinations'
import { storage } from '@/lib/storage'

const CREATIVE_PRESETS = [
  { id: 'wallpaper', label: '🖼 Wallpaper', ratio: '9:16', style: 'cinematic', suffix: ', ultra detailed, premium wallpaper' },
  { id: 'logo',      label: '🏷 Logo',      ratio: '1:1',  style: 'logo',      suffix: ', vector logo, transparent bg friendly' },
  { id: 'banner',    label: '📢 Banner',    ratio: '16:9', style: 'none',      suffix: ', banner design, wide format, bold' },
  { id: 'thumb',     label: '▶ Thumbnail', ratio: '16:9', style: 'cinematic', suffix: ', youtube thumbnail, eye-catching, bold text space' },
  { id: 'sticker',   label: '🏷 Sticker',  ratio: '1:1',  style: 'none',      suffix: ', sticker design, white outline, cute, transparent background' },
  { id: 'pfp',       label: '👤 PFP',      ratio: '1:1',  style: 'artistic',  suffix: ', profile picture, portrait, centered' },
]

export default function ImagePage() {
  const [tab, setTab] = useState('generate')
  const [prompt, setPrompt] = useState('')
  const [model, setModel] = useState('flux')
  const [ratio, setRatio] = useState('1:1')
  const [style, setStyle] = useState('none')
  const [count, setCount] = useState(1)
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)
  const [enhancing, setEnhancing] = useState(false)
  const [enhanced, setEnhanced] = useState('')
  const [showEnhanced, setShowEnhanced] = useState(false)
  const [preview, setPreview] = useState(null)
  const [preset, setPreset] = useState(null)

  // Load prefilled prompt from story mode
  useEffect(() => {
    const pre = sessionStorage.getItem('prefill_prompt')
    if (pre) { setPrompt(pre); sessionStorage.removeItem('prefill_prompt') }
  }, [])

  const generate = async () => {
    if (!prompt.trim()) return
    setLoading(true)
    setImages([])
    try {
      const r = RATIOS.find(r => r.id === ratio) || RATIOS[0]
      const styleSuffix = STYLE_SUFFIXES[style] || ''
      const presetSuffix = preset ? CREATIVE_PRESETS.find(p => p.id === preset)?.suffix || '' : ''
      const finalPrompt = prompt + styleSuffix + presetSuffix

      const urls = Array.from({ length: count }, () =>
        buildImageUrl(finalPrompt, { model, width: r.w, height: r.h })
      )
      setImages(urls)
      urls.forEach(url => storage.addImage({ url, prompt: finalPrompt, model, ratio, style }))
    } catch (e) {
      alert('bruh: ' + e.message)
    } finally {
      setLoading(false)
    }
  }

  const enhance = async () => {
    if (!prompt.trim()) return
    setEnhancing(true)
    try {
      const result = await chat(
        [{ role: 'user', content: `Enhance this image generation prompt to be more detailed and vivid. Keep it under 200 words. Only output the enhanced prompt, nothing else.\n\nOriginal: "${prompt}"` }],
        'mistral', ''
      )
      setEnhanced(result)
      setShowEnhanced(true)
    } catch (e) {
      alert('enhance failed: ' + e.message)
    } finally {
      setEnhancing(false)
    }
  }

  const handlePreset = (p) => {
    setPreset(p.id)
    setRatio(p.ratio)
    setStyle(p.style)
  }

  return (
    <div className="ct" style={{ paddingTop: '16px', paddingBottom: '32px' }}>
      <div className="tabs" style={{ marginBottom: '16px' }}>
        <button className={`tab ${tab === 'generate' ? 'active' : ''}`} onClick={() => setTab('generate')}>🎨 Generate</button>
        <button className={`tab ${tab === 'creative' ? 'active' : ''}`} onClick={() => setTab('creative')}>✨ Creative</button>
        <button className={`tab ${tab === 'edit' ? 'active' : ''}`} onClick={() => setTab('edit')}>🔧 Edit (soon)</button>
      </div>

      {(tab === 'generate' || tab === 'creative') && (
        <>
          {tab === 'creative' && (
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '12px' }}>
              {CREATIVE_PRESETS.map(p => (
                <button
                  key={p.id}
                  className={`btn btn-sm ${preset === p.id ? 'btn-p' : 'btn-s'}`}
                  onClick={() => handlePreset(p)}
                >{p.label}</button>
              ))}
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '8px', marginBottom: '12px' }}>
            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--fg3)', display: 'block', marginBottom: '4px' }}>model</label>
              <select value={model} onChange={e => setModel(e.target.value)}>
                {FREE_IMAGE_MODELS.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--fg3)', display: 'block', marginBottom: '4px' }}>ratio</label>
              <select value={ratio} onChange={e => setRatio(e.target.value)}>
                {RATIOS.map(r => <option key={r.id} value={r.id}>{r.id} {r.label}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--fg3)', display: 'block', marginBottom: '4px' }}>style</label>
              <select value={style} onChange={e => setStyle(e.target.value)}>
                {Object.keys(STYLE_SUFFIXES).map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--fg3)', display: 'block', marginBottom: '4px' }}>count (1-5)</label>
              <input type="number" min={1} max={5} value={count} onChange={e => setCount(Math.min(5, Math.max(1, +e.target.value)))} />
            </div>
          </div>

          <textarea
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            placeholder="describe what you want to see..."
            rows={3}
            style={{ marginBottom: '8px' }}
          />

          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
            <button className="btn btn-s btn-sm" onClick={enhance} disabled={enhancing || !prompt.trim()}>
              {enhancing ? '⏳ enhancing...' : '✨ enhance prompt'}
            </button>
            <button className="btn btn-p" style={{ flex: 1 }} onClick={generate} disabled={loading || !prompt.trim()}>
              {loading ? 'generating...' : `generate (${count})`}
            </button>
          </div>

          {/* enhanced prompt modal */}
          {showEnhanced && (
            <div className="modal-overlay" onClick={() => setShowEnhanced(false)}>
              <div className="modal-box" style={{ padding: '20px' }} onClick={e => e.stopPropagation()}>
                <h3 style={{ marginBottom: '8px' }}>✨ enhanced prompt</h3>
                <div className="card" style={{ marginBottom: '12px', fontSize: '0.8rem', lineHeight: 1.6, maxHeight: '200px', overflowY: 'auto' }}>
                  {enhanced}
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button className="btn btn-p" style={{ flex: 1 }} onClick={() => { setPrompt(enhanced); setShowEnhanced(false) }}>
                    use this ✓
                  </button>
                  <button className="btn btn-s" onClick={() => setShowEnhanced(false)}>nah close</button>
                </div>
              </div>
            </div>
          )}

          {/* results */}
          {images.length > 0 && (
            <div>
              <h3 style={{ marginBottom: '10px' }}>results 🎉</h3>
              <div className="img-grid">
                {images.map((url, i) => (
                  <div
                    key={i}
                    onClick={() => setPreview(url)}
                    style={{ aspectRatio: ratio.replace(':', '/'), borderRadius: '8px', overflow: 'hidden', cursor: 'pointer', background: 'var(--bg3)', border: '1px solid var(--bd)' }}
                  >
                    <img src={url} alt={`gen ${i+1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                  </div>
                ))}
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--fg3)', marginTop: '8px', marginBottom: 0 }}>
                💾 auto-saved to <a href="/history?tab=image">history</a>
              </p>
            </div>
          )}
        </>
      )}

      {tab === 'edit' && (
        <div style={{ textAlign: 'center', padding: '48px 16px', color: 'var(--fg3)' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🔧</div>
          <h2>coming soon fr</h2>
          <p>remove bg, sticker maker, image editing... cooking rn 🍳</p>
        </div>
      )}

      {/* preview modal */}
      {preview && (
        <div className="modal-overlay" onClick={() => setPreview(null)}>
          <div style={{ maxWidth: '600px', width: '100%' }} onClick={e => e.stopPropagation()}>
            <img src={preview} alt="preview" style={{ width: '100%', borderRadius: '12px', display: 'block' }} />
            <div style={{ display: 'flex', gap: '8px', marginTop: '10px', justifyContent: 'center' }}>
              <a href={preview} download={`wildai-${Date.now()}.jpg`} target="_blank" className="btn btn-p btn-sm">⬇ download</a>
              <button className="btn btn-s btn-sm" onClick={() => setPreview(null)}>close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
