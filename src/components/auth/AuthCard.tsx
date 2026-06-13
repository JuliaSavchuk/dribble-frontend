import type { ReactNode } from 'react'
import { BackArrow } from './BackArrow'
import { cn } from '../../utils/cn'

interface AuthCardProps {
  children: ReactNode
  onBack?: () => void
  className?: string
}

export const AuthCard = ({ children, onBack, className }: AuthCardProps) => {
  return (
    <div className="relative w-full max-w-[520px]">
      <BackArrow onClick={onBack} />
      <div
        className={cn(
          'flex w-full flex-col rounded-[32px] border border-white/40 bg-white/90 p-10 shadow-2xl backdrop-blur-3xl',
          'min-h-[600px] justify-between gap-8',
          className
        )}
      >
        {children}
      </div>
    </div>
  )
}