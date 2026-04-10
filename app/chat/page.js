'use client'
import { useState, useRef, useEffect } from 'react'
import { pollinations } from '@/lib/pollinations'
import { storage } from '@/lib/storage'
import { GOD_PROMPTS } from '@/lib/prompts'
import BYOPModal from '@/components/BYOPModal'
import { PaperAirplaneIcon, TrashIcon } from '@heroicons/react/24/outline'

const MODES = [
  { id: 'regular', label: 'Regular', icon: '💬', systemPrompt: 'You are a helpful, casual AI assistant. Be friendly and conversational.' },
  { id: 'tarot', label: 'Tarot', icon: '🔮', systemPrompt: GOD_PROMPTS.personal.tarotReader?.template || 'You are a tarot reader.' },
  { id: 'astrology', label: 'Astrology', icon: '♈', systemPrompt: 'You are an astrologer. Ask for birth date, time, and location, then provide insights.' },
  { id: 'therapist', label: 'Vent', icon: '💭', systemPrompt: GOD_PROMPTS.personal.therapyFriend?.template || 'You are an empathetic friend.' },
  { id: 'story', label: 'Story', icon: '📖', systemPrompt: 'You are an interactive storyteller. Create engaging narratives with choices.' }
]

const MODELS = [
  { id: 'qwen-safety', name: 'Qwen Guard', cost: '0.01¢/M', free: true },
  { id: 'mistral', name: 'Mistral Small', cost: '0.1¢/M', free: true },
  { id: 'gemini-fast', name: 'Gemini Flash', cost: '0.3¢/M', free: true },
  { id: 'nova-fast', name: 'Nova Micro', cost: '0.04¢/M', free: true },
  { id: 'deepseek', name: 'DeepSeek', cost: '0.58¢/M', free: false },
  { id: 'grok', name: 'xAI Grok', cost: '0.2¢/M', free: false }
]

export default function ChatPage() {
  const [mode, setMode] = useState('regular')
  const [model, setModel] = useState('qwen-safety') // Cheapest
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showBYOP, setShowBYOP] = useState(false)
  const messagesEndRef = useRef(null)
  const textareaRef = useRef(null)
  
  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])
  
  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
    }
  }, [input])
  
  const handleSend = async () => {
    if (!input.trim() || isLoading) return
    
    const userMessage = { role: 'user', content: input.trim() }
    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setInput('')
    setIsLoading(true)
    
    try {
      const systemPrompt = MODES.find(m => m.id === mode)?.systemPrompt || ''
      const response = await pollinations.chat(newMessages, {
        model,
        system: systemPrompt
      })
      
      const aiMessage = { role: 'assistant', content: response.content }
      const finalMessages = [...newMessages, aiMessage]
      setMessages(finalMessages)
      
      // Save to history
      storage.addChatHistory({
        mode,
        model,
        messages: finalMessages
      })
      
    } catch (error) {
      console.error('Chat error:', error)
      
      if (error.message === 'pollen_quota_exceeded') {
        setShowBYOP(true)
      } else {
        const errorMessage = {
          role: 'system',
          content: `❌ ${error.message || 'something broke. try again?'}`
        }
        setMessages([...newMessages, errorMessage])
      }
    } finally {
      setIsLoading(false)
    }
  }
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }
  
  const clearChat = () => {
    if (confirm('clear this conversation?')) {
      setMessages([])
    }
  }
  
  const handleBYOPSave = (key) => {
    pollinations.setPollenKey(key)
    setShowBYOP(false)
  }
  
  // Check if model requires BYOP
  const selectedModel = MODELS.find(m => m.id === model)
  const requiresBYOP = selectedModel && !selectedModel.free && !pollinations.pollenKey
  
  return (
    <div className="h-[calc(100vh-var(--nav-top-height)-var(--nav-bottom-height))] flex flex-col">
      
      {/* Header Controls */}
      <div className="border-b border-[var(--border)] bg-[var(--bg-primary)] sticky top-[var(--nav-top-height)] z-10">
        <div className="container py-3">
          
          {/* Mode Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-2 scrollbar-hide">
            {MODES.map(m => (
              <button
                key={m.id}
                onClick={() => setMode(m.id)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  mode === m.id
                    ? 'bg-[var(--accent)] text-white'
                    : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]'
                }`}
              >
                <span>{m.icon}</span>
                <span>{m.label}</span>
              </button>
            ))}
          </div>
          
          {/* Model Selector & Actions */}
          <div className="flex gap-2 items-center justify-between">
            <div className="flex items-center gap-2 flex-1">
              <label className="text-sm text-[var(--text-secondary)]">Model:</label>
              <select
                value={model}
                onChange={e => setModel(e.target.value)}
                className="text-sm px-2 py-1 rounded bg-[var(--bg-secondary)] border-[var(--border)]"
              >
                {MODELS.map(m => (
                  <option key={m.id} value={m.id} disabled={!m.free && !pollinations.pollenKey}>
                    {m.name} ({m.cost}) {!m.free && '🔒'}
                  </option>
                ))}
              </select>
              {requiresBYOP && (
                <button
                  onClick={() => setShowBYOP(true)}
                  className="text-xs text-[var(--accent)] hover:underline"
                >
                  unlock premium
                </button>
              )}
            </div>
            
            <button
              onClick={clearChat}
              className="p-2 hover:bg-[var(--bg-secondary)] rounded-full transition-colors"
              title="Clear chat"
            >
              <TrashIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="container py-4 space-y-4">
          {messages.length === 0 && (
            <div className="text-center py-12 text-[var(--text-muted)]">
              <p className="text-lg mb-2">
                {mode === 'regular' && "ask me anything..."}
                {mode === 'tarot' && "what question do you bring to the cards?"}
                {mode === 'astrology' && "tell me your birth details..."}
                {mode === 'therapist' && "what's on your mind?"}
                {mode === 'story' && "what kind of story should we create?"}
              </p>
              <p className="text-sm">
                tip: shift + enter for new line
              </p>
            </div>
          )}
          
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                  msg.role === 'user'
                    ? 'bg-[var(--accent)] text-white'
                    : msg.role === 'system'
                    ? 'bg-[var(--danger)]/10 text-[var(--danger)] border border-[var(--danger)]'
                    : 'bg-[var(--bg-secondary)] border border-[var(--border)]'
                }`}
              >
                <div className="text-xs font-semibold mb-1 opacity-70 uppercase tracking-wide">
                  {msg.role === 'user' ? 'You' : msg.role === 'system' ? 'System' : 'AI'}
                </div>
                <div className="whitespace-pre-wrap break-words">{msg.content}</div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-2xl px-4 py-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-[var(--text-muted)] rounded-full animate-pulse" />
                  <div className="w-2 h-2 bg-[var(--text-muted)] rounded-full animate-pulse delay-75" />
                  <div className="w-2 h-2 bg-[var(--text-muted)] rounded-full animate-pulse delay-150" />
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {/* Input */}
      <div className="border-t border-[var(--border)] bg-[var(--bg-primary)] sticky bottom-[var(--nav-bottom-height)]">
        <div className="container py-3">
          <div className="flex gap-2 items-end">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={`message ${mode} AI...`}
              rows={1}
              className="flex-1 resize-none max-h-32 px-4 py-3 rounded-xl"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="p-3 bg-[var(--accent)] text-white rounded-xl hover:bg-[var(--accent-hover)] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <PaperAirplaneIcon className="w-6 h-6" />
            </button>
          </div>
          
          <p className="text-xs text-[var(--text-muted)] mt-2 text-center">
            💾 conversation auto-saved to{' '}
            <a href="/history" className="text-[var(--accent)] hover:underline">history</a>
          </p>
        </div>
      </div>
      
      {/* BYOP Modal */}
      <BYOPModal
        isOpen={showBYOP}
        onClose={() => setShowBYOP(false)}
        onSave={handleBYOPSave}
      />
    </div>
  )
}
