'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    Cal?: any
  }
}

export default function CalendlyWidget() {
  useEffect(() => {
    // Load Cal.com script dynamically
    const initCal = () => {
      const C = window
      const A = "https://app.cal.com/embed/embed.js"
      const L = "init"
      
      const p = function (a: any, ar: any) { a.q.push(ar) }
      const d = C.document
      
      C.Cal = C.Cal || function () {
        const cal = C.Cal
        const ar = arguments
        if (!cal.loaded) {
          cal.ns = {}
          cal.q = cal.q || []
          const script = d.head.appendChild(d.createElement("script"))
          script.src = A
          cal.loaded = true
        }
        if (ar[0] === L) {
          const api = function () { p(api, arguments) }
          const namespace = ar[1]
          api.q = api.q || []
          if (typeof namespace === "string") {
            cal.ns[namespace] = cal.ns[namespace] || api
            p(cal.ns[namespace], ar)
            p(cal, ["initNamespace", namespace])
          } else {
            p(cal, ar)
          }
          return
        }
        p(cal, ar)
      }
    }

    initCal()
    
    // Initialize Cal.com element-click
    if (window.Cal) {
      window.Cal("init", "30min", { origin: "https://app.cal.com" })
      
      window.Cal.ns["30min"]("ui", { 
        "hideEventTypeDetails": false, 
        "layout": "month_view" 
      })
    }
  }, [])

  return (
    <button
      data-cal-link="mouadassargual/30min"
      data-cal-namespace="30min"
      data-cal-config='{"layout":"month_view"}'
      className="group relative w-full px-12 py-6 bg-white text-black font-bold text-lg overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-white/20"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-gray-100 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700"></div>
      <span className="relative z-10 flex items-center justify-center gap-3">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        Book a Free Consultation
        <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </span>
    </button>
  )
}
