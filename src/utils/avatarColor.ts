// Палітра пастельних кольорів для аватарів-заглушок (без завантаженого фото).
// Для кожного кольору фону підібраний контрастний темніший відтінок тексту,
// щоб літера лишалась добре читабельною (за зразком аватарів у Gmail).
const AVATAR_PALETTE: { bg: string; text: string }[] = [
  { bg: '#FDE2E2', text: '#C2410C' }, // персиковий
  { bg: '#FFEAD2', text: '#C2650C' }, // абрикосовий
  { bg: '#FEF3C7', text: '#A16207' }, // ванільний
  { bg: '#ECFCCB', text: '#4D7C0F' }, // лаймовий
  { bg: '#D1FAE5', text: '#047857' }, // м'ятний
  { bg: '#CFFAFE', text: '#0E7490' }, // бірюзовий
  { bg: '#DBEAFE', text: '#1D4ED8' }, // блакитний
  { bg: '#E0E7FF', text: '#4338CA' }, // індиго
  { bg: '#EDE9FE', text: '#6D28D9' }, // лавандовий
  { bg: '#FAE8FF', text: '#A21CAF' }, // орхідейний
  { bg: '#FCE7F3', text: '#BE185D' }, // рожевий
  { bg: '#FFE4E6', text: '#BE123C' }, // рожево-червоний
]

export function getAvatarColor(seed: string | null | undefined): { bg: string; text: string } {
  if (!seed) return AVATAR_PALETTE[0]

  let hash = 0
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i)
    hash |= 0 // приведення до 32-бітного цілого
  }

  return AVATAR_PALETTE[Math.abs(hash) % AVATAR_PALETTE.length]
}

/** Перша буква username у верхньому регістрі, або "?" якщо username відсутній/порожній. */
export function getAvatarInitial(username?: string | null): string {
  return username ? username.charAt(0).toUpperCase() : '?'
}
