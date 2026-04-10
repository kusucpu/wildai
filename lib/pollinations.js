class PollinationsClient {
  constructor() {
    this.baseURL = {
      text: 'https://text.pollinations.ai',
      image: 'https://image.pollinations.ai'
    }
    this.pollenKey = null
    this.requestCount = 0
    this.pollenPerHour = 0.01
    this.lastReset = Date.now()
    this.loadConfig()
  }
  
  loadConfig() {
    if (typeof window === 'undefined') return
    
    this.pollenKey = localStorage.getItem('pollen_key')
    this.requestCount = parseInt(localStorage.getItem('request_count') || '0')
    this.lastReset = parseInt(localStorage.getItem('last_reset') || Date.now())
    
    // Reset count setiap jam
    const hourInMs = 3600000
    if (Date.now() - this.lastReset > hourInMs) {
      this.requestCount = 0
      this.lastReset = Date.now()
      this.saveConfig()
    }
  }
  
  saveConfig() {
    if (typeof window === 'undefined') return
    
    if (this.pollenKey) {
      localStorage.setItem('pollen_key', this.pollenKey)
    }
    localStorage.setItem('request_count', this.requestCount.toString())
    localStorage.setItem('last_reset', this.lastReset.toString())
  }
  
  canUseFreeTier() {
    // 0.01 pollen/hour = ~100 requests max per hour (assuming 0.0001 per request)
    return this.requestCount < 100
  }
  
  async chat(messages, options = {}) {
    const {
      model = 'mistral',
      system = '',
      temperature = 0.7
    } = options
    
    // Check quota
    if (!this.pollenKey && !this.canUseFreeTier()) {
      throw new Error('pollen_quota_exceeded')
    }
    
    this.requestCount++
    this.saveConfig()
    
    try {
      // Format prompt
      let prompt = system ? `${system}\n\n` : ''
      messages.forEach(msg => {
        prompt += `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}\n`
      })
      
      const url = `${this.baseURL.text}/${encodeURIComponent(prompt)}`
      const params = new URLSearchParams({
        model,
        seed: Date.now(),
        ...(this.pollenKey && { pollen: this.pollenKey })
      })
      
      const response = await fetch(`${url}?${params}`)
      
      if (!response.ok) {
        throw new Error(this.getErrorMessage(response.status))
      }
      
      const text = await response.text()
      return {
        content: text,
        model,
        usedPollen: !!this.pollenKey
      }
      
    } catch (error) {
      console.error('Chat API error:', error)
      throw error
    }
  }
  
  async generateImage(prompt, options = {}) {
    const {
      model = 'flux',
      width = 1024,
      height = 1024,
      nologo = true,
      enhance = false,
      seed
    } = options
    
    if (!this.pollenKey && !this.canUseFreeTier()) {
      throw new Error('pollen_quota_exceeded')
    }
    
    this.requestCount++
    this.saveConfig()
    
    try {
      const params = new URLSearchParams({
        model,
        width,
        height,
        nologo,
        enhance,
        seed: seed || Date.now(),
        ...(this.pollenKey && { pollen: this.pollenKey })
      })
      
      const url = `${this.baseURL.image}/prompt/${encodeURIComponent(prompt)}?${params}`
      
      return {
        url,
        prompt,
        model,
        dimensions: `${width}x${height}`,
        usedPollen: !!this.pollenKey,
        seed: seed || Date.now()
      }
      
    } catch (error) {
      console.error('Image API error:', error)
      throw error
    }
  }
  
  getErrorMessage(status) {
    const errors = {
      429: "woah slow down! too many requests. wait a sec or add your pollen key 🔑",
      500: "pollinations servers having a moment. try again? ⏰",
      403: "invalid pollen key. check your credits at pollinations.ai 💰",
      default: "something broke. screenshot this? 🐛"
    }
    return errors[status] || errors.default
  }
  
  setPollenKey(key) {
    this.pollenKey = key
    this.saveConfig()
  }
  
  removePollenKey() {
    this.pollenKey = null
    if (typeof window !== 'undefined') {
      localStorage.removeItem('pollen_key')
    }
  }
  
  getStats() {
    return {
      totalRequests: this.requestCount,
      hasPollen: !!this.pollenKey,
      mode: this.pollenKey ? 'BYOP' : 'Free Tier',
      remainingFree: this.canUseFreeTier() ? 100 - this.requestCount : 0,
      nextReset: new Date(this.lastReset + 3600000).toLocaleTimeString()
    }
  }
}

export const pollinations = new PollinationsClient()
