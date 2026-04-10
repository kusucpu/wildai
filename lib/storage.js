// LocalStorage helper with 100MB limit

const MAX_STORAGE = 100 * 1024 * 1024 // 100MB in bytes

export const storage = {
  // Calculate current usage
  getUsage() {
    let total = 0
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        total += localStorage[key].length + key.length
      }
    }
    return total * 2 // UTF-16 = 2 bytes per char
  },
  
  // Save with auto-cleanup
  save(key, data) {
    const dataStr = JSON.stringify(data)
    const dataSize = dataStr.length * 2
    
    // Check if adding this would exceed limit
    if (this.getUsage() + dataSize > MAX_STORAGE) {
      this.cleanup(dataSize)
    }
    
    try {
      localStorage.setItem(key, dataStr)
      return true
    } catch (e) {
      console.error('Storage error:', e)
      return false
    }
  },
  
  // Load data
  load(key) {
    try {
      const data = localStorage.getItem(key)
      return data ? JSON.parse(data) : null
    } catch (e) {
      console.error('Parse error:', e)
      return null
    }
  },
  
  // Cleanup old data
  cleanup(requiredSpace) {
    const chatHistory = this.load('chat_history') || []
    const imageHistory = this.load('image_history') || []
    
    // Remove oldest items until we have space
    while (this.getUsage() + requiredSpace > MAX_STORAGE) {
      if (chatHistory.length > 0) {
        chatHistory.shift()
      } else if (imageHistory.length > 0) {
        imageHistory.shift()
      } else {
        break
      }
    }
    
    this.save('chat_history', chatHistory)
    this.save('image_history', imageHistory)
  },
  
  // Add to chat history
  addChatHistory(conversation) {
    const history = this.load('chat_history') || []
    history.push({
      id: Date.now(),
      timestamp: new Date().toISOString(),
      preview: conversation[0]?.content.substring(0, 50) + '...',
      messages: conversation,
      mode: conversation.mode || 'regular'
    })
    this.save('chat_history', history)
  },
  
  // Add to image history
  addImageHistory(image) {
    const history = this.load('image_history') || []
    history.push({
      id: Date.now(),
      timestamp: new Date().toISOString(),
      ...image
    })
    this.save('image_history', history)
  },
  
  // Delete specific item
  deleteItem(type, id) {
    const history = this.load(`${type}_history`) || []
    const filtered = history.filter(item => item.id !== id)
    this.save(`${type}_history`, filtered)
  },
  
  // Clear all history
  clearHistory(type) {
    if (type === 'all') {
      localStorage.removeItem('chat_history')
      localStorage.removeItem('image_history')
    } else {
      localStorage.removeItem(`${type}_history`)
    }
  },
  
  // Get stats
  getStats() {
    const usage = this.getUsage()
    return {
      used: usage,
      total: MAX_STORAGE,
      percentage: ((usage / MAX_STORAGE) * 100).toFixed(2),
      usedMB: (usage / (1024 * 1024)).toFixed(2),
      totalMB: (MAX_STORAGE / (1024 * 1024)).toFixed(2)
    }
  }
}
