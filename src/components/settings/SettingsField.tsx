import { forwardRef, type InputHTMLAttributes, type ReactNode, type TextareaHTMLAttributes } from 'react'
import { cn } from '../../utils/cn'

interface SettingsFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  hint?: ReactNode
  error?: string
  icon?: ReactNode
}

export const SettingsField = forwardRef<HTMLInputElement, SettingsFieldProps>(
  ({ label, hint, error, icon, className, id, ...props }, ref) => {
    const inputId = id || label.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="flex flex-col gap-2 w-full">
        <label htmlFor={inputId} className="text-base font-semibold text-black">
          {label}
        </label>
        <div className="relative">
          {icon && (
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-ink pointer-events-none">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              'w-full h-12.75 rounded-[20px] border bg-white text-base text-black placeholder:text-black',
              'focus:outline-none focus:ring-1 transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
              icon ? 'pl-12 pr-5' : 'px-6',
              error
                ? 'border-red-400 focus:border-red-500 focus:ring-red-500/30'
                : 'border-voxel-gray-dark focus:border-ink focus:ring-ink/20',
              className
            )}
            {...props}
          />
        </div>
        {hint && !error && <span className="text-sm text-black/38">{hint}</span>}
        {error && <span className="text-sm text-red-600">{error}</span>}
      </div>
    )
  }
)

SettingsField.displayName = 'SettingsField'

interface SettingsTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  hint?: ReactNode
  maxLength?: number
}

// Textarea-версія того ж стилю, з лічильником символів (напр. Bio 0/1024)
export const SettingsTextarea = forwardRef<HTMLTextAreaElement, SettingsTextareaProps>(
  ({ label, hint, maxLength, className, id, value, ...props }, ref) => {
    const inputId = id || label.toLowerCase().replace(/\s+/g, '-')
    const length = typeof value === 'string' ? value.length : 0

    return (
      <div className="flex flex-col gap-2 w-full">
        <div className="flex items-center justify-between">
          <label htmlFor={inputId} className="text-base font-semibold text-black">
            {label}
          </label>
          {maxLength && (
            <span className="text-sm text-black/38">
              {length}/{maxLength}
            </span>
          )}
        </div>
        <textarea
          ref={ref}
          id={inputId}
          value={value}
          maxLength={maxLength}
          rows={6}
          className={cn(
            'w-full rounded-[20px] border border-voxel-gray-dark bg-white px-6 py-4 text-base text-black placeholder:text-black resize-none',
            'focus:outline-none focus:border-ink focus:ring-1 focus:ring-ink/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
            className
          )}
          {...props}
        />
        {hint && <span className="text-sm text-black/38">{hint}</span>}
      </div>
    )
  }
)

SettingsTextarea.displayName = 'SettingsTextarea'