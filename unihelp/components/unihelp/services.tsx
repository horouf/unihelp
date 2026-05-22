"use client"

import { Presentation, Code2, FileText, ArrowUpRight } from 'lucide-react'
import type { Language } from '@/app/page'

interface ServicesProps {
  lang: Language
  openModal: (service: string) => void
}

const services = [
  {
    id: 'slides',
    icon: Presentation,
    title: { ar: 'عروض تقديمية', en: 'Presentation Slides' },
    description: {
      ar: 'تصاميم باوربوينت نظيفة واحترافية مخصّصة للعروض الصفية، أيام التقديم، ومناقشات التخرّج.',
      en: 'Clean, professional PowerPoint decks designed for class presentations, pitch days, and thesis defences.',
    },
    tags: [
      { ar: 'تصميم مخصّص', en: 'Custom Design' },
      { ar: 'حركات', en: 'Animations' },
      { ar: 'ملاحظات المتحدّث', en: 'Speaker Notes' },
    ],
    delay: 'delay-2',
  },
  {
    id: 'dev',
    icon: Code2,
    title: { ar: 'تطبيقات ويب وموبايل', en: 'Web & Mobile Apps' },
    description: {
      ar: 'مواقع، تطبيقات ويب، وتطبيقات موبايل مبرمجة حسب متطلبات مشروعك الجامعي.',
      en: 'Websites, web apps, and mobile applications built for your university project requirements.',
    },
    tags: [
      { ar: 'موقع إلكتروني', en: 'Website' },
      { ar: 'تطبيق ويب', en: 'Web App' },
      { ar: 'تطبيق موبايل', en: 'Mobile App' },
    ],
    delay: 'delay-3',
  },
  {
    id: 'docs',
    icon: FileText,
    title: { ar: 'توثيق المشاريع', en: 'Project Documentation' },
    description: {
      ar: 'كتابة المشروع بالكامل — مواصفات متطلبات النظام، مخططات البنية، دليل المستخدم، وكلّه اللي يتوقّعه منك مشرفك.',
      en: "Full project write-up — SRS, architecture docs, user manuals, and everything your supervisor expects.",
    },
    tags: [
      { ar: 'SRS', en: 'SRS' },
      { ar: 'البنية التقنية', en: 'Architecture' },
      { ar: 'دليل المستخدم', en: 'User Manual' },
    ],
    delay: 'delay-4',
  },
]

export function Services({ lang, openModal }: ServicesProps) {
  return (
    <section className="max-w-2xl mx-auto px-5 py-12 lg:py-16">
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-8 animate-reveal delay-2">
        {lang === 'ar' ? 'الخدمات المتوفّرة' : 'WHAT I OFFER'}
      </p>

      <div className="space-y-4">
        {services.map((service) => (
          <div
            key={service.id}
            className={`service-card rounded-xl p-6 lg:p-8 animate-reveal ${service.delay} cursor-pointer`}
            onClick={() => openModal(service.id)}
          >
            <div className="flex items-start gap-4">
              <div className="icon-box w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <service.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg font-medium tracking-tight">
                    {service.title[lang]}
                  </h3>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground flex-shrink-0 arrow-icon" />
                </div>
                <p className="mt-1.5 text-sm font-light text-muted-foreground leading-relaxed">
                  {service.description[lang]}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {service.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground bg-secondary px-2.5 py-1 rounded-md"
                    >
                      {tag[lang]}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
