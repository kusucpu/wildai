'use client'
import { useState } from 'react'
import { getAllPrompts, searchPrompts } from '@/lib/prompts'
import { MagnifyingGlassIcon, ClipboardDocumentIcon, CheckIcon } from '@heroicons/react/24/outline'

export default function GodPromptPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [copiedId, setCopiedId] = useState(null)
  const [selectedPrompt, setSelectedPrompt] = useState(null)
  
  const prompts = searchQuery
    ? searchPrompts(searchQuery)
    : getAllPrompts()
  
  const copyPrompt = (template, id) => {
    navigator.clipboard.writeText(template)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }
  
  return (
    <div className="container py-6">
      
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">
          ⚡ God Prompt Library
        </h1>
        <p className="text-[var(--text-secondary)]">
          production-ready prompts. copy, paste, dominate.
        </p>
      </div>
      
      {/* Search */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="relative">
          <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="search prompts..."
            className="w-full pl-10"
          />
        </div>
      </div>
      
      {/* Prompts Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {prompts.map((prompt, idx) => (
          <div key={idx} className="card">
            
            {/* Header */}
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-xl font-bold">{prompt.name}</h3>
              <span className="text-sm text-[var(--text-muted)]">⭐ {prompt.votes}</span>
            </div>
            
            {/* Description */}
            <p className="text-[var(--text-secondary)] text-sm mb-3">
              {prompt.description}
            </p>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {prompt.tags?.map(tag => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-[var(--accent)]/10 text-[var(--accent)] rounded text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            {/* Disclaimer */}
            {prompt.disclaimer && (
              <div className="bg-[var(--warning)]/10 border border-[var(--warning)] rounded-lg p-2 mb-4 text-xs">
                {prompt.disclaimer}
              </div>
            )}
            
            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => copyPrompt(prompt.template, idx)}
                className="flex-1 btn btn-primary text-sm flex items-center justify-center gap-2"
              >
                {copiedId === idx ? (
                  <>
                    <CheckIcon className="w-4 h-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <ClipboardDocumentIcon className="w-4 h-4" />
                    Copy Prompt
                  </>
                )}
              </button>
              
              <button
                onClick={() => setSelectedPrompt(prompt)}
                className="btn btn-secondary text-sm"
              >
                Preview
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {prompts.length === 0 && (
        <div className="text-center py-12 text-[var(--text-muted)]">
          <p>no prompts found for "{searchQuery}"</p>
          <button
            onClick={() => setSearchQuery('')}
            className="text-[var(--accent)] hover:underline mt-2"
          >
            clear search
          </button>
        </div>
      )}
      
      {/* Preview Modal */}
      {selectedPrompt && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedPrompt(null)}
        >
          <div 
            className="bg-[var(--bg-primary)] rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-[var(--border)]"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-bold">{selectedPrompt.name}</h2>
                <p className="text-[var(--text-secondary)]">{selectedPrompt.description}</p>
              </div>
              <button onClick={() => setSelectedPrompt(null)}>
                <span className="text-2xl">×</span>
              </button>
            </div>
            
            <div className="bg-[var(--bg-secondary)] rounded-lg p-4 mb-4 overflow-x-auto">
              <pre className="text-sm whitespace-pre-wrap font-mono">
                {selectedPrompt.template}
              </pre>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => {
                  copyPrompt(selectedPrompt.template, 'preview')
                  setSelectedPrompt(null)
                }}
                className="btn btn-primary flex-1"
              >
                Copy & Close
              </button>
              <button
                onClick={() => setSelectedPrompt(null)}
                className="btn btn-secondary"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
