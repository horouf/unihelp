"use client"

import { MessageCircle } from 'lucide-react'
import type { Language } from '@/app/page'

interface FloatingCTAProps {
  lang: Language
  openModal: () => void
  isVisible: boolean
}

export function FloatingCTA({ lang, openModal, isVisible }: FloatingCTAProps) {
  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 lg:hidden">
      <button
        onClick={() => openModal()}
        className={`floating-cta flex items-center gap-2 text-sm font-semibold px-7 py-3.5 rounded-full ${
          !isVisible ? 'hidden-cta' : ''
        }`}
      >
        <MessageCircle className="w-4 h-4" />
        <span>{lang === 'ar' ? 'راسلني' : 'Message Me'}</span>
      </button>
    </div>
  )
}
