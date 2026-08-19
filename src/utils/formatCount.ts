// Компактне форматування лічильників (лайки тощо): 900 -> "900", 1200 -> "1.2k", 9000 -> "9k"
export function formatCount(value: number): string {
  if (value < 1000) return String(value)

  const thousands = value / 1000
  const rounded = thousands >= 10 ? Math.round(thousands) : Math.round(thousands * 10) / 10

  return `${rounded}k`
}
