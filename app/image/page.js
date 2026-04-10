'use client'
import { useState } from 'react'
import { pollinations } from '@/lib/pollinations'
import { storage } from '@/lib/storage'
import BYOPModal from '@/components/BYOPModal'
import { 
  ArrowPathIcon, 
  ArrowDownTrayIcon,
  SparklesIcon,
  XMarkIcon 
} from '@heroicons/react/24/outline'

const TABS = [
  { id: 'generate', label: 'Generate', icon: '🎨' },
  { id: 'remove-bg', label: 'Remove BG', icon: '✂️' },
  { id: 'sticker', label: 'Sticker', icon: '🏷️' }
]

const MODELS = [
  { id: 'flux', name: 'Flux Schnell', free: true },
  { id: 'zimage', name: 'Z-Image Turbo', free: true },
  { id: 'klein', name: 'Flux Klein', free: false },
  { id: 'grok-imagine', name: 'Grok Imagine', free: false }
]

const RATIOS = [
  { id: '1:1', label: 'Square', w: 1024, h: 1024 },
  { id: '3:4', label: 'Portrait', w: 768, h: 1024 },
  { id: '4:3', label: 'Landscape', w: 1024, h: 768 },
  { id: '9:16', label: 'Story', w: 576, h: 1024 },
  { id: '16:9', label: 'Widescreen', w: 1024, h: 576 }
]

const STYLES = [
  { id: 'none', label: 'Default', suffix: '' },
  { id: 'artistic', label: 'Artistic', suffix: ', artistic style, painterly, expressive' },
  { id: 'realistic', label: 'Realistic', suffix: ', photorealistic, highly detailed, 8k' },
  { id: '3d', label: '3D Render', suffix: ', 3D render, octane render, volumetric lighting' },
  { id: 'anime', label: 'Anime', suffix: ', anime style, vibrant colors, cel shaded' },
  { id: 'pixel', label: 'Pixel Art', suffix: ', pixel art, 16-bit, retro game style' },
  { id: 'cyberpunk', label: 'Cyberpunk', suffix: ', cyberpunk, neon lights, futuristic' },
  { id: 'fantasy', label: 'Fantasy', suffix: ', fantasy art, magical, epic' }
]

export default function ImagePage() {
  const [tab, setTab] = useState('generate')
  const [prompt, setPrompt] = useState('')
  const [enhancedPrompt, setEnhancedPrompt] = useState('')
  const [showEnhance, setShowEnhance] = useState(false)
  const [images, setImages] = useState([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [showBYOP, setShowBYOP] = useState(false)
  
  // Settings
  const [model, setModel] = useState('flux')
  const [ratio, setRatio] = useState('1:1')
  const [style, setStyle] = useState('none')
  const [count, setCount] = useState(1)
  
  const handleGenerate = async () => {
    if (!prompt.trim()) return
    
    const selectedModel = MODELS.find(m => m.id === model)
    if (!selectedModel.free && !pollinations.pollenKey) {
      setShowBYOP(true)
      return
    }
    
    setIsGenerating(true)
    setImages([])
    
    try {
      const selectedStyle = STYLES.find(s => s.id === style)
      const finalPrompt = prompt + selectedStyle.suffix
      const selectedRatio = RATIOS.find(r => r.id === ratio)
      
      const results = []
      for (let i = 0; i < count; i++) {
        const img = await pollinations.generateImage(finalPrompt, {
          model,
          width: selectedRatio.w,
          height: selectedRatio.h,
          seed: Date.now() + i
        })
        results.push(img)
        
        // Show images as they generate
        setImages(prev => [...prev, img])
      }
      
      // Save to history
      results.forEach(img => storage.addImageHistory(img))
      
    } catch (error) {
      console.error('Generation error:', error)
      if (error.message === 'pollen_quota_exceeded') {
        setShowBYOP(true)
      } else {
        alert(`error: ${error.message}`)
      }
    } finally {
      setIsGenerating(false)
    }
  }
  
  const handleEnhance = async () => {
    if (!prompt.trim()) return
    
    setShowEnhance(true)
    try {
      const response = await pollinations.chat([{
        role: 'user',
        content: `Enhance this image prompt for better AI generation results. Make it more descriptive and detailed. Original prompt: "${prompt}"`
      }], { model: 'mistral' })
      
      setEnhancedPrompt(response.content)
    } catch (error) {
      setEnhancedPrompt('Failed to enhance prompt. Try again?')
    }
  }
  
  const useEnhancedPrompt = () => {
    setPrompt(enhancedPrompt)
    setShowEnhance(false)
  }
  
  const downloadImage = async (url, index) => {
    try {
      const response = await fetch(url)
      const blob = await response.blob()
      const blobUrl = URL.createObjectURL(blob)
      
      const a = document.createElement('a')
      a.href = blobUrl
      a.download = `wildai-${Date.now()}-${index}.png`
      a.click()
      
      URL.revokeObjectURL(blobUrl)
    } catch (error) {
      console.error('Download error:', error)
      // Fallback: open in new tab
      window.open(url, '_blank')
    }
  }
  
  return (
    <div className="container py-6">
      
      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
              tab === t.id
                ? 'bg-[var(--accent)] text-white'
                : 'bg-[var(--bg-secondary)] hover:bg-[var(--bg-tertiary)]'
            }`}
          >
            <span>{t.icon}</span>
            <span>{t.label}</span>
          </button>
        ))}
      </div>
      
      {tab === 'generate' && (
        <>
          {/* Settings Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">Model</label>
              <select value={model} onChange={e => setModel(e.target.value)} className="w-full text-sm">
                {MODELS.map(m => (
                  <option key={m.id} value={m.id} disabled={!m.free && !pollinations.pollenKey}>
                    {m.name} {!m.free && '🔒'}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Ratio</label>
              <select value={ratio} onChange={e => setRatio(e.target.value)} className="w-full text-sm">
                {RATIOS.map(r => (
                  <option key={r.id} value={r.id}>{r.label}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Style</label>
              <select value={style} onChange={e => setStyle(e.target.value)} className="w-full text-sm">
                {STYLES.map(s => (
                  <option key={s.id} value={s.id}>{s.label}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Count</label>
              <input
                type="number"
                min="1"
                max="5"
                value={count}
                onChange={e => setCount(parseInt(e.target.value) || 1)}
                className="w-full text-sm"
              />
            </div>
          </div>
          
          {/* Prompt Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Prompt</label>
            <textarea
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              placeholder="describe what you want to see..."
              rows={4}
              className="w-full"
            />
            
            <div className="flex gap-2 mt-2">
              <button
                onClick={handleEnhance}
                className="btn btn-secondary flex items-center gap-2"
              >
                <SparklesIcon className="w-4 h-4" />
                Enhance Prompt
              </button>
              
              <button
                onClick={handleGenerate}
                disabled={!prompt.trim() || isGenerating}
                className="btn btn-primary flex-1"
              >
                {isGenerating ? `Generating ${images.length}/${count}...` : `Generate (${count})`}
              </button>
            </div>
          </div>
          
          {/* Enhanced Prompt Modal */}
          {showEnhance && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-[var(--bg-primary)] rounded-2xl p-6 max-w-2xl w-full border border-[var(--border)]">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold">✨ Enhanced Prompt</h3>
                  <button onClick={() => setShowEnhance(false)}>
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="bg-[var(--bg-secondary)] rounded-lg p-4 mb-4 max-h-60 overflow-y-auto">
                  <p className="whitespace-pre-wrap">{enhancedPrompt}</p>
                </div>
                
                <div className="flex gap-2">
                  <button onClick={useEnhancedPrompt} className="btn btn-primary flex-1">
                    Use This Prompt
                  </button>
                  <button onClick={() => setShowEnhance(false)} className="btn btn-secondary">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Generated Images */}
          {images.length > 0 && (
            <div>
              <h3 className="text-lg font-bold mb-3">Results</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {images.map((img, i) => (
                  <div key={i} className="card group relative overflow-hidden">
                    <img
                      src={img.url}
                      alt={img.prompt}
                      className="w-full h-auto rounded-lg"
                      loading="lazy"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <div className="flex gap-2 w-full">
                        <button
                          onClick={() => downloadImage(img.url, i)}
                          className="btn btn-primary flex-1 text-sm"
                        >
                          <ArrowDownTrayIcon className="w-4 h-4" />
                          Download
                        </button>
                        <button className="btn btn-secondary text-sm">
                          Share
                        </button>
                      </div>
                    </div>
                    
                    <div className="mt-2">
                      <p className="text-xs text-[var(--text-muted)]">
                        {img.model} · {img.dimensions}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <p className="text-xs text-[var(--text-muted)] text-center mt-6">
            💾 images auto-saved to{' '}
            <a href="/history?tab=image" className="text-[var(--accent)] hover:underline">
              history
            </a>
          </p>
        </>
      )}
      
      {tab === 'remove-bg' && (
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">🚧 Background Remover</h2>
          <p className="text-[var(--text-secondary)] mb-6">
            coming soon! powered by remove.bg API
            <br />
            (50 free uses per month once it's live)
          </p>
          <button className="btn btn-secondary" disabled>
            Upload Image (Soon)
          </button>
        </div>
      )}
      
      {tab === 'sticker' && (
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">🏷️ Sticker Maker</h2>
          <p className="text-[var(--text-secondary)] mb-6">
            turn anything into a sticker
            <br />
            (auto transparent background + border)
          </p>
          <button className="btn btn-secondary" disabled>
            Create Sticker (Soon)
          </button>
        </div>
      )}
      
      <BYOPModal
        isOpen={showBYOP}
        onClose={() => setShowBYOP(false)}
        onSave={(key) => {
          pollinations.setPollenKey(key)
          setShowBYOP(false)
        }}
      />
    </div>
  )
}
