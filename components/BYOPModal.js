'use client'
import { useState } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'

export default function BYOPModal({ isOpen, onClose, onSave }) {
  const [key, setKey] = useState('')
  
  if (!isOpen) return null
  
  const handleSave = () => {
    if (key.trim()) {
      onSave(key)
      setKey('')
      onClose()
    }
  }
  
  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4"
      onClick={onClose}
    >
      <div 
        className="bg-[var(--bg-primary)] rounded-2xl p-6 max-w-md w-full border border-[var(--border)] shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold">🌸 upgrade to BYOP</h2>
          <button onClick={onClose} className="p-1 hover:bg-[var(--bg-secondary)] rounded">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        
        {/* Content */}
        <div className="space-y-4">
          <p className="text-[var(--text-secondary)]">
            yo bestie, you've been crushing it with the free tier 🫡
          </p>
          
          <p className="text-[var(--text-secondary)]">
            but rn servers are packed. wanna skip the line + unlock premium models?
          </p>
          
          <div className="bg-[var(--bg-secondary)] rounded-lg p-4">
            <h3 className="font-semibold mb-2">what $5 gets you:</h3>
            <ul className="space-y-1 text-sm text-[var(--text-secondary)]">
              <li>💬 5,000,000 chat messages (mistral)</li>
              <li>🎨 5,000 images (flux model)</li>
              <li>🚀 instant generation (no waiting)</li>
              <li>🔓 15+ premium models</li>
            </ul>
            <p className="text-xs text-[var(--text-muted)] mt-2">
              no subscription. pay for what you use.
            </p>
          </div>
          
          {/* Input */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Pollen API Key
            </label>
            <input
              type="password"
              value={key}
              onChange={e => setKey(e.target.value)}
              placeholder="paste your key here..."
              className="w-full"
            />
            <p className="text-xs text-[var(--text-muted)] mt-1">
              don't have one?{' '}
              <a 
                href="https://enter.pollinations.ai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[var(--accent)] hover:underline"
              >
                get it free here →
              </a>
            </p>
          </div>
          
          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <button 
              onClick={handleSave}
              className="btn btn-primary flex-1"
            >
              Save & Unlock
            </button>
            <button 
              onClick={onClose}
              className="btn btn-secondary flex-1"
            >
              nah, I'll wait
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
