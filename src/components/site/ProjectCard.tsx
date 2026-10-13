import SpotlightCard from '@/components/SpotlightCard'
import { Badge } from '@/components/ui/badge'
import type { Project } from '@/data'
import { useLang } from '@/i18n'
import { categoryLabel } from '@/lib/category'
import { placeholderImage } from '@/lib/placeholder'
import { colors } from '@/theme'

export function ProjectCard({ project }: { project: Project }) {
  const { t, l, n } = useLang()
  const title = l(project.title)
  const meta = [
    [t('deliverables'), l(project.deliverables)],
    [t('duration'), l(project.duration)],
    [t('role'), l(project.role)],
  ]

  return (
    <a
      href={`#/projects/${project.slug}`}
      className="group block h-full rounded-3xl outline-none focus-visible:ring-2 focus-visible:ring-brand"
    >
      <SpotlightCard
        theme="light"
        spotlightColor={colors.tertiary}
        intensity={0.45}
        borderGlow={1}
        spotlightSize={340}
        className="h-full p-4! transition-transform duration-500 ease-out group-hover:-translate-y-1"
      >
        <div className="relative overflow-hidden rounded-2xl">
          <img
            src={placeholderImage(`${title} ${t('cover')}`)}
            alt={`${title} ${t('cover')}`}
            className="aspect-[620/380] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
          <Badge className="absolute start-3 top-3 h-7 px-3 text-[13px]">{t(categoryLabel[project.category])}</Badge>
        </div>
        <div className="px-2 pt-5 pb-2">
          <p className="font-mono text-[11px] tracking-[0.06em] text-brand-soft uppercase">
            {n(project.year)} — {l(project.place)}
          </p>
          <h3 className="mt-2 text-[28px] leading-[34px] font-semibold tracking-tight transition-colors group-hover:text-brand">
            {title}
          </h3>
          <p className="mt-2 text-[15px] leading-6 text-muted-foreground">{l(project.description)}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map(tag => (
              <Badge key={tag.en} variant="secondary" className="h-6 px-2.5">
                {l(tag)}
              </Badge>
            ))}
          </div>
          <dl className="mt-5 flex flex-wrap gap-x-10 gap-y-3 border-t pt-4">
            {meta.map(([label, value]) => (
              <div key={label}>
                <dt className="font-mono text-[11px] tracking-[0.06em] text-muted-foreground uppercase">{label}</dt>
                <dd className="mt-1 text-[13px] font-medium">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </SpotlightCard>
    </a>
  )
}
