"use client"

import type { Language } from '@/app/page'

interface HowItWorksProps {
  lang: Language
}

const steps = [
  {
    number: 1,
    title: { ar: 'أرسل لي متطلباتك', en: 'Send your requirements' },
    description: {
      ar: 'شاركني التكليف أو معايير التقييم — وحتى الفكرة العامة تكفي.',
      en: 'Share your brief, rubric, or project description — even a rough idea works.',
    },
    hasLine: true,
  },
  {
    number: 2,
    title: { ar: 'تحصل على السعر والتاريخ', en: 'Get a quote & timeline' },
    description: {
      ar: 'أراجع طلبك وأرسل لك سعر واضح وموعد تسليم — بدون مفاجآت.',
      en: "I'll review and send you a clear price and delivery date — no surprises.",
    },
    hasLine: true,
  },
  {
    number: 3,
    title: { ar: 'استلم وتعديل', en: 'Receive & revise' },
    description: {
      ar: 'تستلم العمل في وقته، مع تعديلات مجانية لحد ما تضبط معك.',
      en: "Get your deliverable on time, with revisions included until you're satisfied.",
    },
    hasLine: false,
  },
]

export function HowItWorks({ lang }: HowItWorksProps) {
  return (
    <section className="max-w-2xl mx-auto px-5 py-12 lg:py-16">
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-8 animate-reveal">
        {lang === 'ar' ? 'كيف تتم العمليّة' : 'HOW IT WORKS'}
      </p>

      <div className="space-y-0">
        {steps.map((step, index) => (
          <div key={step.number} className={`flex gap-5 animate-reveal delay-${index + 1}`}>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-xs font-semibold text-primary">
                {step.number}
              </div>
              {step.hasLine && (
                <div className="w-px flex-1 bg-gradient-to-b from-primary/20 to-transparent my-2" />
              )}
            </div>
            <div className={step.hasLine ? 'pb-8' : ''}>
              <h3 className="text-sm font-medium">{step.title[lang]}</h3>
              <p className="mt-1 text-sm font-light text-muted-foreground">
                {step.description[lang]}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
