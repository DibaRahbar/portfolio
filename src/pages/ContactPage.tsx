import { SectionHeading, Shell } from '@/components/site/Shell'
import { useLang } from '@/i18n'

export function ContactPage() {
  const { t } = useLang()
  return (
    <Shell>
      <section className="mt-14">
        <SectionHeading label={t('sayHello')} title={t('contact')} />
        <p className="mt-6 max-w-xl text-lg text-muted-foreground">{t('contactSoon')}</p>
      </section>
    </Shell>
  )
}
