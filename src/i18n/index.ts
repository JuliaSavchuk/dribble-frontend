import { uk } from './uk.ts'
import { en } from './en.ts'
import type { Translations } from './uk.ts'
import { useLocaleStore } from '../store/localeStore'

export type Locale = 'uk' | 'en'

// Обидва словники мають бути однакової форми — це гарантує тип
// `Translations` (див. uk.ts): en.ts не збереться, якщо в ньому бракує
// ключа або є зайвий.
export const translations: Record<Locale, Translations> = { uk, en }

export const LOCALES: { code: Locale; label: string; nativeLabel: string }[] = [
  { code: 'uk', label: 'Ukrainian', nativeLabel: 'Українська' },
  { code: 'en', label: 'English', nativeLabel: 'English' },
]

// useT() — реактивний хук доступу до текстів інтерфейсу поточною мовою.
export const useT = () => {
  const locale = useLocaleStore((s) => s.locale)
  return translations[locale]
}
