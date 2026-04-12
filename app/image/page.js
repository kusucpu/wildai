'use client'
import { useState, useEffect } from 'react'
import { generateImage, FREE_IMAGE_MODELS, RATIOS, STYLE_SUFFIXES, RANDOM_PROMPTS, chat } from '@/lib/pollinations'
import { storage } from '@/lib/storage'
import CustomSelect from '@/components/CustomSelect'

const LOAD_MSGS = [
  'cooking your masterpiece...', 'telling the pixels what to do...',
  'summoning the art gods...', 'running on pure vibes rn...',
  'making something questionable...', 'GPU go brrr...',
  'adding secret sauce...', 'almost there probably...',
  'bribing the AI with compute...', 'this better be good ngl...',
]

const CREATIVE_PRESETS = [
  { id: 'wallpaper', label: 'Wallpaper', ratio: '9:16', style: 'cinematic', suffix: ', ultra detailed, premium wallpaper' },
  { id: 'logo',      label: 'Logo',      ratio: '1:1',  style: 'logo',      suffix: ', vector logo, clean, minimal' },
  { id: 'banner',    label: 'Banner',    ratio: '16:9', style: 'none',      suffix: ', banner design, wide format' },
  { id: 'thumb',     label: 'Thumbnail', ratio: '16:9', style: 'cinematic', suffix: ', youtube thumbnail, bold' },
  { id: 'sticker',   label: 'Sticker',   ratio: '1:1',  style: 'none',      suffix: ', sticker, white outline, cute' },
  { id: 'pfp',       label: 'PFP',       ratio: '1:1',  style: 'artistic',  suffix: ', profile picture, portrait' },
]

export default function ImagePage() {
  const [tab, setTab]         = useState('generate')
  const [prompt, setPrompt]   = useState('')
  const [model, setModel]     = useState('flux')
  const [ratio, setRatio]     = useState('1:1')
  const [style, setStyle]     = useState('none')
  const [count, setCount]     = useState(1)
  const [images, setImages]   = useState([])
  const [loading, setLoading] = useState(false)
  const [loadMsg, setLoadMsg] = useState('')
  const [enhancing, setEnhancing]   = useState(false)
  const [enhanced, setEnhanced]     = useState('')
  const [showEnhanced, setShowEnhanced] = useState(false)
  const [preview, setPreview] = useState(null)
  const [preset, setPreset]   = useState(null)

  useEffect(() => {
    const pre = sessionStorage.getItem('prefill_prompt')
    if (pre) { setPrompt(pre); sessionStorage.removeItem('prefill_prompt') }
  }, [])

  const randomPrompt = () => setPrompt(RANDOM_PROMPTS[Math.floor(Math.random() * RANDOM_PROMPTS.length)])

  const generate = async () => {
    if (!prompt.trim()) return
    setLoading(true); setImages([])
    setLoadMsg(LOAD_MSGS[Math.floor(Math.random() * LOAD_MSGS.length)])
    try {
      const r = RATIOS.find(r => r.id === ratio) || RATIOS[0]
      const finalPrompt = prompt + (STYLE_SUFFIXES[style] || '') + (preset ? CREATIVE_PRESETS.find(p => p.id === preset)?.suffix || '' : '')
      const results = []
      for (let i = 0; i < count; i++) {
        setLoadMsg(LOAD_MSGS[Math.floor(Math.random() * LOAD_MSGS.length)])
        const url = await generateImage(finalPrompt, { model, width: r.w, height: r.h })
        results.push(url)
        setImages([...results])
        storage.addImage({ url, prompt: finalPrompt, model, ratio, style })
      }
    } catch (e) {
      alert('generate failed: ' + e.message)
    } finally { setLoading(false) }
  }

  const enhance = async () => {
    if (!prompt.trim()) return
    setEnhancing(true)
    try {
      const result = await chat([{ role: 'user', content: `Enhance this image prompt. Under 200 words. Output ONLY the enhanced prompt, nothing else.\n\nOriginal: "${prompt}"` }], 'mistral', '')
      setEnhanced(result); setShowEnhanced(true)
    } catch (e) { alert('enhance failed: ' + e.message) }
    finally { setEnhancing(false) }
  }

  const handlePreset = (p) => {
    const same = p.id === preset
    setPreset(same ? null : p.id)
    if (!same) { setRatio(p.ratio); setStyle(p.style) }
  }

  const modelOpts = FREE_IMAGE_MODELS.map(m => ({ value: m.id, label: m.name, note: m.desc }))
  const ratioOpts = RATIOS.map(r => ({ value: r.id, label: `${r.id} ${r.label}` }))
  const styleOpts = Object.keys(STYLE_SUFFIXES).map(s => ({ value: s, label: s }))

  return (
    <div className="ct" style={{ paddingTop: '16px', paddingBottom: '32px' }}>
      <div className="tabs" style={{ marginBottom: '16px' }}>
        <button className={`tab ${tab === 'generate' ? 'active' : ''}`} onClick={() => setTab('generate')}>Generate</button>
        <button className={`tab ${tab === 'creative' ? 'active' : ''}`} onClick={() => setTab('creative')}>Creative</button>
        <button className={`tab ${tab === 'edit' ? 'active' : ''}`} onClick={() => setTab('edit')}>Edit (soon)</button>
      </div>

      {(tab === 'generate' || tab === 'creative') && (
        <>
          {tab === 'creative' && (
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '12px' }}>
              {CREATIVE_PRESETS.map(p => (
                <button key={p.id} className={`btn btn-sm ${preset === p.id ? 'btn-p' : 'btn-s'}`} onClick={() => handlePreset(p)}>{p.label}</button>
              ))}
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '8px', marginBottom: '12px' }}>
            <CustomSelect label="model" value={model} onChange={setModel} options={modelOpts} />
            <CustomSelect label="ratio" value={ratio} onChange={setRatio} options={ratioOpts} />
            <CustomSelect label="style" value={style} onChange={setStyle} options={styleOpts} />
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--fg3)', marginBottom: '4px' }}>count</div>
              <div style={{ display: 'flex', gap: '3px' }}>
                {[1,2,3,4,5].map(n => (
                  <button key={n} onClick={() => setCount(n)}
                    className={`btn btn-sm ${count === n ? 'btn-p' : 'btn-s'}`}
                    style={{ flex: 1, padding: '6px 0', justifyContent: 'center' }}>
                    {n}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <textarea value={prompt} onChange={e => setPrompt(e.target.value)} placeholder="describe what you want to see..." rows={3} style={{ marginBottom: '8px' }} />

          {/* buttons: enhance | random | generate */}
          <div style={{ display: 'flex', gap: '6px', marginBottom: '16px', flexWrap: 'wrap' }}>
            <button className="btn btn-s btn-sm" onClick={enhance} disabled={enhancing || !prompt.trim()} style={{ flexShrink: 0 }}>
              {enhancing ? 'enhancing...' : 'enhance'}
            </button>
            <button className="btn btn-s btn-sm" onClick={randomPrompt} style={{ flexShrink: 0 }}>
              🎲 random
            </button>
            <button className="btn btn-p" style={{ flex: 1 }} onClick={generate} disabled={loading || !prompt.trim()}>
              {loading ? loadMsg : `generate (${count})`}
            </button>
          </div>

          {loading && (
            <div style={{ textAlign: 'center', padding: '32px', color: 'var(--fg3)' }}>
              <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🎨</div>
              <p style={{ marginBottom: 0 }}>{loadMsg}</p>
            </div>
          )}

          {images.length > 0 && !loading && (
            <div>
              <p style={{ fontSize: '0.8rem', fontWeight: 600, marginBottom: '10px' }}>results</p>
              <div className="img-grid">
                {images.map((url, i) => (
                  <div key={i} onClick={() => setPreview(url)}
                    style={{ aspectRatio: ratio.replace(':', '/'), borderRadius: '8px', overflow: 'hidden', cursor: 'pointer', background: 'var(--bg3)', border: '1px solid var(--bd)' }}>
                    <img src={url} alt={`gen ${i+1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" onError={e => { e.target.style.display = 'none' }} />
                  </div>
                ))}
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--fg3)', marginTop: '8px', marginBottom: 0 }}>
                saved to <a href="/history?tab=image">history</a>
              </p>
            </div>
          )}
        </>
      )}

      {tab === 'edit' && (
        <div style={{ textAlign: 'center', padding: '48px 16px', color: 'var(--fg3)' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🔧</div>
          <h2>coming soon</h2>
          <p>remove bg, sticker maker... cooking rn</p>
        </div>
      )}

      {/* enhanced prompt modal */}
      {showEnhanced && (
        <div className="modal-overlay" onClick={() => setShowEnhanced(false)}>
          <div className="modal-box" style={{ padding: '20px' }} onClick={e => e.stopPropagation()}>
            <h3 style={{ marginBottom: '8px' }}>enhanced prompt</h3>
            <div className="card" style={{ marginBottom: '12px', fontSize: '0.8rem', lineHeight: 1.6, maxHeight: '200px', overflowY: 'auto' }}>{enhanced}</div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button className="btn btn-p" style={{ flex: 1 }} onClick={() => { setPrompt(enhanced); setShowEnhanced(false) }}>use this</button>
              <button className="btn btn-s" onClick={() => setShowEnhanced(false)}>close</button>
            </div>
          </div>
        </div>
      )}

      {/* preview modal */}
      {preview && (
        <div className="modal-overlay" onClick={() => setPreview(null)}>
          <div style={{ maxWidth: '560px', width: '100%' }} onClick={e => e.stopPropagation()}>
            <img src={preview} alt="preview" style={{ width: '100%', borderRadius: '12px', display: 'block', maxHeight: '70vh', objectFit: 'contain', background: 'var(--bg3)' }} />
            <div style={{ display: 'flex', gap: '8px', marginTop: '10px', justifyContent: 'center' }}>
              <a href={preview} download={`wildai-${Date.now()}.jpg`} target="_blank" className="btn btn-p btn-sm">download</a>
              <button className="btn btn-s btn-sm" onClick={() => setPreview(null)}>close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
