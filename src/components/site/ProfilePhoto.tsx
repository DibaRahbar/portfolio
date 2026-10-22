import { useState } from 'react'
import { useLang } from '@/i18n'

// Put your photo at public/profile.jpg. Until it exists, a placeholder with initials is shown.
const PHOTO_SRC = `${import.meta.env.BASE_URL}profile.jpg`

/** Rounded-square portrait that sits inline in the hero headline. */
export function ProfilePhoto({ className = '' }: { className?: string }) {
  const { t } = useLang()
  const [missing, setMissing] = useState(false)
  const frame = `shrink-0 -rotate-3 rounded-[1.75rem] shadow-[0_12px_30px_-12px_rgba(84,23,144,0.45)] ring-2 ring-background ${className}`

  if (missing) {
    return (
      <span
        role="img"
        aria-label={t('name')}
        className={`${frame} grid place-items-center bg-primary text-xl font-black text-primary-foreground sm:text-3xl lg:text-5xl`}
      >
        DR
      </span>
    )
  }

  return <img src={PHOTO_SRC} alt={t('name')} onError={() => setMissing(true)} className={`${frame} object-cover`} />
}
