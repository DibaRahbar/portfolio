import type { ReactNode } from 'react'
import { SiteDock, type Section } from '@/components/site/SiteDock'
import { useLang, type Lang } from '@/i18n'

export function SectionHeading({ label, title }: { label: string; title: string }) {
  return (
    <div>
      <p className="font-mono text-[11px] tracking-[0.06em] text-brand-soft uppercase">{label}</p>
      <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">{title}</h2>
    </div>
  )
}

function LanguageSwitch() {
  const { lang, setLang, t } = useLang()
  const options: { value: Lang; label: string }[] = [
    { value: 'en', label: 'EN' },
    { value: 'fa', label: 'فا' },
  ]
  return (
    <div role="group" aria-label={t('language')} className="flex rounded-full border bg-background p-1">
      {options.map(option => (
        <button
          key={option.value}
          type="button"
          lang={option.value}
          aria-pressed={lang === option.value}
          onClick={() => setLang(option.value)}
          className="min-w-10 rounded-full px-3 py-1 text-[13px] font-medium text-muted-foreground transition-colors hover:text-brand aria-pressed:bg-primary aria-pressed:text-primary-foreground"
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}

export function Shell({ active, children }: { active: Section; children: ReactNode }) {
  const { t } = useLang()
  return (
    <>
      <main className="mx-auto max-w-[1264px] px-4 pt-10 pb-44 sm:px-8 xl:px-0">
        <header className="flex items-center justify-between gap-4">
          <a href="#/" className="text-xl font-semibold tracking-tight">
            {t('name')}
          </a>
          <LanguageSwitch />
        </header>
        {children}
      </main>
      <SiteDock active={active} />
    </>
  )
}
