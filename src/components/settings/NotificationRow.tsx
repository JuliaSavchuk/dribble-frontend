import type { ReactNode } from 'react'
import { useT } from '../../i18n'

interface NotificationRowProps {
  label: string
  description: string
  checked: boolean
  onChange: (checked: boolean) => void
  isLast?: boolean
}

export const NotificationRow = ({
  label,
  description,
  checked,
  onChange,
  isLast,
}: NotificationRowProps) => {
  return (
    <div className={!isLast ? 'border-b border-black pb-4 mb-4' : ''}>
      <label className="flex items-start gap-3 cursor-pointer select-none">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="mt-0.5 w-5 h-5 shrink-0 rounded-[5px] accent-primary cursor-pointer"
        />
        <span className="flex flex-col gap-1">
          <span className="text-base text-black">{label}</span>
          <span className="text-sm text-black">{description}</span>
        </span>
      </label>
    </div>
  )
}

interface NotificationSectionProps {
  title: string
  children: ReactNode
  allChecked: boolean
  onToggleAll: (checked: boolean) => void
}

// Заголовок групи сповіщень + посилання "Toggle all", яке одразу
// перемикає всі чекбокси в групі — за макетом Figma.
export const NotificationSection = ({
  title,
  children,
  allChecked,
  onToggleAll,
}: NotificationSectionProps) => {
  const t = useT()
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-base text-black">{title}</span>
        <button
          type="button"
          onClick={() => onToggleAll(!allChecked)}
          className="text-base text-black underline underline-offset-2 hover:opacity-70 transition-opacity cursor-pointer"
        >
          {t.common.toggleAll}
        </button>
      </div>
      {children}
    </div>
  )
}
