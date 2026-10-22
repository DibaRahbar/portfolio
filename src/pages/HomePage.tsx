import { ArrowRight } from 'lucide-react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import { useRef, useState } from 'react'
import { ProfilePhoto } from '@/components/site/ProfilePhoto'
import { CategoryFilter, ProjectGrid, filterProjects } from '@/components/site/ProjectFilter'
import { SectionHeading, Shell } from '@/components/site/Shell'
import type { Category } from '@/data'
import { useLang } from '@/i18n'

// How many project cards the home page shows before "View all".
const HOME_PROJECT_LIMIT = 4

function ProjectsSection() {
  const { t } = useLang()
  // Kept in local state so filtering on Home does not change the URL or scroll.
  const [category, setCategory] = useState<Category | null>(null)
  const items = filterProjects(category).slice(0, HOME_PROJECT_LIMIT)
  const viewAllHref = category ? `#/projects?category=${category}` : '#/projects'

  return (
    <section id="projects" className="mt-14 scroll-mt-6 sm:mt-20">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading label={t('caseStudies')} title={t('projects')} />
        <CategoryFilter value={category} onChange={setCategory} />
      </div>
      <div className="mt-10">
        <ProjectGrid items={items} />
      </div>
      <div className="mt-10 flex justify-center">
        <a
          href={viewAllHref}
          className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-brand-soft"
        >
          {t('viewAllProjects')}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5" />
        </a>
      </div>
    </section>
  )
}

/**
 * Centered hero that fills the first screen on desktop (header + hero = 100vh) and sizes to its
 * content on mobile. It drifts up and fades as you scroll past.
 */
function HeroSection() {
  const { t } = useLang()
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const progress = useSpring(scrollYProgress, { stiffness: 220, damping: 40, mass: 0.4 })
  const opacity = useTransform(progress, [0, 1], [1, 0.1])
  const y = useTransform(progress, [0, 1], [0, -80])
  const scale = useTransform(progress, [0, 1], [1, 0.95])

  return (
    <section ref={ref} className="flex w-full items-center py-10 lg:min-h-[calc(100svh-5rem)] lg:py-0">
      <motion.div
        style={reduce ? undefined : { opacity, y, scale }}
        className="mx-auto flex w-full max-w-[1440px] flex-col items-center px-6 text-center lg:px-20"
      >
        <p className="text-lg font-normal sm:text-xl">{t('heroGreeting')}</p>

        <h1 className="mt-5 text-[2rem] leading-[1.15] font-black tracking-[-0.02em] uppercase sm:text-5xl lg:text-6xl rtl:leading-[1.45]">
          <span className="block">{t('heroRole1')}</span>
          <span className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-3 sm:gap-x-6 lg:mt-4">
            <ProfilePhoto className="size-[72px] sm:size-28 lg:size-[150px]" />
            <span>{t('heroRole2')}</span>
          </span>
        </h1>

        <p className="mt-6 flex items-baseline gap-2 sm:mt-8 sm:gap-3">
          <span className="text-lg italic sm:text-2xl rtl:not-italic">{t('heroBasedIn')}</span>
          <span className="text-3xl font-black tracking-tight text-brand sm:text-5xl">{t('heroCity')}</span>
        </p>

        <p className="mt-6 max-w-[800px] text-base leading-7 text-[#555] sm:mt-8 sm:text-lg sm:leading-8 dark:text-[#b9afc7]">
          {t('heroBody')}
        </p>
      </motion.div>
    </section>
  )
}

export function HomePage() {
  return (
    <Shell hero={<HeroSection />}>
      <ProjectsSection />
    </Shell>
  )
}
