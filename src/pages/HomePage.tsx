import { ArrowRight } from 'lucide-react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import { useRef, useState } from 'react'
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
    <section className="mt-14 sm:mt-20">
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

/** Hero that scrubs away as you scroll: it drifts up, shrinks a little, and fades. */
function HeroSection() {
  const { t } = useLang()
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const progress = useSpring(scrollYProgress, { stiffness: 220, damping: 40, mass: 0.4 })
  const opacity = useTransform(progress, [0, 1], [1, 0.1])
  const y = useTransform(progress, [0, 1], [0, -80])
  const scale = useTransform(progress, [0, 1], [1, 0.92])

  return (
    <section ref={ref} className="mt-14">
      <motion.div style={reduce ? undefined : { opacity, y, scale }} className="flex flex-col items-center text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-brand-soft/30 bg-secondary px-3.5 py-1.5 text-[13px] font-medium text-secondary-foreground">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand opacity-60 motion-reduce:hidden" />
            <span className="relative inline-flex size-2 rounded-full bg-brand" />
          </span>
          {t('available')}
        </span>
        <h1 className="mt-6 max-w-[1100px] text-[2.6rem] leading-[1.08] font-bold tracking-[-0.03em] sm:text-7xl sm:leading-[1.05] rtl:leading-[1.3]">
          {t('heroLead')}
          <span className="text-brand">{t('heroHighlight')}</span>
        </h1>
        <p className="mt-5 text-base text-muted-foreground sm:text-lg">{t('heroSub')}</p>
      </motion.div>
    </section>
  )
}

export function HomePage() {
  return (
    <Shell>
      <HeroSection />
      <ProjectsSection />
    </Shell>
  )
}
