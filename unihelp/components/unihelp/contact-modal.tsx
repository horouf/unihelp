"use client"

import { useState, useEffect, useRef } from 'react'
import { X, ChevronDown } from 'lucide-react'
import type { Language } from '@/app/page'

interface ContactModalProps {
  lang: Language
  isOpen: boolean
  selectedService: string
  onClose: () => void
  onShowToast: () => void
}

const countries = [
  { name_ar: 'قطر', name_en: 'Qatar', code: '+974', flag: '🇶🇦' },
  { name_ar: 'الإمارات', name_en: 'UAE', code: '+971', flag: '🇦🇪' },
  { name_ar: 'السعودية', name_en: 'Saudi Arabia', code: '+966', flag: '🇸🇦' },
  { name_ar: 'الكويت', name_en: 'Kuwait', code: '+965', flag: '🇰🇼' },
  { name_ar: 'البحرين', name_en: 'Bahrain', code: '+973', flag: '🇧🇭' },
  { name_ar: 'عُمان', name_en: 'Oman', code: '+968', flag: '🇴🇲' },
  { name_ar: 'مصر', name_en: 'Egypt', code: '+20', flag: '🇪🇬' },
  { name_ar: 'الأردن', name_en: 'Jordan', code: '+962', flag: '🇯🇴' },
  { name_ar: 'لبنان', name_en: 'Lebanon', code: '+961', flag: '🇱🇧' },
  { name_ar: 'العراق', name_en: 'Iraq', code: '+964', flag: '🇮🇶' },
  { name_ar: 'المغرب', name_en: 'Morocco', code: '+212', flag: '🇲🇦' },
  { name_ar: 'تونس', name_en: 'Tunisia', code: '+216', flag: '🇹🇳' },
  { name_ar: 'الجزائر', name_en: 'Algeria', code: '+213', flag: '🇩🇿' },
  { name_ar: 'ليبيا', name_en: 'Libya', code: '+218', flag: '🇱🇾' },
  { name_ar: 'السودان', name_en: 'Sudan', code: '+249', flag: '🇸🇩' },
  { name_ar: 'فلسطين', name_en: 'Palestine', code: '+970', flag: '🇵🇸' },
  { name_ar: 'سوريا', name_en: 'Syria', code: '+963', flag: '🇸🇾' },
  { name_ar: 'اليمن', name_en: 'Yemen', code: '+967', flag: '🇾🇪' },
  { name_ar: 'جزر القمر', name_en: 'Comoros', code: '+269', flag: '🇰🇲' },
  { name_ar: 'جيبوتي', name_en: 'Djibouti', code: '+253', flag: '🇩🇯' },
  { name_ar: 'موريتانيا', name_en: 'Mauritania', code: '+222', flag: '🇲🇷' },
  { name_ar: 'الصومال', name_en: 'Somalia', code: '+252', flag: '🇸🇴' },
  { name_ar: 'المملكة المتحدة', name_en: 'United Kingdom', code: '+44', flag: '🇬🇧' },
  { name_ar: 'أمريكا', name_en: 'United States', code: '+1', flag: '🇺🇸' },
  { name_ar: 'كندا', name_en: 'Canada', code: '+1', flag: '🇨🇦' },
  { name_ar: 'أستراليا', name_en: 'Australia', code: '+61', flag: '🇦🇺' },
  { name_ar: 'ألمانيا', name_en: 'Germany', code: '+49', flag: '🇩🇪' },
  { name_ar: 'ماليزيا', name_en: 'Malaysia', code: '+60', flag: '🇲🇾' },
]

const serviceOptions = [
  { value: '', label: { ar: 'اختر خدمة', en: 'Select a service' } },
  { value: 'slides', label: { ar: 'عرض تقديمية', en: 'Presentation Slides' } },
  { value: 'dev', label: { ar: 'تطبيق ويب أو موبايل', en: 'Web & Mobile App' } },
  { value: 'docs', label: { ar: 'توثيق مشروع', en: 'Project Documentation' } },
  { value: 'full', label: { ar: 'باكيج كامل (برمجة + توثيق)', en: 'Full Package (Build + Docs)' } },
]

export function ContactModal({
  lang,
  isOpen,
  selectedService,
  onClose,
  onShowToast,
}: ContactModalProps) {
  const [selectedCountry, setSelectedCountry] = useState(countries[0])
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    deadline: '',
    details: '',
  })
  const dropdownRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (selectedService) {
      setFormData((prev) => ({ ...prev, service: selectedService }))
    }
  }, [selectedService])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [onClose])

  useEffect(() => {
    if (isDropdownOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 100)
    }
  }, [isDropdownOpen])

  const filteredCountries = countries.filter(
    (c) =>
      c.name_ar.includes(searchQuery) ||
      c.name_en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.code.includes(searchQuery)
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const serviceMap: Record<string, { ar: string; en: string }> = {
      slides: { ar: 'عرض تقديمية', en: 'Presentation Slides' },
      dev: { ar: 'تطبيق ويب أو موبايل', en: 'Web & Mobile App' },
      docs: { ar: 'توثيق مشروع', en: 'Project Documentation' },
      full: { ar: 'باكيج كامل (برمجة + توثيق)', en: 'Full Package (Build + Docs)' },
    }

    const selectedServiceText =
      serviceMap[formData.service]?.[lang] || (lang === 'ar' ? 'لم يحدد' : 'Not specified')

    let msg = ''
    if (lang === 'ar') {
      msg = `مرحباً، أبي أطلب خدمة من يوني هيلب:\n\nالاسم: ${formData.name}\nرقمي: ${selectedCountry.code}${formData.phone}\nالخدمة: ${selectedServiceText}${formData.deadline ? '\nموعد التسليم: ' + formData.deadline : ''}\n\nالتفاصيل:\n${formData.details}`
    } else {
      msg = `Hi, I'd like to request a service from UniHelp:\n\nName: ${formData.name}\nMy number: ${selectedCountry.code}${formData.phone}\nService: ${selectedServiceText}${formData.deadline ? '\nDeadline: ' + formData.deadline : ''}\n\nDetails:\n${formData.details}`
    }

    const encoded = encodeURIComponent(msg)
    const waUrl = `https://wa.me/97477261379?text=${encoded}`

    onShowToast()
    onClose()
    setFormData({ name: '', phone: '', service: '', deadline: '', details: '' })

    setTimeout(() => {
      window.open(waUrl, '_blank')
    }, 600)
  }

  return (
    <div
      className={`modal-overlay fixed inset-0 z-[100] flex items-end lg:items-center justify-center ${
        isOpen ? 'active' : ''
      }`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="modal-content w-full max-w-lg bg-popover border border-border rounded-t-2xl lg:rounded-2xl p-6 lg:p-8 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium tracking-tight">
            {lang === 'ar' ? 'أرسل رسالة واتساب' : 'Send a WhatsApp message'}
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground mb-1.5 block">
              {lang === 'ar' ? 'اسمك' : 'YOUR NAME'}
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="form-input w-full px-4 py-3 rounded-lg text-sm"
              placeholder={lang === 'ar' ? 'مثال: أحمد' : 'e.g. Ahmed'}
            />
          </div>

          {/* Phone */}
          <div>
            <label className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground mb-1.5 block">
              {lang === 'ar' ? 'رقم الواتساب' : 'WHATSAPP NUMBER'}
            </label>
            <div className="flex gap-2">
              {/* Country Selector */}
              <div className="relative flex-shrink-0" style={{ width: 130 }} ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => {
                    setIsDropdownOpen(!isDropdownOpen)
                    setSearchQuery('')
                  }}
                  className="form-input w-full h-full flex items-center gap-2 px-3 py-3 rounded-lg text-sm"
                >
                  <span className="text-base leading-none">{selectedCountry.flag}</span>
                  <span className="text-muted-foreground text-xs">{selectedCountry.code}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-muted-foreground ms-auto flex-shrink-0" />
                </button>
                <div
                  className={`country-dropdown absolute top-full mt-1 start-0 end-0 bg-popover border border-border rounded-lg z-10 shadow-2xl ${
                    isDropdownOpen ? 'open' : ''
                  }`}
                >
                  <div className="p-2 border-b border-border">
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="form-input w-full px-3 py-2 rounded-md text-xs"
                      placeholder={lang === 'ar' ? 'ابحث عن دولة...' : 'Search country...'}
                    />
                  </div>
                  <div className="py-1">
                    {filteredCountries.map((country) => (
                      <button
                        key={`${country.code}-${country.name_en}`}
                        type="button"
                        onClick={() => {
                          setSelectedCountry(country)
                          setIsDropdownOpen(false)
                        }}
                        className={`country-item w-full flex items-center gap-3 px-3 py-2.5 text-sm text-foreground/80 hover:text-foreground transition-colors ${
                          country.code === selectedCountry.code ? 'selected' : ''
                        }`}
                      >
                        <span className="text-base leading-none">{country.flag}</span>
                        <span className="flex-1 text-start">
                          {lang === 'ar' ? country.name_ar : country.name_en}
                        </span>
                        <span className="text-xs text-muted-foreground font-mono">{country.code}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="form-input flex-1 min-w-0 px-4 py-3 rounded-lg text-sm"
                placeholder="7700 0000"
              />
            </div>
          </div>

          {/* Service */}
          <div>
            <label className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground mb-1.5 block">
              {lang === 'ar' ? 'الخدمة المطلوبة' : 'SERVICE'}
            </label>
            <select
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              className="form-input w-full px-4 py-3 rounded-lg text-sm appearance-none"
            >
              {serviceOptions.map((option) => (
                <option key={option.value} value={option.value} className="bg-popover">
                  {option.label[lang]}
                </option>
              ))}
            </select>
          </div>

          {/* Deadline */}
          <div>
            <label className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground mb-1.5 block">
              {lang === 'ar' ? 'موعد التسليم' : 'DEADLINE'}
            </label>
            <input
              type="date"
              value={formData.deadline}
              onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
              className="form-input w-full px-4 py-3 rounded-lg text-sm"
            />
          </div>

          {/* Details */}
          <div>
            <label className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground mb-1.5 block">
              {lang === 'ar' ? 'تفاصيل المشروع' : 'PROJECT DETAILS'}
            </label>
            <textarea
              required
              rows={4}
              value={formData.details}
              onChange={(e) => setFormData({ ...formData, details: e.target.value })}
              className="form-input w-full px-4 py-3 rounded-lg text-sm resize-none"
              placeholder={
                lang === 'ar'
                  ? 'اكتب باختصار إيش تبي — الموضوع، عدد الشرائح، التقنية المطلوبة، إلخ.'
                  : 'Briefly describe what you need — topic, number of slides, tech stack, etc.'
              }
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="cta-btn w-full flex items-center justify-center gap-2 text-sm font-medium px-6 py-3.5 rounded-lg mt-2"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            <span>{lang === 'ar' ? 'افتح واتساب' : 'Open WhatsApp'}</span>
          </button>
        </form>
      </div>
    </div>
  )
}
