"use client"

import { Mail, Instagram, Twitter } from 'lucide-react'
import type { Language } from '@/app/page'

interface FooterProps {
  lang: Language
}

export function Footer({ lang }: FooterProps) {
  return (
    <footer className="max-w-2xl mx-auto px-5 py-8 border-t border-border">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground">
          &copy; 2026 UniHelp.{' '}
          <span>{lang === 'ar' ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}</span>
        </p>
        <div className="flex items-center gap-4">
          <a
            href="mailto:horouf36@gmail.com"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Mail className="w-4 h-4" />
          </a>
          <a
            href="#"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Instagram className="w-4 h-4" />
          </a>
          <a
            href="#"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Twitter className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  )
}
