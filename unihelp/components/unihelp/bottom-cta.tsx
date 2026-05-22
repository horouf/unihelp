"use client"

import { forwardRef } from 'react'
import { MessageCircle } from 'lucide-react'
import type { Language } from '@/app/page'

interface BottomCTAProps {
  lang: Language
  openModal: () => void
}

export const BottomCTA = forwardRef<HTMLDivElement, BottomCTAProps>(
  ({ lang, openModal }, ref) => {
    return (
      <section
        ref={ref}
        className="max-w-2xl mx-auto px-5 py-12 lg:py-16 text-center animate-reveal delay-3"
      >
        <h2 className="text-2xl lg:text-3xl font-light tracking-tighter leading-tight">
          {lang === 'ar' ? 'جاهز تبدأ؟' : 'Ready to get started?'}
        </h2>
        <p className="mt-3 text-sm font-light text-muted-foreground max-w-sm mx-auto">
          {lang === 'ar'
            ? 'قلّي إيش تبي وأردّ عليك خلال ساعات.'
            : "Tell me what you need and I'll get back to you within a few hours."}
        </p>
        <button
          onClick={() => openModal()}
          className="cta-btn mt-6 inline-flex items-center gap-2 text-sm font-medium px-8 py-3.5 rounded-lg"
        >
          <MessageCircle className="w-4 h-4" />
          <span>{lang === 'ar' ? 'أرسل رسالة' : 'Send a Message'}</span>
        </button>
      </section>
    )
  }
)

BottomCTA.displayName = 'BottomCTA'
