class PollinationsClient {
  constructor() {
    this.baseURL = {
      text: 'https://text.pollinations.ai',
      image: 'https://image.pollinations.ai/prompt', // Updated
      imageGen: 'https://gen.pollinations.ai/v1/image' // New endpoint
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
    return this.requestCount < 100
  }
  
  async chat(messages, options = {}) {
    const {
      model = 'mistral',
      system = '',
      temperature = 0.7
    } = options
    
    if (!this.pollenKey && !this.canUseFreeTier()) {
      throw new Error('pollen_quota_exceeded')
    }
    
    this.requestCount++
    this.saveConfig()
    
    try {
      let prompt = system ? `${system}\n\n` : ''
      messages.forEach(msg => {
        const role = msg.role === 'user' ? 'User' : 'Assistant'
        prompt += `${role}: ${msg.content}\n`
      })
      
      const url = new URL(this.baseURL.text)
      url.pathname = `/${encodeURIComponent(prompt)}`
      url.searchParams.set('model', model)
      url.searchParams.set('seed', Date.now().toString())
      
      if (this.pollenKey) {
        url.searchParams.set('pollen', this.pollenKey)
      }
      
      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'Accept': 'text/plain'
        }
      })
      
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
      nologo = 'true',
      enhance = 'false',
      seed
    } = options
    
    if (!this.pollenKey && !this.canUseFreeTier()) {
      throw new Error('pollen_quota_exceeded')
    }
    
    this.requestCount++
    this.saveConfig()
    
    try {
      const useGenEndpoint = ['flux', 'zimage', 'klein'].includes(model)
      
      let imageUrl
      
      if (useGenEndpoint) {
        const params = new URLSearchParams({
          model,
          prompt: prompt,
          width: width.toString(),
          height: height.toString(),
          nologo,
          enhance,
          seed: (seed || Date.now()).toString()
        })
        
        if (this.pollenKey) {
          params.set('pollen', this.pollenKey)
        }
        
        imageUrl = `${this.baseURL.imageGen}?${params.toString()}`
        
      } else {
        const params = new URLSearchParams({
          model,
          width: width.toString(),
          height: height.toString(),
          nologo,
          seed: (seed || Date.now()).toString()
        })
        
        if (this.pollenKey) {
          params.set('pollen', this.pollenKey)
        }
        
        imageUrl = `${this.baseURL.image}/${encodeURIComponent(prompt)}?${params.toString()}`
      }
      
      return {
        url: imageUrl,
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
      503: "service temporarily unavailable. servers might be updating 🔧",
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
