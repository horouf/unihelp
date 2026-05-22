"use client"

import type { Language } from '@/app/page'

interface HeroProps {
  lang: Language
}

export function Hero({ lang }: HeroProps) {
  return (
    <header className="max-w-2xl mx-auto px-5 pt-16 pb-12 lg:pt-24 lg:pb-16">
      <div className="animate-reveal">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary mb-4">
          {lang === 'ar' ? 'مصمّم للطلاب الجامعيين' : 'MADE FOR STUDENTS'}
        </p>
      </div>
      <h1 className="text-[2.5rem] lg:text-6xl font-light leading-[1.05] tracking-tighter animate-reveal delay-1">
        <span>
          {lang === 'ar' ? 'خلّص مشاريعك الجامعية' : 'Get your uni work'}
        </span>
        <br />
        <span className="text-primary font-semibold block mt-3">
          {lang === 'ar' ? 'بشكل احترافي.' : 'done right.'}
        </span>

      </h1>
      <p className="mt-5 text-base lg:text-lg font-light leading-relaxed text-muted-foreground max-w-md animate-reveal delay-2">
        {lang === 'ar'
          ? 'عروض تقديمية احترافية، تطبيقات ويب وموبايل، وتوثيق مشاريع كامل — كلّه جاهز للطلاب اللي يبون جودة وسرعة.'
          : 'Professional slides, full-stack projects, and complete documentation — built for university students who need quality, fast.'}
      </p>
    </header>
  )
}
