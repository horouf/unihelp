"use client"

import { useState, useEffect, useRef } from 'react'
import { Navbar } from '@/components/unihelp/navbar'
import { Hero } from '@/components/unihelp/hero'
import { Services } from '@/components/unihelp/services'
import { HowItWorks } from '@/components/unihelp/how-it-works'
import { BottomCTA } from '@/components/unihelp/bottom-cta'
import { Footer } from '@/components/unihelp/footer'
import { FloatingCTA } from '@/components/unihelp/floating-cta'
import { ContactModal } from '@/components/unihelp/contact-modal'
import { Toast } from '@/components/unihelp/toast'
import { Divider } from '@/components/unihelp/divider'

export type Language = 'ar' | 'en'

export default function Home() {
  const [lang, setLang] = useState<Language>('ar')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedService, setSelectedService] = useState('')
  const [showToast, setShowToast] = useState(false)
  const [isFloatingVisible, setIsFloatingVisible] = useState(true)
  const bottomCtaRef = useRef<HTMLDivElement>(null)

  const toggleLang = () => {
    const newLang = lang === 'ar' ? 'en' : 'ar'
    setLang(newLang)
    document.documentElement.lang = newLang
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr'
  }

  const openModal = (service?: string) => {
    if (service) setSelectedService(service)
    setIsModalOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setIsModalOpen(false)
    document.body.style.overflow = ''
  }

  const handleShowToast = () => {
    setShowToast(true)
    setTimeout(() => setShowToast(false), 2000)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsFloatingVisible(!entry.isIntersecting)
        })
      },
      { threshold: 0.3 }
    )

    if (bottomCtaRef.current) {
      observer.observe(bottomCtaRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen pb-24 lg:pb-0">
      <Navbar lang={lang} toggleLang={toggleLang} openModal={openModal} />
      <Hero lang={lang} />
      <Divider />
      <Services lang={lang} openModal={openModal} />
      <Divider />
      <HowItWorks lang={lang} />
      <Divider />
      <BottomCTA ref={bottomCtaRef} lang={lang} openModal={openModal} />
      <Footer lang={lang} />
      <FloatingCTA lang={lang} openModal={openModal} isVisible={isFloatingVisible} />
      <ContactModal
        lang={lang}
        isOpen={isModalOpen}
        selectedService={selectedService}
        onClose={closeModal}
        onShowToast={handleShowToast}
      />
      <Toast lang={lang} isVisible={showToast} />
    </div>
  )
}
