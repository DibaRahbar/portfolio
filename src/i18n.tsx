import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

export type Lang = 'en' | 'fa'

/** A string in both languages. */
export type Localized = Record<Lang, string>

const en = {
  name: 'Diba Rahbar',
  available: 'Available for new projects',
  heroLead: 'Product designer crafting clear, ',
  heroHighlight: 'scalable interfaces.',
  heroSub: 'Real websites and full case studies from my work.',
  signatureLabel: 'Diba, handwritten',
  realWebsites: 'Real websites',
  uiux: 'UI/UX',
  caseStudies: 'Case studies',
  projects: 'Projects',
  home: 'Home',
  contact: 'Contact',
  sayHello: 'Say hello',
  contactSoon: 'Contact page comes in the next pass.',
  backToProjects: 'Back to projects',
  caseStudyCopy: 'Full case study copy goes here.',
  visitSite: 'Visit live site',
  linkSoon: 'Live link coming soon',
  deliverables: 'Deliverables',
  duration: 'Duration',
  role: 'Role',
  client: 'Client',
  year: 'Year',
  preview: 'preview',
  cover: 'cover',
  hero: 'hero image',
  image: 'image',
  language: 'Language',
  all: 'All',
  brand: 'Brand',
  social: 'Social media',
  uiuxCategory: 'UI/UX',
  filterProjects: 'Filter projects by category',
  results: 'Results',
  overview: 'Overview',
  challenge: 'Challenge',
  process: 'Process',
  solution: 'Solution',
  gallery: 'Gallery',
  nextProject: 'Next project',
  viewAllProjects: 'View all projects',
  challengeCopy:
    'Placeholder copy. What was broken or missing, who it hurt, and what constraints shaped the work: timeline, budget, tech, or brand rules.',
  processCopy:
    'Placeholder copy. Research, early sketches, the directions you explored, and why one won. Mention testing or feedback rounds.',
  solutionCopy:
    'Placeholder copy. The final design and the key decisions behind it. Point to the images below and what each one shows.',
}

export type MessageKey = keyof typeof en
type Key = MessageKey

const fa: Record<Key, string> = {
  name: 'دیبا رهبر',
  available: 'آماده‌ی همکاری در پروژه‌های جدید',
  heroLead: 'طراح محصول، سازنده‌ی ',
  heroHighlight: 'رابط‌های شفاف و مقیاس‌پذیر.',
  heroSub: 'وب‌سایت‌های واقعی و مطالعه‌های موردی کامل از کارهای من.',
  signatureLabel: 'دیبا، دست‌نویس',
  realWebsites: 'وب‌سایت‌های واقعی',
  uiux: 'UI/UX',
  caseStudies: 'مطالعه‌های موردی',
  projects: 'پروژه‌ها',
  home: 'خانه',
  contact: 'تماس',
  sayHello: 'سلام کنید',
  contactSoon: 'صفحه‌ی تماس در مرحله‌ی بعد اضافه می‌شود.',
  backToProjects: 'بازگشت به پروژه‌ها',
  caseStudyCopy: 'متن کامل مطالعه‌ی موردی اینجا قرار می‌گیرد.',
  visitSite: 'مشاهده‌ی سایت',
  linkSoon: 'لینک به‌زودی',
  deliverables: 'خروجی‌ها',
  duration: 'مدت',
  role: 'نقش',
  client: 'کارفرما',
  year: 'سال',
  preview: 'پیش‌نمایش',
  cover: 'کاور',
  hero: 'تصویر اصلی',
  image: 'تصویر',
  language: 'زبان',
  all: 'همه',
  brand: 'برند',
  social: 'شبکه‌های اجتماعی',
  uiuxCategory: 'UI/UX',
  filterProjects: 'فیلتر پروژه‌ها بر اساس دسته',
  results: 'نتایج',
  overview: 'معرفی',
  challenge: 'چالش',
  process: 'فرایند',
  solution: 'راه‌حل',
  gallery: 'گالری',
  nextProject: 'پروژه‌ی بعدی',
  viewAllProjects: 'مشاهده‌ی همه‌ی پروژه‌ها',
  challengeCopy:
    'متن نمونه. چه چیزی خراب بود یا کم بود، به چه کسی آسیب می‌زد و چه محدودیت‌هایی کار را شکل داد: زمان، بودجه، فناوری یا قواعد برند.',
  processCopy:
    'متن نمونه. پژوهش، طرح‌های اولیه، مسیرهایی که بررسی کردید و دلیل انتخاب یکی از آن‌ها. به دورهای آزمون یا بازخورد اشاره کنید.',
  solutionCopy:
    'متن نمونه. طرح نهایی و تصمیم‌های کلیدی پشت آن. به تصاویر پایین اشاره کنید و بگویید هر کدام چه چیزی را نشان می‌دهد.',
}

const dictionaries: Record<Lang, Record<Key, string>> = { en, fa }
const STORAGE_KEY = 'lang'

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'en' || saved === 'fa') return saved
  } catch {
    // Storage can be blocked; fall back to the browser language.
  }
  return navigator.language.toLowerCase().startsWith('fa') ? 'fa' : 'en'
}

type LangContextValue = {
  lang: Lang
  dir: 'ltr' | 'rtl'
  /** BCP 47 locale for Intl formatting, e.g. 'fa-IR'. */
  locale: string
  setLang: (lang: Lang) => void
  t: (key: Key) => string
  /** Pick the current language from a bilingual value. */
  l: (value: Localized) => string
  /** Format a number with the current language's digits, padded to `minDigits`. */
  n: (value: number, minDigits?: number) => string
}

const LangContext = createContext<LangContextValue | null>(null)

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang)
  const dir = lang === 'fa' ? 'rtl' : 'ltr'

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = dir
  }, [lang, dir])

  const setLang = useCallback((next: Lang) => {
    setLangState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Not persisted; the choice still applies for this visit.
    }
  }, [])

  const value = useMemo<LangContextValue>(() => {
    const locale = lang === 'fa' ? 'fa-IR' : 'en-US'
    return {
      lang,
      dir,
      locale,
      setLang,
      t: key => dictionaries[lang][key],
      l: v => v[lang],
      n: (v, minDigits = 1) => v.toLocaleString(locale, { useGrouping: false, minimumIntegerDigits: minDigits }),
    }
  }, [lang, dir, setLang])

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used inside LangProvider')
  return ctx
}
