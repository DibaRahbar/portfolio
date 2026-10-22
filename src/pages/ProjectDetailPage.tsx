import { ArrowLeft, ArrowRight } from 'lucide-react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import CountUp from '@/components/CountUp'
import SpotlightCard from '@/components/SpotlightCard'
import { Reveal } from '@/components/site/Reveal'
import { Shell } from '@/components/site/Shell'
import { Badge } from '@/components/ui/badge'
import { projects, type Project } from '@/data'
import { useLang, type MessageKey } from '@/i18n'
import { categoryLabel } from '@/lib/category'
import { placeholderImage } from '@/lib/placeholder'
import { BrandStory } from '@/pages/project/BrandStory'
import { GalleryGrid, NumberedSection, StoryText, galleries, mono } from '@/pages/project/shared'
import { VideoSection, WebsiteLink } from '@/pages/project/UiuxExtras'
import { colors, darkColors } from '@/theme'
import { useThemeMode } from '@/theme-mode'
import { ProjectsPage } from '@/pages/ProjectsPage'

/** Hero image that settles from a slight zoom as it scrolls through the viewport. */
function HeroImage({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 1], [1.12, 1])
  return (
    <div ref={ref} className="mt-12 overflow-hidden rounded-3xl">
      <motion.img src={src} alt={alt} style={reduce ? undefined : { scale }} className="aspect-[1264/600] w-full object-cover" />
    </div>
  )
}

function MetaCard({ project }: { project: Project }) {
  const { t, l, n } = useLang()
  const rows = [
    project.client && [t('client'), l(project.client)],
    project.year !== undefined && [t('year'), n(project.year)],
    [t('role'), l(project.role)],
    project.duration && [t('duration'), l(project.duration)],
    project.deliverables && [t('deliverables'), l(project.deliverables)],
  ].filter((row): row is string[] => Boolean(row))
  return (
    <dl className="h-fit rounded-3xl border bg-background/80 p-6 backdrop-blur">
      {rows.map(([label, value], i) => (
        <div key={label} className={`flex items-baseline justify-between gap-6 py-3 ${i ? 'border-t' : 'pt-0'}`}>
          <dt className={`${mono} text-muted-foreground`}>{label}</dt>
          <dd className="text-end text-sm font-medium">{value}</dd>
        </div>
      ))}
    </dl>
  )
}

function Results({ project }: { project: Project }) {
  const { t, l, lang, locale } = useLang()
  if (!project.results?.length) return null
  return (
    <section className="mt-16">
      <h2 className={`${mono} text-brand-soft`}>{t('results')}</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        {project.results.map(result => (
          <Reveal key={result.label.en} className="rounded-3xl border border-brand-soft/20 bg-secondary p-6 sm:p-8">
            <p className="text-5xl font-bold tracking-tight text-brand sm:text-6xl">
              {/* Keyed by language so the count replays with the right digits after switching */}
              <CountUp key={lang} to={result.value} duration={1.6} locale={locale} />
              {l(result.suffix)}
            </p>
            <p className="mt-3 text-sm font-medium text-secondary-foreground/80">{l(result.label)}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Story({ project }: { project: Project }) {
  const { t, l } = useLang()
  const sections: { key: MessageKey; body: string }[] = [
    { key: 'overview', body: `${l(project.description)} ${t('caseStudyCopy')}` },
    { key: 'challenge', body: t('challengeCopy') },
    { key: 'process', body: t('processCopy') },
    { key: 'solution', body: t('solutionCopy') },
  ]
  return (
    <section className="mt-16 space-y-12 sm:mt-24 sm:space-y-16">
      {sections.map((section, i) => (
        <NumberedSection key={section.key} index={i + 1} title={t(section.key)}>
          <StoryText>{section.body}</StoryText>
        </NumberedSection>
      ))}
    </section>
  )
}

function Gallery({ project }: { project: Project }) {
  const { t } = useLang()
  return (
    <section className="mt-16 sm:mt-24">
      <h2 className={`${mono} text-brand-soft`}>{t('gallery')}</h2>
      <div className="mt-4">
        <GalleryGrid project={project} shots={galleries[project.category]} />
      </div>
    </section>
  )
}

function NextProject({ project }: { project: Project }) {
  const { t, l } = useLang()
  const { isDark } = useThemeMode()
  const next = projects[(projects.indexOf(project) + 1) % projects.length]
  return (
    <Reveal className="mt-20 sm:mt-28">
      <a href={`#/projects/${next.slug}`} className="group block rounded-3xl outline-none focus-visible:ring-2 focus-visible:ring-brand">
        <SpotlightCard
          theme={isDark ? 'dark' : 'light'}
          spotlightColor={isDark ? darkColors.spotlight : colors.tertiary}
          intensity={0.45}
          borderGlow={1}
          spotlightSize={420}
          className="p-6! sm:p-12!"
        >
          <div className="flex items-center justify-between gap-4 sm:gap-8">
            <div>
              <p className={`${mono} text-brand-soft`}>
                {t('nextProject')} · {t(categoryLabel[next.category])}
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight transition-colors group-hover:text-brand sm:text-6xl">
                {l(next.title)}
              </h2>
            </div>
            <span className="grid size-12 shrink-0 place-items-center rounded-full sm:size-16 bg-primary text-primary-foreground transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
              <ArrowRight className="size-6 rtl:-scale-x-100" />
            </span>
          </div>
        </SpotlightCard>
      </a>
    </Reveal>
  )
}

export function ProjectDetailPage({ slug }: { slug: string }) {
  const { t, l, n } = useLang()
  const { isDark } = useThemeMode()
  const project = projects.find(p => p.slug === slug)
  if (!project) return <ProjectsPage category={null} />
  const title = l(project.title)

  return (
    <Shell>
      <a
        href="#/projects"
        className="mt-10 inline-flex items-center gap-2 rounded-full border bg-background px-5 py-2.5 text-[13px] font-medium transition-colors hover:border-brand hover:text-brand"
      >
        <ArrowLeft className="size-4 rtl:-scale-x-100" /> {t('backToProjects')}
      </a>

      <Reveal className="mt-8 grid gap-8 sm:mt-10 sm:gap-10 lg:grid-cols-[1fr_360px] lg:items-end">
        <div>
          <p className={`${mono} text-brand-soft`}>
            {[
              t(categoryLabel[project.category]),
              [project.year !== undefined && n(project.year), project.place && l(project.place)].filter(Boolean).join(' — '),
            ]
              .filter(Boolean)
              .join(' · ')}
          </p>
          <h1 className="mt-4 text-4xl leading-[1.08] font-bold tracking-[-0.03em] sm:text-7xl sm:leading-[1.05] rtl:leading-[1.3]">{title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">{l(project.description)}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map(tag => (
              <Badge key={tag.en} variant="secondary" className="h-7 px-3 text-[13px]">
                {l(tag)}
              </Badge>
            ))}
          </div>
          {project.category === 'uiux' && <WebsiteLink project={project} />}
        </div>
        <MetaCard project={project} />
      </Reveal>

      <HeroImage src={placeholderImage(`${title} ${t('hero')}`, 1264, 600, isDark)} alt={`${title} ${t('hero')}`} />
      <Results project={project} />
      {project.category === 'brand' ? (
        <BrandStory project={project} />
      ) : (
        <>
          {project.category === 'uiux' && <VideoSection project={project} />}
          <Story project={project} />
          <Gallery project={project} />
        </>
      )}
      <NextProject project={project} />
    </Shell>
  )
}
