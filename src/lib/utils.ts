import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { Language } from '@/i18n/translations'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const LOCALES: Record<Language, string> = {
  en: 'en-US',
  ru: 'ru-RU',
}

export function formatCurrency(value: number, lang: Language = 'en'): string {
  return new Intl.NumberFormat(LOCALES[lang], {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}

/** Short form for chart axes and dense cards: $12.4k / $1.2M */
export function formatCompactCurrency(value: number, lang: Language = 'en'): string {
  return new Intl.NumberFormat(LOCALES[lang], {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value)
}

export function formatDate(iso: string, lang: Language = 'en'): string {
  return new Intl.DateTimeFormat(LOCALES[lang], {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(iso))
}

/** `2026-07` -> `Jul` / `июл.` */
export function formatMonth(isoMonth: string, lang: Language = 'en'): string {
  return new Intl.DateTimeFormat(LOCALES[lang], { month: 'short' }).format(
    new Date(`${isoMonth}-01T00:00:00`),
  )
}

export function formatPercent(value: number, lang: Language = 'en'): string {
  return new Intl.NumberFormat(LOCALES[lang], {
    style: 'percent',
    maximumFractionDigits: 1,
  }).format(value / 100)
}

export function initials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

/** Deterministic accent per id so avatars stay stable across renders. */
export function avatarTone(seed: string): string {
  const tones = [
    'bg-blue-500/12 text-blue-600 dark:text-blue-400',
    'bg-emerald-500/12 text-emerald-600 dark:text-emerald-400',
    'bg-violet-500/12 text-violet-600 dark:text-violet-400',
    'bg-amber-500/12 text-amber-600 dark:text-amber-400',
    'bg-rose-500/12 text-rose-600 dark:text-rose-400',
    'bg-cyan-500/12 text-cyan-600 dark:text-cyan-400',
  ]
  let hash = 0
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) % 997
  }
  return tones[hash % tones.length]!
}

export function todayIso(): string {
  return new Date().toISOString().slice(0, 10)
}

export function isOverdue(iso: string): boolean {
  return iso < todayIso()
}

export function createId(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
