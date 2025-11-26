'use client'

import { useEffect, useRef, ReactNode } from 'react'

interface ScrollRevealProps {
  children: ReactNode
  animation?: 'fade-in' | 'slide-up' | 'slide-right' | 'slide-left' | 'scale-in'
  delay?: number
  className?: string
}

export default function ScrollReveal({
  children,
  animation = 'slide-up',
  delay = 0,
  className = ''
}: ScrollRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              element.classList.add(animation)
            }, delay)
            observer.unobserve(element)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    observer.observe(element)

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [animation, delay])

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  )
}
