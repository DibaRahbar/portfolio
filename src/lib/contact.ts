// Your contact details. Used by the Contact page and the footer.
export type ContactLink = {
  id: 'email' | 'linkedin' | 'instagram' | 'telegram'
  /** Shown as text, e.g. in the footer. Brand names stay in Latin letters in every language. */
  label: string
  /** Shown under the label on the Contact page. */
  value: string
  href: string
}

export const contactLinks: ContactLink[] = [
  { id: 'email', label: 'Email', value: 'Dibarahbar14@gmail.com', href: 'mailto:Dibarahbar14@gmail.com' },
  { id: 'linkedin', label: 'LinkedIn', value: 'linkedin.com/in/dibarahbar', href: 'https://www.linkedin.com/in/dibarahbar' },
  { id: 'instagram', label: 'Instagram', value: '@dibarahbar_design', href: 'https://www.instagram.com/dibarahbar_design' },
  { id: 'telegram', label: 'Telegram', value: 't.me/DibaRahbar_Design', href: 'https://t.me/DibaRahbar_Design' },
]

/** External links open in a new tab; mailto links do not. */
export const isExternal = (href: string) => href.startsWith('http')
