import { ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { CategoryFilter, ProjectGrid, filterProjects } from '@/components/site/ProjectFilter'
import { ScrollSignature } from '@/components/site/ScrollSignature'
import { SectionHeading, Shell } from '@/components/site/Shell'
import { WebsiteTile } from '@/components/site/WebsiteTile'
import { websites, type Category } from '@/data'
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
    <section className="mt-28">
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

export function HomePage() {
  const { t } = useLang()
  return (
    <Shell active="home">
      <section className="mt-14 flex flex-col items-center text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-brand-soft/30 bg-secondary px-3.5 py-1.5 text-[13px] font-medium text-secondary-foreground">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand opacity-60 motion-reduce:hidden" />
            <span className="relative inline-flex size-2 rounded-full bg-brand" />
          </span>
          {t('available')}
        </span>
        <h1 className="mt-6 max-w-[1100px] text-5xl leading-[1.05] font-bold tracking-[-0.03em] sm:text-7xl rtl:leading-[1.25]">
          {t('heroLead')}
          <span className="text-brand">{t('heroHighlight')}</span>
        </h1>
        <p className="mt-5 text-lg text-muted-foreground">{t('heroSub')}</p>
        <ScrollSignature />
      </section>

      <section className="mt-20">
        <SectionHeading label={t('realWebsites')} title={t('uiux')} />
        <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {websites.map(site => (
            <WebsiteTile key={site.id} site={site} />
          ))}
        </div>
      </section>

      <ProjectsSection />
    </Shell>
  )
}
