import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import { useLang } from '@/i18n'

// One continuous cursive stroke for "diba". The i-dot is a separate stroke drawn last.
const WORD =
  'M110 140 C80 120 40 150 45 180 C50 210 90 212 110 185 ' + // d bowl
  'C120 140 126 70 130 40 C132 100 130 170 138 200 ' + // d stem
  'C142 210 160 200 170 170 ' + // to i
  'C174 150 176 140 178 132 C178 160 178 190 188 200 ' + // i
  'C200 208 215 190 222 150 ' + // to b
  'C228 110 236 50 242 40 C250 30 256 55 245 90 ' + // b loop
  'C236 130 232 175 236 200 ' + // b stem
  'C240 215 280 210 282 175 C284 145 255 135 240 160 ' + // b bowl
  'C255 150 285 150 345 140 ' + // to a
  'C325 125 290 140 292 175 C294 205 335 205 345 170 ' + // a bowl
  'C348 150 348 140 350 135 C350 160 348 190 360 200 C370 206 385 195 395 185' // a stem and tail
const DOT = 'M176 108 L183 102'

// Scroll distance (px) over which the word is written. Kept short so the
// signature finishes while it is still on screen below the hero.
const WRITE_DISTANCE = 260

export function ScrollSignature() {
  const { t } = useLang()
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()
  const raw = useTransform(scrollY, [0, WRITE_DISTANCE], [0, 1])
  const progress = useSpring(raw, { stiffness: 140, damping: 30, mass: 0.4 })
  const word = useTransform(progress, [0, 0.92], [0, 1])
  const dot = useTransform(progress, [0.92, 1], [0, 1])
  const visible = useTransform(progress, [0, 0.02], [0, 1])

  return (
    <svg
      viewBox="20 20 400 210"
      fill="none"
      role="img"
      aria-label={t('signatureLabel')}
      className="mt-10 h-auto w-full max-w-[320px] text-brand"
    >
      <motion.path
        d={WORD}
        stroke="currentColor"
        strokeWidth={7}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={reduce ? undefined : { pathLength: word, opacity: visible }}
      />
      <motion.path
        d={DOT}
        stroke="currentColor"
        strokeWidth={7}
        strokeLinecap="round"
        style={reduce ? undefined : { pathLength: dot, opacity: dot }}
      />
    </svg>
  )
}
