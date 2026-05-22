"use client"

import { GraduationCap, Globe } from 'lucide-react'
import type { Language } from '@/app/page'

interface NavbarProps {
  lang: Language
  toggleLang: () => void
  openModal: () => void
}

export function Navbar({ lang, toggleLang, openModal }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border">
      <div className="max-w-2xl mx-auto px-5 h-14 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
            <GraduationCap className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-semibold text-sm tracking-tight">
            {lang === 'ar' ? 'يوني هيلب' : 'UniHelp'}
          </span>
        </a>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleLang}
            className="ghost-btn text-[11px] font-medium px-3 py-2 rounded-lg flex items-center gap-1.5"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'EN' : 'عربي'}</span>
          </button>
          <button
            onClick={() => openModal()}
            className="cta-btn text-xs font-medium px-4 py-2 rounded-lg"
          >
            {lang === 'ar' ? 'تواصل معي' : 'Get in Touch'}
          </button>
        </div>
      </div>
    </nav>
  )
}
