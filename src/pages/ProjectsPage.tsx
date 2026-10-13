import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ProjectCard } from '@/components/site/ProjectCard'
import { SectionHeading, Shell } from '@/components/site/Shell'
import { categories, projects, type Category } from '@/data'
import { useLang } from '@/i18n'
import { categoryLabel } from '@/lib/category'

/** Reads `?category=` from the hash query; anything unknown means "All". */
export function parseCategory(query: string): Category | null {
  const value = new URLSearchParams(query).get('category')
  return categories.find(c => c === value) ?? null
}

export function ProjectsPage({ category }: { category: Category | null }) {
  const { t, n } = useLang()
  const reduce = useReducedMotion()
  const visible = category ? projects.filter(p => p.category === category) : projects
  const tabs: (Category | null)[] = [null, ...categories]
  const count = (c: Category | null) => (c ? projects.filter(p => p.category === c).length : projects.length)
  const select = (c: Category | null) => {
    window.location.hash = c ? `#/projects?category=${c}` : '#/projects'
  }

  return (
    <Shell active="projects">
      <section className="mt-14">
        <SectionHeading label={t('caseStudies')} title={t('projects')} />

        <div
          role="group"
          aria-label={t('filterProjects')}
          className="mt-8 inline-flex flex-wrap gap-1 rounded-full border bg-background/80 p-1 backdrop-blur"
        >
          {tabs.map(c => {
            const active = c === category
            return (
              <button
                key={c ?? 'all'}
                type="button"
                aria-pressed={active}
                onClick={() => select(c)}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  active ? 'text-primary-foreground' : 'text-muted-foreground hover:text-brand'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="category-pill"
                    className="absolute inset-0 rounded-full bg-primary"
                    transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 34 }}
                  />
                )}
                <span className="relative z-10">
                  {c ? t(categoryLabel[c]) : t('all')}
                  <span className="ms-1.5 text-xs opacity-60">{n(count(c))}</span>
                </span>
              </button>
            )
          })}
        </div>

        <motion.div layout={!reduce} className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map(project => (
              <motion.div
                key={project.slug}
                layout={!reduce}
                initial={reduce ? false : { opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>
    </Shell>
  )
}
