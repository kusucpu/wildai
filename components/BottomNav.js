'use client'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  ChatBubbleLeftIcon,
  PhotoIcon,
  SparklesIcon,
  ClockIcon,
  NewspaperIcon,
  VideoCameraIcon,
  PuzzlePieceIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline'

const NAV_ITEMS = [
  { id: 'chat', label: 'Chat', icon: ChatBubbleLeftIcon, href: '/chat' },
  { id: 'image', label: 'Image', icon: PhotoIcon, href: '/image' },
  { id: 'god', label: 'God', icon: SparklesIcon, href: '/god-prompt' },
  { id: 'history', label: 'History', icon: ClockIcon, href: '/history' },
  { id: 'article', label: 'Article', icon: NewspaperIcon, href: '/articles', badge: 'soon' },
  { id: 'video', label: 'Video', icon: VideoCameraIcon, href: '/videos', badge: 'soon' },
  { id: 'game', label: 'Game', icon: PuzzlePieceIcon, href: '/game', badge: 'soon' }
]

export default function BottomNav({ isVisible }) {
  const pathname = usePathname()
  const scrollRef = useRef(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)
  
  const checkScroll = () => {
    const el = scrollRef.current
    if (!el) return
    
    const isStart = el.scrollLeft <= 5
    const isEnd = el.scrollLeft >= (el.scrollWidth - el.clientWidth - 5)
    
    setShowLeftArrow(!isStart)
    setShowRightArrow(!isEnd)
  }
  
  useEffect(() => {
    checkScroll()
    const el = scrollRef.current
    if (el) {
      el.addEventListener('scroll', checkScroll)
      window.addEventListener('resize', checkScroll)
      return () => {
        el.removeEventListener('scroll', checkScroll)
        window.removeEventListener('resize', checkScroll)
      }
    }
  }, [])
  
  useEffect(() => {
    const activeItem = document.querySelector('.nav-item.active')
    if (activeItem && scrollRef.current) {
      setTimeout(() => {
        activeItem.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        })
      }, 100)
    }
  }, [pathname])
  
  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -200, behavior: 'smooth' })
  }
  
  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 200, behavior: 'smooth' })
  }
  
  const handleNavClick = () => {
    if (navigator.vibrate) {
      navigator.vibrate(10)
    }
  }
  
  if (!isVisible) return null
  
  return (
    <nav className="bottom-nav">
      {showLeftArrow && (
        <button 
          className="nav-arrow nav-arrow-left"
          onClick={scrollLeft}
          aria-label="Scroll left"
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
      )}
      
      <div 
        ref={scrollRef}
        className="nav-scroll-container"
      >
        <div className="nav-items">
          {NAV_ITEMS.map(item => {
            const Icon = item.icon
            const isActive = pathname.startsWith(item.href)
            
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`nav-item ${isActive ? 'active' : ''}`}
                onClick={handleNavClick}
              >
                <div className="nav-icon-wrapper">
                  <Icon className="nav-icon" />
                  {item.badge && (
                    <span className="nav-badge">{item.badge}</span>
                  )}
                </div>
                <span className="nav-label">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </div>
      
      {showRightArrow && (
        <button 
          className="nav-arrow nav-arrow-right"
          onClick={scrollRight}
          aria-label="Scroll right"
        >
          <ChevronRightIcon className="w-6 h-6" />
        </button>
      )}
    </nav>
  )
}
