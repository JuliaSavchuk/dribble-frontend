import { cn } from '../../utils/cn'

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export const Spinner = ({ size = 'md', className }: SpinnerProps) => {
  return (
    <span
      className={cn(
        'inline-block rounded-full border-[3px] border-[#27273F] border-t-[#EA4C89] animate-spin',
        size === 'sm' && 'w-4 h-4',
        size === 'md' && 'w-8 h-8',
        size === 'lg' && 'w-12 h-12',
        className
      )}
      role="status"
      aria-label="Завантаження..."
    />
  )
}
