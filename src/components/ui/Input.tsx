import { type InputHTMLAttributes, forwardRef } from 'react'
import { cn } from '../../utils/cn'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, className, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-semibold text-[#8E8EA0] tracking-wider uppercase"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'w-full rounded-2xl bg-[#16162a] border border-[#27273F] px-4 py-3 text-sm text-white placeholder:text-[#8E8EA0]/50',
            'focus:outline-none focus:border-[#EA4C89] focus:ring-1 focus:ring-[#EA4C89]/50',
            'transition-all duration-200',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            error && 'border-red-500/70 focus:border-red-500 focus:ring-red-500/50',
            className
          )}
          {...props}
        />
        {hint && !error && (
          <span className="text-xs text-[#8E8EA0] mt-0.5">{hint}</span>
        )}
        {error && (
          <span className="text-xs text-red-400 mt-0.5 flex items-center gap-1">
            <svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </span>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
