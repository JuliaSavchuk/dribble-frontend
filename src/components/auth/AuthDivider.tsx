import { cn } from '../../utils/cn'
import { useT } from '../../i18n'

interface AuthDividerProps {
  label?: string
  className?: string
}

export const AuthDivider = ({ label, className }: AuthDividerProps) => {
  const t = useT()
  const resolvedLabel = label ?? t.common.or

  return (
    <div className={cn('flex items-center gap-3 text-xs text-voxel-gray', className)}>
      <div className="h-px flex-1 bg-black/10" />
      <span>{resolvedLabel}</span>
      <div className="h-px flex-1 bg-black/10" />
    </div>
  )
}
