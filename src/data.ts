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
export const categories: Category[] = ['brand', 'social', 'uiux']

export type Result = {
  value: number
  suffix: Localized
  label: Localized
}

export type Project = {
  slug: string
  category: Category
  title: Localized
  client: Localized
  year: number
  place: Localized
  description: Localized
  tags: Localized[]
  deliverables: Localized
  duration: Localized
  role: Localized
  results: Result[]
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
}

const plain = (s: string): Localized => ({ en: s, fa: s })
const percent: Localized = { en: '%', fa: '٪' }
const times: Localized = { en: 'x', fa: 'x' }
const plus = plain('+')
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

export const projects: Project[] = [
  {
    slug: 'learning-platform',
    category: 'uiux',
    title: { en: 'Learning platform redesign', fa: 'بازطراحی پلتفرم آموزشی' },
    client: { en: 'Rota Learning', fa: 'آموزش روتا' },
    year: 2026,
    place: { en: 'Tehran', fa: 'تهران' },
    description: {
      en: 'A full redesign of a course platform: research, flows, and a design system for 200+ screens.',
      fa: 'بازطراحی کامل یک پلتفرم آموزش آنلاین: پژوهش، جریان‌های کاربری و دیزاین سیستمی برای بیش از ۲۰۰ صفحه.',
    },
    tags: [tag.dashboard, tag.responsive],
    deliverables: { en: '200+ screens', fa: '+۲۰۰ صفحه' },
    duration: { en: '2 months', fa: '۲ ماه' },
    role: { en: 'Product designer', fa: 'طراح محصول' },
    results: [
      { value: 38, suffix: percent, label: { en: 'faster course setup', fa: 'سرعت بیشتر در ساخت دوره' } },
      { value: 200, suffix: plus, label: { en: 'screens designed', fa: 'صفحه‌ی طراحی‌شده' } },
      { value: 4.8, suffix: { en: '/5', fa: '/۵' }, label: { en: 'teacher satisfaction', fa: 'رضایت مدرسان' } },
    ],
  },
  {
    slug: 'saffron-house',
    category: 'brand',
    title: { en: 'Saffron House identity', fa: 'هویت بصری خانه‌ی زعفران' },
    client: { en: 'Saffron House', fa: 'خانه‌ی زعفران' },
    year: 2025,
    place: { en: 'Tehran', fa: 'تهران' },
    description: {
      en: 'Logo, color, type, and packaging for a saffron tea brand moving from local shops to supermarkets.',
      fa: 'لوگو، رنگ، تایپوگرافی و بسته‌بندی برای یک برند چای زعفرانی که از مغازه‌های محلی به فروشگاه‌های زنجیره‌ای می‌رود.',
    },
    tags: [tag.logo, tag.packaging],
    deliverables: { en: '24 brand assets', fa: '۲۴ خروجی برند' },
    duration: { en: '6 weeks', fa: '۶ هفته' },
    role: { en: 'Brand designer', fa: 'طراح برند' },
    results: [
      { value: 3, suffix: times, label: { en: 'more shelf visibility', fa: 'دیده‌شدن بیشتر در قفسه' } },
      { value: 24, suffix: none, label: { en: 'assets delivered', fa: 'خروجی تحویل‌شده' } },
      { value: 12, suffix: none, label: { en: 'packaging designs', fa: 'طرح بسته‌بندی' } },
    ],
  },
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
    slug: 'car-marketplace',
    category: 'uiux',
    title: { en: 'Car marketplace app', fa: 'اپلیکیشن بازار خودرو' },
    client: { en: 'Al Aweer Auto', fa: 'العویر اتو' },
    year: 2025,
    place: { en: 'Dubai', fa: 'دبی' },
    description: {
      en: 'Search, compare, and buy flows for a large used-car market, on web and mobile.',
      fa: 'جریان‌های جست‌وجو، مقایسه و خرید برای یک بازار بزرگ خودروی کارکرده، در وب و موبایل.',
    },
    tags: [tag.mobile, tag.ecommerce],
    deliverables: { en: '300+ screens', fa: '+۳۰۰ صفحه' },
    duration: { en: '4 months', fa: '۴ ماه' },
    role: { en: 'Lead designer', fa: 'طراح ارشد' },
    results: [
      { value: 27, suffix: percent, label: { en: 'more completed searches', fa: 'جست‌وجوی کامل‌شده‌ی بیشتر' } },
      { value: 300, suffix: plus, label: { en: 'screens designed', fa: 'صفحه‌ی طراحی‌شده' } },
      { value: 2, suffix: times, label: { en: 'faster listing', fa: 'ثبت آگهی سریع‌تر' } },
    ],
  },
  {
    slug: 'nava-studio',
    category: 'brand',
    title: { en: 'Nava Studio rebrand', fa: 'بازطراحی برند استودیو نوا' },
    client: { en: 'Nava Studio', fa: 'استودیو نوا' },
    year: 2024,
    place: { en: 'Isfahan', fa: 'اصفهان' },
    description: {
      en: 'A new identity system for a recording studio: logo, motion marks, and signage.',
      fa: 'سیستم هویت جدید برای یک استودیوی ضبط: لوگو، نشانه‌های متحرک و تابلوها.',
    },
    tags: [tag.identity, tag.motion],
    deliverables: { en: 'Logo, motion & signage', fa: 'لوگو، موشن و تابلو' },
    duration: { en: '2 months', fa: '۲ ماه' },
    role: { en: 'Brand designer', fa: 'طراح برند' },
    results: [
      { value: 18, suffix: none, label: { en: 'logo concepts explored', fa: 'ایده‌ی لوگوی بررسی‌شده' } },
      { value: 6, suffix: none, label: { en: 'motion marks', fa: 'نشانه‌ی متحرک' } },
      { value: 40, suffix: plus, label: { en: 'brand applications', fa: 'کاربرد برند' } },
    ],
  },
  {
    slug: 'logistics-dashboard',
    category: 'uiux',
    title: { en: 'Logistics dashboard', fa: 'داشبورد لجستیک' },
    client: { en: 'Fahris Logistics', fa: 'لجستیک فهریس' },
    year: 2025,
    place: { en: 'Berlin', fa: 'برلین' },
    description: {
      en: 'Shipment tracking and fleet planning turned into one clear operations view.',
      fa: 'ردیابی محموله و برنامه‌ریزی ناوگان در یک نمای عملیاتی شفاف.',
    },
    tags: [tag.dashboard, tag.data],
    deliverables: { en: '500+ screens', fa: '+۵۰۰ صفحه' },
    duration: { en: '6 months', fa: '۶ ماه' },
    role: { en: 'Product designer', fa: 'طراح محصول' },
    results: [
      { value: 45, suffix: percent, label: { en: 'less time per shipment check', fa: 'زمان کمتر برای بررسی هر محموله' } },
      { value: 500, suffix: plus, label: { en: 'screens designed', fa: 'صفحه‌ی طراحی‌شده' } },
      { value: 3, suffix: none, label: { en: 'platforms', fa: 'پلتفرم' } },
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
  {
    slug: 'telehealth-portal',
    category: 'uiux',
    title: { en: 'Telehealth patient portal', fa: 'پورتال بیماران پزشکی از راه دور' },
    client: { en: 'Aria Care', fa: 'آریا کر' },
    year: 2024,
    place: { en: 'Remote', fa: 'دورکاری' },
    description: {
      en: 'Booking, video visits, and records for patients, with a matching doctor dashboard.',
      fa: 'رزرو نوبت، ویزیت ویدیویی و پرونده‌ی پزشکی برای بیماران، همراه با داشبورد پزشک.',
    },
    tags: [tag.health, tag.dashboard],
    deliverables: { en: '30+ screens', fa: '+۳۰ صفحه' },
    duration: { en: '2 weeks', fa: '۲ هفته' },
    role: { en: 'UI/UX designer', fa: 'طراح UI/UX' },
    results: [
      { value: 60, suffix: percent, label: { en: 'fewer missed visits', fa: 'ویزیت از دست‌رفته‌ی کمتر' } },
      { value: 30, suffix: plus, label: { en: 'screens designed', fa: 'صفحه‌ی طراحی‌شده' } },
      { value: 2, suffix: none, label: { en: 'dashboards', fa: 'داشبورد' } },
    ],
  },
]
