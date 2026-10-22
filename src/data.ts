// Placeholder content in English and Persian. Replace names, years, links, and copy with real work.
import type { Localized } from '@/i18n'

export type Website = {
  id: string
  name: Localized
  kind: Localized
  year: number
  tags: Localized[]
  url: string // '#' means no live link yet
}

export type Category = 'brand' | 'social' | 'uiux'
/** Display order: filter buttons and the "All" list. */
export const categories: Category[] = ['uiux', 'brand', 'social']

export type Result = {
  value: number
  suffix: Localized
  label: Localized
}

/** One color in a brand palette. Leave `hex` out until the real color is known. */
export type Swatch = { name: Localized; hex?: string }

/** Brand assets shown in the Visual identity section. Counts are placeholder slots until images are added. */
export type BrandIdentity = {
  palette: Swatch[]
  logos?: number
  fonts?: number
  illustrations?: number
  stickers?: number
}

// Fields marked optional are simply not shown when missing, so a real project never needs made-up details.
export type Project = {
  slug: string
  category: Category
  title: Localized
  client?: Localized
  year?: number
  place?: Localized
  description: Localized
  tags: Localized[]
  deliverables?: Localized
  duration?: Localized
  role: Localized
  results?: Result[]
  /** Brand projects: palette, logos, fonts, illustrations, stickers. */
  identity?: BrandIdentity
  /**
   * Result gallery layout. 'mixed11': 3 wide + 8 regular. 'v5h4': 5 vertical + 4 horizontal.
   * 'horizontal11': 11 horizontal. Brand projects without one use a default mix.
   */
  galleryLayout?: 'mixed11' | 'v5h4' | 'horizontal11'
  /** UI/UX projects: live website. Leave out until known; the page shows "coming soon". */
  url?: string
  /** UI/UX projects: showcase video file in public/videos (e.g. 'videos/academic-hu.mp4') or a full https URL to a video file. */
  video?: string
}

const tag = {
  responsive: { en: 'Responsive', fa: 'واکنش‌گرا' },
  live: { en: 'Live site', fa: 'سایت فعال' },
  ecommerce: { en: 'E-commerce', fa: 'تجارت الکترونیک' },
  landing: { en: 'Landing page', fa: 'لندینگ پیج' },
  dashboard: { en: 'Dashboard', fa: 'داشبورد' },
  mobile: { en: 'Mobile', fa: 'موبایل' },
  data: { en: 'Data-heavy', fa: 'داده‌محور' },
  health: { en: 'Healthcare', fa: 'سلامت' },
  logo: { en: 'Logo', fa: 'لوگو' },
  packaging: { en: 'Packaging', fa: 'بسته‌بندی' },
  identity: { en: 'Identity', fa: 'هویت بصری' },
  motion: { en: 'Motion', fa: 'موشن' },
  instagram: { en: 'Instagram', fa: 'اینستاگرام' },
  campaign: { en: 'Campaign', fa: 'کمپین' },
  reels: { en: 'Reels', fa: 'ریلز' },
  ads: { en: 'Ads', fa: 'تبلیغات' },
  website: { en: 'Website', fa: 'وب‌سایت' },
  app: { en: 'App', fa: 'اپلیکیشن' },
}

const plain = (s: string): Localized => ({ en: s, fa: s })
const persianDigit = (n: number) => String(n).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[Number(d)])
/** Empty palette slots (no hex yet), shown as gray swatches until the real colors are added. */
const swatches = (count: number): Swatch[] =>
  Array.from({ length: count }, (_, i) => ({ name: { en: `Color ${i + 1}`, fa: `رنگ ${persianDigit(i + 1)}` } }))
const percent: Localized = { en: '%', fa: '٪' }
const times: Localized = { en: 'x', fa: 'x' }
const none = plain('')

export const websites: Website[] = [
  {
    id: 'northwind',
    name: { en: 'Northwind Studio', fa: 'استودیو نورث‌ویند' },
    kind: { en: 'Marketing website', fa: 'وب‌سایت معرفی' },
    year: 2026,
    tags: [tag.responsive, tag.live],
    url: '#',
  },
  {
    id: 'harbor',
    name: { en: 'Harbor Bank', fa: 'بانک هاربر' },
    kind: { en: 'Banking website', fa: 'وب‌سایت بانکی' },
    year: 2026,
    tags: [tag.responsive, tag.live],
    url: '#',
  },
  {
    id: 'lumen',
    name: { en: 'Lumen Health', fa: 'لومن هلث' },
    kind: { en: 'Clinic website', fa: 'وب‌سایت کلینیک' },
    year: 2025,
    tags: [tag.responsive, tag.live],
    url: '#',
  },
  {
    id: 'atlas',
    name: { en: 'Atlas Travel', fa: 'اطلس سفر' },
    kind: { en: 'Booking website', fa: 'وب‌سایت رزرو' },
    year: 2025,
    tags: [tag.responsive, tag.live],
    url: '#',
  },
  {
    id: 'pine',
    name: { en: 'Pine & Co', fa: 'پاین و شرکا' },
    kind: { en: 'Online store', fa: 'فروشگاه آنلاین' },
    year: 2025,
    tags: [tag.ecommerce, tag.live],
    url: '#',
  },
  {
    id: 'orbit',
    name: { en: 'Orbit Analytics', fa: 'اوربیت آنالیتیکس' },
    kind: { en: 'SaaS website', fa: 'وب‌سایت SaaS' },
    year: 2024,
    tags: [tag.landing, tag.live],
    url: '#',
  },
]

const allProjects: Project[] = [
  // Real works (details beyond name, category and role are not filled in yet).
  {
    slug: 'kooki',
    category: 'brand',
    title: { en: 'KOOKI – Cookie Shop', fa: 'KOOKI – فروشگاه کوکی' },
    client: { en: 'KOOKI', fa: 'KOOKI' },
    description: {
      en: 'Brand identity for KOOKI, a cookie shop.',
      fa: 'هویت بصری برند KOOKI، یک فروشگاه کوکی.',
    },
    tags: [tag.identity],
    role: { en: 'Brand designer', fa: 'طراح برند' },
    identity: { palette: swatches(5), logos: 3, illustrations: 1 },
    galleryLayout: 'v5h4',
  },
  {
    slug: 'coralia',
    category: 'brand',
    title: { en: 'CORALIA – Beach Hotel', fa: 'CORALIA – هتل ساحلی' },
    client: { en: 'CORALIA', fa: 'CORALIA' },
    description: {
      en: 'Brand identity for CORALIA, a beach hotel.',
      fa: 'هویت بصری برند CORALIA، یک هتل ساحلی.',
    },
    tags: [tag.identity],
    role: { en: 'Brand designer', fa: 'طراح برند' },
    identity: { palette: swatches(5), logos: 4, fonts: 2, stickers: 1 },
    galleryLayout: 'mixed11',
  },
  {
    slug: 'mars',
    category: 'brand',
    title: { en: 'MARS – Agency', fa: 'MARS – آژانس' },
    client: { en: 'MARS', fa: 'MARS' },
    description: {
      en: 'Brand identity for MARS, an agency.',
      fa: 'هویت بصری برند MARS، یک آژانس.',
    },
    tags: [tag.identity],
    role: { en: 'Brand designer', fa: 'طراح برند' },
    identity: { palette: swatches(4), logos: 3 },
    galleryLayout: 'horizontal11',
  },
  {
    slug: 'academic-hu',
    category: 'uiux',
    title: { en: 'Academic Hu Portfolio – Website & App', fa: 'پورتفولیوی Academic Hu – وب‌سایت و اپلیکیشن' },
    client: { en: 'Academic Hu', fa: 'Academic Hu' },
    description: {
      en: 'Website and app design for the Academic Hu portfolio.',
      fa: 'طراحی وب‌سایت و اپلیکیشن پورتفولیوی Academic Hu.',
    },
    tags: [tag.website, tag.app],
    role: { en: 'UI/UX designer', fa: 'طراح UI/UX' },
  },
  {
    slug: 'photography-portfolio',
    category: 'uiux',
    title: { en: 'Photography Portfolio', fa: 'پورتفولیوی عکاسی' },
    description: {
      en: 'Website and app design for a photography portfolio.',
      fa: 'طراحی وب‌سایت و اپلیکیشن یک پورتفولیوی عکاسی.',
    },
    tags: [tag.website, tag.app],
    role: { en: 'UI/UX designer', fa: 'طراح UI/UX' },
  },

  // Placeholder works (invented details). Replace or remove before sharing the site.
  {
    slug: 'bloom-cafe',
    category: 'social',
    title: { en: 'Bloom Café on Instagram', fa: 'اینستاگرام کافه بلوم' },
    client: { en: 'Bloom Café', fa: 'کافه بلوم' },
    year: 2026,
    place: { en: 'Tehran', fa: 'تهران' },
    description: {
      en: 'A grid system, story templates, and a launch campaign for a specialty café.',
      fa: 'سیستم گرید، قالب‌های استوری و کمپین افتتاحیه برای یک کافه‌ی تخصصی.',
    },
    tags: [tag.instagram, tag.campaign],
    deliverables: { en: '60 posts & stories', fa: '۶۰ پست و استوری' },
    duration: { en: '3 months', fa: '۳ ماه' },
    role: { en: 'Social media designer', fa: 'طراح شبکه‌های اجتماعی' },
    results: [
      { value: 12, suffix: { en: 'k', fa: ' هزار' }, label: { en: 'new followers', fa: 'دنبال‌کننده‌ی جدید' } },
      { value: 4.2, suffix: percent, label: { en: 'engagement rate', fa: 'نرخ تعامل' } },
      { value: 60, suffix: none, label: { en: 'posts designed', fa: 'پست طراحی‌شده' } },
    ],
  },
  {
    slug: 'fitlab-campaign',
    category: 'social',
    title: { en: 'FitLab launch campaign', fa: 'کمپین معرفی فیت‌لب' },
    client: { en: 'FitLab', fa: 'فیت‌لب' },
    year: 2025,
    place: { en: 'Remote', fa: 'دورکاری' },
    description: {
      en: 'A six-week social campaign with reels covers, carousels, and ad creatives.',
      fa: 'کمپین شش‌هفته‌ای شبکه‌های اجتماعی با کاور ریلز، کاروسل و طرح‌های تبلیغاتی.',
    },
    tags: [tag.reels, tag.ads],
    deliverables: { en: 'Reels, carousels & ads', fa: 'ریلز، کاروسل و تبلیغات' },
    duration: { en: '6 weeks', fa: '۶ هفته' },
    role: { en: 'Social media designer', fa: 'طراح شبکه‌های اجتماعی' },
    results: [
      { value: 2.4, suffix: times, label: { en: 'higher ad click-through', fa: 'نرخ کلیک بالاتر تبلیغات' } },
      { value: 36, suffix: none, label: { en: 'creatives designed', fa: 'طرح تبلیغاتی' } },
      { value: 6, suffix: none, label: { en: 'campaign weeks', fa: 'هفته کمپین' } },
    ],
  },
]

/** Projects grouped in category order (UI/UX, Brand Identity, Social Media). */
export const projects: Project[] = [...allProjects].sort((a, b) => categories.indexOf(a.category) - categories.indexOf(b.category))
