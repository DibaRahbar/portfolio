import { ScrollSignature } from '@/components/site/ScrollSignature'
import { SectionHeading, Shell } from '@/components/site/Shell'
import { WebsiteTile } from '@/components/site/WebsiteTile'
import { websites } from '@/data'
import { useLang } from '@/i18n'

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
    </Shell>
  )
}
