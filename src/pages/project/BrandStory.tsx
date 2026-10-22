import type { Project } from '@/data'
import { useLang } from '@/i18n'
import { placeholderImage } from '@/lib/placeholder'
import { useThemeMode } from '@/theme-mode'
import { Reveal } from '@/components/site/Reveal'
import { GalleryGrid, GroupLabel, NumberedSection, StoryText, galleries, mixed11, mono } from '@/pages/project/shared'

/** Gray tiles standing in for artwork until real images are added. */
function Tiles({
  count,
  label,
  w,
  h,
  className,
}: {
  count: number
  label: string
  w: number
  h: number
  className: string
}) {
  const { isDark } = useThemeMode()
  const { n } = useLang()
  return (
    <div className={className}>
      {Array.from({ length: count }, (_, i) => (
        <Reveal key={i}>
          <img
            src={placeholderImage(`${label} ${n(i + 1)}`, w, h, isDark)}
            alt={`${label} ${n(i + 1)}`}
            style={{ aspectRatio: `${w} / ${h}` }}
            className="w-full rounded-2xl object-cover"
          />
        </Reveal>
      ))}
    </div>
  )
}

function Palette({ project }: { project: Project }) {
  const { l } = useLang()
  const palette = project.identity?.palette
  if (!palette?.length) return null
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {palette.map(swatch => (
        <Reveal key={swatch.name.en}>
          {/* No hex yet: a neutral swatch with a dashed outline stands in for the color */}
          <div
            style={swatch.hex ? { backgroundColor: swatch.hex } : undefined}
            className={`h-28 rounded-2xl border sm:h-36 ${swatch.hex ? '' : 'border-dashed bg-muted'}`}
          />
          <p className="mt-3 text-sm font-medium">{l(swatch.name)}</p>
          <p className={`${mono} text-muted-foreground`}>{swatch.hex ?? '#——————'}</p>
        </Reveal>
      ))}
    </div>
  )
}

/** One font specimen card. */
function FontSpecimen() {
  const { t } = useLang()
  return (
    <Reveal>
      <div className="rounded-2xl border bg-card/80 p-6 backdrop-blur sm:p-10">
        <p className="text-7xl leading-none font-black tracking-tight sm:text-9xl" lang="en" dir="ltr">
          Aa
        </p>
        <p className="mt-6 text-lg font-semibold">{t('fontName')}</p>
        <p className={`${mono} mt-2 break-all text-muted-foreground`} lang="en" dir="ltr">
          ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789
        </p>
      </div>
    </Reveal>
  )
}

/** Palette, logos, fonts, illustrations and stickers. Logos and fonts are stacked vertically, one per row. */
function IdentityAssets({ project }: { project: Project }) {
  const { t } = useLang()
  const identity = project.identity
  if (!identity) return null
  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <GroupLabel>{t('colorPalette')}</GroupLabel>
        <Palette project={project} />
      </div>

      {!!identity.logos && (
        <div className="space-y-4">
          <GroupLabel>{t('logos')}</GroupLabel>
          <Tiles count={identity.logos} label={t('logo')} w={1264} h={420} className="grid grid-cols-1 gap-4" />
        </div>
      )}

      {!!identity.fonts && (
        <div className="space-y-4">
          <GroupLabel>{t('fonts')}</GroupLabel>
          <div className="grid grid-cols-1 gap-4">
            {Array.from({ length: identity.fonts }, (_, i) => (
              <FontSpecimen key={i} />
            ))}
          </div>
        </div>
      )}

      {!!identity.illustrations && (
        <div className="space-y-4">
          <GroupLabel>{t('illustrations')}</GroupLabel>
          <Tiles
            count={identity.illustrations}
            label={t('illustration')}
            w={620}
            h={620}
            className="grid grid-cols-2 gap-4 md:grid-cols-4"
          />
        </div>
      )}

      {!!identity.stickers && (
        <div className="space-y-4">
          <GroupLabel>{t('stickers')}</GroupLabel>
          <Tiles
            count={identity.stickers}
            label={t('sticker')}
            w={400}
            h={400}
            className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6"
          />
        </div>
      )}
    </div>
  )
}

/** Brand case study: Brief, Approach, Positioning, Visual identity, Result (with the final designs). */
export function BrandStory({ project }: { project: Project }) {
  const { t } = useLang()
  const shots = project.galleryLayout === 'mixed11' ? mixed11 : galleries.brand
  return (
    <section className="mt-16 space-y-12 sm:mt-24 sm:space-y-16">
      <NumberedSection index={1} title={t('brief')}>
        <StoryText>{t('briefCopy')}</StoryText>
      </NumberedSection>
      <NumberedSection index={2} title={t('approach')}>
        <StoryText>{t('approachCopy')}</StoryText>
      </NumberedSection>
      <NumberedSection index={3} title={t('positioning')}>
        <StoryText>{t('positioningCopy')}</StoryText>
      </NumberedSection>
      <NumberedSection index={4} title={t('visualIdentity')} wide>
        <IdentityAssets project={project} />
      </NumberedSection>
      <NumberedSection index={5} title={t('result')} wide>
        <StoryText>{t('resultCopy')}</StoryText>
        <div className="mt-8">
          <GalleryGrid project={project} shots={shots} />
        </div>
      </NumberedSection>
    </section>
  )
}
