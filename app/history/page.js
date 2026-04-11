'use client'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { storage } from '@/lib/storage'

function HistoryContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [tab, setTab] = useState(searchParams.get('tab') || 'chat')
  const [chats, setChats] = useState([])
  const [images, setImages] = useState([])
  const [stats, setStats] = useState({ usedMB: '0', totalMB: '100', pct: '0' })
  const [imgModal, setImgModal] = useState(null)
  const [imgIdx, setImgIdx] = useState(0)

  const load = () => {
    setChats(storage.getChats())
    setImages(storage.getImages())
    setStats(storage.getStats())
  }

  useEffect(() => { load() }, [])

  const openImg = (img, idx) => { setImgModal(img); setImgIdx(idx) }
  const navigateImg = (dir) => {
    const newIdx = imgIdx + dir
    if (newIdx >= 0 && newIdx < images.length) { setImgModal(images[newIdx]); setImgIdx(newIdx) }
  }

  return (
    <div className="ct" style={{ paddingTop: '16px', paddingBottom: '32px' }}>
      <div style={{ marginBottom: '16px' }}>
        <h1 style={{ marginBottom: '4px' }}>📜 History</h1>
        <p style={{ color: 'var(--danger)', fontSize: '0.75rem', marginBottom: 0 }}>
          ⚠️ local storage: {stats.usedMB}MB / {stats.totalMB}MB ({stats.pct}%) — oldest stuff gets auto-deleted when full
        </p>
      </div>

      <div className="tabs" style={{ marginBottom: '16px' }}>
        <button className={`tab ${tab === 'chat' ? 'active' : ''}`} onClick={() => setTab('chat')}>💬 Chat ({chats.length})</button>
        <button className={`tab ${tab === 'image' ? 'active' : ''}`} onClick={() => setTab('image')}>🎨 Images ({images.length})</button>
      </div>

      {tab === 'chat' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {chats.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--fg3)' }}>
              <p>no chat history yet bestie</p>
              <a href="/chat" className="btn btn-s btn-sm">start chatting →</a>
            </div>
          ) : (
            <>
              {chats.map(c => (
                <div key={c.id} className="card" style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                  <div style={{ flex: 1 }} onClick={() => { sessionStorage.setItem('load_chat', JSON.stringify(c)); router.push('/chat') }}>
                    <p style={{ fontWeight: 500, marginBottom: '2px', fontSize: '0.875rem', color: 'var(--fg)' }}>{c.preview}</p>
                    <p style={{ fontSize: '0.7rem', color: 'var(--fg3)', marginBottom: 0 }}>
                      {c.mode} · {c.messages?.length || 0} msgs · {new Date(c.ts).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={() => { if (confirm('fr delete this? 👀')) { storage.deleteChat(c.id); load() } }}
                    className="icon-btn"
                    style={{ flexShrink: 0, color: 'var(--danger)' }}
                  >✕</button>
                </div>
              ))}
              <button
                onClick={() => { if (confirm('DELETE ALL CHATS?? u sure no cap?')) { storage.clearChats(); load() } }}
                className="btn btn-d"
                style={{ marginTop: '8px' }}
              >
                🗑 delete all chats
              </button>
            </>
          )}
        </div>
      )}

      {tab === 'image' && (
        <div>
          {images.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--fg3)' }}>
              <p>no images yet, go generate something cool</p>
              <a href="/image" className="btn btn-s btn-sm">generate images →</a>
            </div>
          ) : (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '6px', marginBottom: '12px' }}>
                {images.map((img, i) => (
                  <div key={img.id} onClick={() => openImg(img, i)} style={{ aspectRatio: '1', borderRadius: '8px', overflow: 'hidden', cursor: 'pointer', background: 'var(--bg3)', border: '1px solid var(--bd)' }}>
                    <img src={img.url} alt={img.prompt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                  </div>
                ))}
              </div>
              <button
                onClick={() => { if (confirm('nuke ALL images?? 💀')) { storage.clearImages(); load() } }}
                className="btn btn-d"
              >
                🗑 delete all images
              </button>
            </>
          )}
        </div>
      )}

      {/* image modal */}
      {imgModal && (
        <div className="modal-overlay" onClick={() => setImgModal(null)}>
          <div style={{ maxWidth: '600px', width: '100%', position: 'relative' }} onClick={e => e.stopPropagation()}>
            <img src={imgModal.url} alt={imgModal.prompt} style={{ width: '100%', borderRadius: '10px', display: 'block' }} />

            {imgIdx > 0 && (
              <button onClick={() => navigateImg(-1)} style={{ position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.5)', color: 'white', border: 'none', borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer', fontSize: '1rem' }}>‹</button>
            )}
            {imgIdx < images.length - 1 && (
              <button onClick={() => navigateImg(1)} style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.5)', color: 'white', border: 'none', borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer', fontSize: '1rem' }}>›</button>
            )}

            <div className="card" style={{ marginTop: '8px', borderRadius: '10px' }}>
              <div style={{ maxHeight: '80px', overflowY: 'auto', marginBottom: '8px' }}>
                <p style={{ fontSize: '0.8rem', margin: 0, color: 'var(--fg)' }}>{imgModal.prompt}</p>
              </div>
              <p style={{ fontSize: '0.7rem', color: 'var(--fg3)', marginBottom: '10px' }}>{imgModal.model} · {new Date(imgModal.ts).toLocaleDateString()}</p>
              <div style={{ display: 'flex', gap: '6px' }}>
                <button className="btn btn-s btn-sm" onClick={() => navigator.clipboard.writeText(imgModal.prompt)}>📋 copy prompt</button>
                <a href={imgModal.url} download={`wildai-${imgModal.id}.jpg`} target="_blank" className="btn btn-p btn-sm">⬇ download</a>
                <button className="btn btn-d btn-sm" onClick={() => { storage.deleteImage(imgModal.id); setImgModal(null); load() }}>🗑</button>
                <button className="btn btn-s btn-sm" style={{ marginLeft: 'auto' }} onClick={() => setImgModal(null)}>✕</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function HistoryPage() {
  return (
    <Suspense fallback={<div style={{ padding: '40px', textAlign: 'center', color: 'var(--fg3)' }}>loading...</div>}>
      <HistoryContent />
    </Suspense>
  )
}
