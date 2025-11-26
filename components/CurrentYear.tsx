'use client'

import { useState, useEffect } from 'react'

export default function CurrentYear() {
  const [year, setYear] = useState(2025)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setYear(new Date().getFullYear())
  }, [])

  // Suppress hydration warning by using suppressHydrationWarning on parent
  // or return consistent value
  return <span suppressHydrationWarning>{year}</span>
}
