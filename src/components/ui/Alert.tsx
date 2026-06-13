import { cn } from '../../utils/cn'

interface AlertProps {
  type: 'error' | 'success' | 'info'
  message: string
  className?: string
}

export const Alert = ({ type, message, className }: AlertProps) => {
  return (
    <div
      role="alert"
      className={cn(
        'p-4 text-sm rounded-2xl border',
        type === 'error' && 'bg-red-950/30 border-red-500/40 text-red-400',
        type === 'success' && 'bg-green-950/30 border-green-500/40 text-green-400',
        type === 'info' && 'bg-blue-950/30 border-blue-500/40 text-blue-400',
        className
      )}
    >
      {message}
    </div>
  )
}
