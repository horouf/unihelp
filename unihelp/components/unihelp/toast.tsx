"use client"

import { CheckCircle } from 'lucide-react'
import type { Language } from '@/app/page'

interface ToastProps {
  lang: Language
  isVisible: boolean
}

export function Toast({ lang, isVisible }: ToastProps) {
  return (
    <div
      className={`toast fixed bottom-20 lg:bottom-8 left-1/2 -translate-x-1/2 z-[110] bg-primary text-primary-foreground text-sm font-medium px-6 py-3 rounded-full flex items-center gap-2 shadow-lg ${
        isVisible ? 'show' : ''
      }`}
    >
      <CheckCircle className="w-4 h-4" />
      <span>
        {lang === 'ar' ? 'يتم تحويلك للواتساب...' : 'Redirecting to WhatsApp...'}
      </span>
    </div>
  )
}
