'use client'
import { useState, useEffect } from 'react'
import { storage } from '@/lib/storage'
import { useSearchParams, useRouter } from 'next/navigation'
import { 
  TrashIcon, 
  ArrowDownTrayIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
  ClipboardDocumentIcon
} from '@heroicons/react/24/outline'

export default function HistoryPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const initialTab = searchParams.get('tab') || 'chat'
  
  const [tab, setTab] = useState(initialTab)
  const [chatHistory, setChatHistory] = useState([])
  const [imageHistory, setImageHistory] = useState([])
  const [selectedImage, setSelectedImage] = useState(null)
  const [stats, setStats] = useState({ used: 0, total: 0, percentage: 0 })
  
  useEffect(() => {
    loadHistory()
  }, [])
  
  const loadHistory() {
    setChatHistory(storage.load('chat_history') || [])
    setImageHistory(storage.load('image_history') || [])
    setStats(storage.getStats())
  }
  
  const deleteChat = (id) => {
    if (confirm('delete this conversation?')) {
      storage.deleteItem('chat', id)
      loadHistory()
    }
  }
  
  const deleteImage = (id) => {
    if (confirm('delete this image?')) {
      storage.deleteItem('image', id)
      loadHistory()
    }
  }
  
  const clearAll = (type) => {
    const confirmMsg = type === 'chat' 
      ? 'delete ALL conversations? this cannot be undone.'
      : 'delete ALL images? this cannot be undone.'
    
    if (confirm(confirmMsg)) {
      storage.clearHistory(type)
      loadHistory()
    }
  }
  
  const openChat = (chat) => {
    // Save current chat to localStorage for loading in chat page
    localStorage.setItem('load_chat', JSON.stringify(chat))
    router.push('/chat')
  }
  
  const downloadImage = async (url, id) => {
    try {
      const response = await fetch(url)
      const blob = await response.blob()
      const blobUrl = URL.createObjectURL(blob)
      
      const a = document.createElement('a')
      a.href = blobUrl
      a.download = `wildai-${id}.png`
      a.click()
      
      URL.revokeObjectURL(blobUrl)
    } catch (error) {
      window.open(url, '_blank')
    }
  }
  
  const ImageModal = ({ image, onClose }) => {
    if (!image) return null
    
    const currentIndex = imageHistory.findIndex(img => img.id === image.id)
    const hasPrev = currentIndex > 0
    const hasNext = currentIndex < imageHistory.length - 1
    
    const navigate = (direction) => {
      const newIndex = currentIndex + direction
      if (newIndex >= 0 && newIndex < imageHistory.length) {
        setSelectedImage(imageHistory[newIndex])
      }
    }
    
    const copyPrompt = () => {
      navigator.clipboard.writeText(image.prompt)
    }
    
    return (
      <div 
        className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <div className="max-w-6xl w-full" onClick={e => e.stopPropagation()}>
          
          {/* Image */}
          <div className="relative">
            <img
              src={image.url}
              alt={image.prompt}
              className="w-full h-auto max-h-[70vh] object-contain rounded-lg"
            />
            
            {/* Navigation Arrows */}
            {hasPrev && (
              <button
                onClick={() => navigate(-1)}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm transition-all"
              >
                <ChevronLeftIcon className="w-6 h-6 text-white" />
              </button>
            )}
            
            {hasNext && (
              <button
                onClick={() => navigate(1)}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm transition-all"
              >
                <ChevronRightIcon className="w-6 h-6 text-white" />
              </button>
            )}
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm"
            >
              <XMarkIcon className="w-6 h-6 text-white" />
            </button>
          </div>
          
          {/* Info */}
          <div className="mt-4 bg-white/5 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex-1 max-h-20 overflow-y-auto">
                <p className="text-white text-sm">{image.prompt}</p>
              </div>
              <button
                onClick={copyPrompt}
                className="px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded text-white text-sm flex items-center gap-1"
              >
                <ClipboardDocumentIcon className="w-4 h-4" />
                Copy
              </button>
            </div>
            
            <div className="flex gap-2 text-xs text-white/60">
              <span>{image.model}</span>
              <span>·</span>
              <span>{image.dimensions}</span>
              <span>·</span>
              <span>{new Date(image.timestamp).toLocaleDateString()}</span>
            </div>
            
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => downloadImage(image.url, image.id)}
                className="flex-1 btn btn-primary text-sm"
              >
                <ArrowDownTrayIcon className="w-4 h-4" />
                Download
              </button>
              <button
                onClick={() => deleteImage(image.id)}
                className="btn btn-secondary text-sm"
              >
                <TrashIcon className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="container py-6">
      
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">📜 History</h1>
        <p className="text-sm text-[var(--danger)] mb-2">
          ⚠️ Storage limit: {stats.usedMB}MB / {stats.totalMB}MB ({stats.percentage}%)
          <br />
          Oldest items auto-delete when storage is full.
        </p>
      </div>
      
      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setTab('chat')}
          className={`flex-1 py-2 rounded-lg font-medium transition-all ${
            tab === 'chat'
              ? 'bg-[var(--accent)] text-white'
              : 'bg-[var(--bg-secondary)] hover:bg-[var(--bg-tertiary)]'
          }`}
        >
          💬 Chat ({chatHistory.length})
        </button>
        <button
          onClick={() => setTab('image')}
          className={`flex-1 py-2 rounded-lg font-medium transition-all ${
            tab === 'image'
              ? 'bg-[var(--accent)] text-white'
              : 'bg-[var(--bg-secondary)] hover:bg-[var(--bg-tertiary)]'
          }`}
        >
          🎨 Images ({imageHistory.length})
        </button>
      </div>
      
      {/* Chat History */}
      {tab === 'chat' && (
        <div className="space-y-3">
          {chatHistory.length === 0 ? (
            <div className="text-center py-12 text-[var(--text-muted)]">
              <p>no chat history yet</p>
              <a href="/chat" className="text-[var(--accent)] hover:underline mt-2 inline-block">
                start chatting →
              </a>
            </div>
          ) : (
            <>
              {chatHistory.map(chat => (
                <div key={chat.id} className="card flex justify-between items-center gap-4">
                  <div className="flex-1 cursor-pointer" onClick={() => openChat(chat)}>
                    <p className="font-medium mb-1">{chat.preview}</p>
                    <div className="flex gap-2 text-xs text-[var(--text-muted)]">
                      <span>{chat.mode}</span>
                      <span>·</span>
                      <span>{chat.messages?.length || 0} messages</span>
                      <span>·</span>
                      <span>{new Date(chat.timestamp).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteChat(chat.id)}
                    className="p-2 hover:bg-[var(--danger)]/10 text-[var(--danger)] rounded transition-colors"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              ))}
              
              <button
                onClick={() => clearAll('chat')}
                className="w-full py-3 text-[var(--danger)] hover:bg-[var(--danger)]/10 rounded-lg transition-colors font-medium"
              >
                Delete All Chats
              </button>
            </>
          )}
        </div>
      )}
      
      {/* Image History */}
      {tab === 'image' && (
        <div>
          {imageHistory.length === 0 ? (
            <div className="text-center py-12 text-[var(--text-muted)]">
              <p>no images generated yet</p>
              <a href="/image" className="text-[var(--accent)] hover:underline mt-2 inline-block">
                generate images →
              </a>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-4">
                {imageHistory.map(img => (
                  <div
                    key={img.id}
                    className="aspect-square rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-[var(--accent)] transition-all group relative"
                    onClick={() => setSelectedImage(img)}
                  >
                    <img
                      src={img.url}
                      alt={img.prompt}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 text-white text-sm font-medium">
                        View
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              
              <button
                onClick={() => clearAll('image')}
                className="w-full py-3 text-[var(--danger)] hover:bg-[var(--danger)]/10 rounded-lg transition-colors font-medium"
              >
                Delete All Images
              </button>
            </>
          )}
        </div>
      )}
      
      {/* Image Modal */}
      <ImageModal image={selectedImage} onClose={() => setSelectedImage(null)} />
    </div>
  )
}
