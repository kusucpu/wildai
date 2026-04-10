# 🤖 wildAItech - Free AI Playground

AI tools without the corporate BS. Built with a phone, coffee, and pure spite.

![Next.js](https://img.shields.io/badge/Next.js-14.2-black?logo=next.js)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-black?logo=vercel)
![License](https://img.shields.io/badge/License-MIT-blue)

## 🌐 Live Demo

**[wildaitech.vercel.app](https://wildaitech.vercel.app)**

---

## ✨ Features

### 💬 **Multi-Mode Chat**
- **Regular**: Casual AI assistant
- **Tarot**: Mystical card readings (for fun)
- **Astrology**: Birth chart insights
- **Vent**: Emotional support (NOT a real therapist)
- **Story**: Interactive choose-your-own-adventure

### 🎨 **Image Generation**
- Flux & Z-Image models
- Multiple aspect ratios (1:1, 3:4, 4:3, 9:16, 16:9)
- Style presets (realistic, anime, 3D, pixel art, cyberpunk)
- Prompt enhancement via AI
- 1-5 images per generation

### ⚡ **God Prompt Library**
- Battle-tested prompt templates
- Copy-paste ready
- Searchable & categorized
- Community-voted rankings

### 📜 **Smart History**
- Auto-save chat & images
- 100MB storage limit (auto-cleanup)
- Quick reload conversations
- Image gallery with preview

### 🎯 **Other Features**
- 🌙 Dark/Light mode (auto-detect system preference)
- 📱 PWA ready (installable on mobile)
- 🔑 BYOP support (bring your own Pollinations key)
- 🚀 Fast page transitions
- 📊 Usage tracking (local only)

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 14 (App Router) |
| **Styling** | CSS Variables + Tailwind CSS |
| **AI API** | Pollinations.ai (free tier) |
| **Icons** | Heroicons |
| **Animations** | Framer Motion |
| **Hosting** | Vercel (free plan) |
| **Version Control** | GitHub |

---

## 📱 Built Entirely on Mobile

This entire project was coded on a **Xiaomi Redmi S2** using:

- **Acode** - Android code editor with syntax highlighting
- **GitHub Mobile** - Manual file uploads & commits
- **Free WiFi** - Coffee shop internet (the real MVP)
- **No Desktop** - Zero npm installs, pure copy-paste workflow

**Total cost:** $0 (excluding coffee ☕)

---

## 🚀 Quick Start (Local Development)

```bash
# Clone repository
git clone https://github.com/kusucpu/wildaitech.git
cd wildaitech

# Install dependencies
npm install

# Run development server
npm run dev

# Open browser
# http://localhost:3000
```

---

## 🔑 BYOP (Bring Your Own Pollen)

### Free Tier
- 100 requests per hour (resets hourly)
- Access to free models: Flux, Z-Image, Mistral, Qwen

### Premium (BYOP)
- Unlimited requests
- Access to 15+ premium models
- Faster generation
- No rate limits

**Get your key:** [enter.pollinations.ai](https://enter.pollinations.ai)

**How to use:**
1. Click Settings icon (⚙️) in app
2. Paste your Pollen API key
3. Enjoy unlimited access!

---

## 📂 Project Structure

```
wildaitech/
├── app/
│   ├── layout.js           # Root layout (nav + theme)
│   ├── page.js             # Landing page
│   ├── globals.css         # Global styles
│   ├── chat/               # Chat modes
│   ├── image/              # Image generation
│   ├── god-prompt/         # Prompt library
│   ├── history/            # Chat/image history
│   ├── about/              # About page
│   ├── disclaimer/         # Legal disclaimer
│   └── privacy/            # Privacy policy
├── components/
│   ├── TopNav.js           # Top navigation
│   ├── BottomNav.js        # Bottom nav (scrollable)
│   ├── PageTransition.js   # Smooth page changes
│   ├── BYOPModal.js        # API key modal
│   └── MaintenanceScreen.js
├── lib/
│   ├── pollinations.js     # API wrapper
│   ├── storage.js          # LocalStorage manager
│   └── prompts.js          # God Prompt library
├── public/
│   ├── manifest.json       # PWA manifest
│   ├── icon-192.png
│   └── icon-512.png
├── package.json
├── next.config.js
├── tailwind.config.js
└── README.md
```

---

## 🎨 Design Philosophy

### Colors
- **Light Mode:** Warm whites, high contrast
- **Dark Mode:** True black (OLED-friendly)
- **Accent:** Purple gradient (#7c3aed → #ec4899)

### Typography
- **Font:** Inter (readable, not too wide)
- **Sizes:** Fluid (clamp() for responsive)
- **Line Height:** 1.6 (comfortable reading)

### UX Principles
1. **Mobile-first** (70%+ users on phones)
2. **No BS** (honest error messages)
3. **Instant feedback** (loading states, animations)
4. **Offline-capable** (PWA support)

---

## 🤝 Contributing

This is a solo project, but ideas welcome!

**Want to help?**
- 🐛 Report bugs via [Issues](https://github.com/kusucpu/wildaitech/issues)
- 💡 Suggest features
- ⭐ Star the repo (motivates me to keep building)

---

## 📜 License

**MIT License** - Do whatever you want, just don't sue me.

Full text: [LICENSE](LICENSE)

---

## ⚠️ Disclaimer

- **NOT professional advice** (medical, legal, financial)
- **AI can be wrong** (verify important stuff)
- **For entertainment** (have fun, stay safe)

Full disclaimer: [wildaitech.vercel.app/disclaimer](https://wildaitech.vercel.app/disclaimer)

---

## 🙏 Credits & Thanks

### Services
- [Pollinations.ai](https://pollinations.ai) - Free AI API (absolute legends)
- [Vercel](https://vercel.com) - Free hosting with zero config
- [GitHub](https://github.com) - Code home & CI/CD

### AI Assistants
- ChatGPT, Claude, Gemini - Basically my coding teachers

### Inspiration
- Every corporate AI tool that charges $99/mo for basic features
- Coffee shop WiFi networks worldwide ☕

---

## 📊 Stats

- **Lines of Code:** ~3,500+
- **Development Time:** 2 weeks (on/off, between coffee breaks)
- **Bugs Fixed:** Too many to count
- **Coffee Consumed:** Immeasurable ☕☕☕

---

## 🗺️ Roadmap

### ✅ Done
- [x] Multi-mode chat
- [x] Image generation
- [x] God Prompt library
- [x] History management
- [x] PWA support
- [x] BYOP integration

### 🚧 In Progress
- [ ] Background remover (remove.bg API)
- [ ] Sticker maker
- [ ] Image-to-image generation

### 💭 Future Ideas
- [ ] Article section (AI-written tutorials)
- [ ] Video section (trending content)
- [ ] Mini games
- [ ] Community gallery
- [ ] API rate limit dashboard

---

## 📞 Contact

**Questions? Feedback? Just wanna say hi?**

- GitHub: [@kusucpu](https://github.com/kusucpu)
- Twitter: @saflink (if I remember to post)

---

## 💖 Support

If this project helped you:

- ⭐ Star the repo
- 🐦 Share on Twitter
- ☕ Buy me a coffee (link TBD)

**Or just use it and have fun. That's enough 🙂**

---

<div align="center">

**Built with different ❤️ and ☕**

[Live Site](https://wildaitech.vercel.app) • [Report Bug](https://github.com/kusucpu/wildaitech/issues) • [Request Feature](https://github.com/kusucpu/wildaitech/issues)

---

*wildAItech - Where AI meets chaos (in a good way)*

</div>
