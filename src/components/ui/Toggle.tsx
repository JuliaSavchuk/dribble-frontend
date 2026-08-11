import { cn } from '../../utils/cn'

interface ToggleProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: string
  disabled?: boolean
  className?: string
}

export const Toggle = ({ checked, onChange, label, disabled, className }: ToggleProps) => {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={cn(
        'relative inline-flex h-7 w-16 shrink-0 items-center rounded-full transition-colors duration-200',
        'disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer',
        checked ? 'bg-primary' : 'bg-black/30',
        className
      )}
    >
      <span
        className={cn(
          'inline-block h-6 w-6 transform rounded-full bg-white shadow-sm transition-transform duration-200',
          checked ? 'translate-x-9' : 'translate-x-0.5'
        )}
      />
    </button>
  )
}
