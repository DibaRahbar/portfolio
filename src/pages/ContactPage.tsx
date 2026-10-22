import { ArrowUpRight } from 'lucide-react'
import { Reveal } from '@/components/site/Reveal'
import { SectionHeading, Shell } from '@/components/site/Shell'
import { useLang } from '@/i18n'
import { contactLinks, isExternal } from '@/lib/contact'

export function ContactPage() {
  const { t } = useLang()
  return (
    <Shell>
      <section className="mt-12 sm:mt-14">
        <SectionHeading label={t('sayHello')} title={t('contact')} />
        <p className="mt-6 max-w-xl text-lg text-muted-foreground">{t('contactIntro')}</p>

        <ul className="mt-10 max-w-3xl border-t">
          {contactLinks.map(link => (
            <li key={link.id}>
              <Reveal>
                <a
                  href={link.href}
                  {...(isExternal(link.href) ? { target: '_blank', rel: 'noreferrer' } : {})}
                  className="group flex items-center justify-between gap-6 border-b py-6 outline-none transition-colors hover:text-brand focus-visible:text-brand"
                >
                  <span className="min-w-0">
                    <span className="block font-mono text-[11px] tracking-[0.06em] text-brand-soft uppercase">
                      {link.id === 'email' ? t('email') : link.label}
                    </span>
                    {/* Addresses and handles are always left-to-right, even inside Persian pages */}
                    <span dir="ltr" className="mt-1 block truncate text-xl font-semibold tracking-tight sm:text-3xl rtl:text-end">
                      {link.value}
                    </span>
                  </span>
                  <ArrowUpRight className="size-6 shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1" />
                </a>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>
    </Shell>
  )
}
