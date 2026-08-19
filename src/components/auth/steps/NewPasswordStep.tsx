import type { ReactNode } from 'react'
import { AuthCard } from '../AuthCard'
import { VoxelLogo } from '../VoxelLogo'
import { AuthInput } from '../AuthInput'
import { AuthButton } from '../AuthButton'
import { Alert } from '../../ui/Alert'
import { useT } from '../../../i18n'

interface NewPasswordStepProps {
  title: string
  password: string
  onPasswordChange: (v: string) => void
  confirmPassword: string
  onConfirmChange: (v: string) => void
  passwordPlaceholder?: string
  confirmPlaceholder?: string
  submitLabel: string
  onBack: () => void
  onSubmit: () => void
  isLoading?: boolean
  error?: string | null
  footer?: ReactNode
}

export const NewPasswordStep = ({
  title,
  password,
  onPasswordChange,
  confirmPassword,
  onConfirmChange,
  passwordPlaceholder,
  confirmPlaceholder,
  submitLabel,
  onBack,
  onSubmit,
  isLoading,
  error,
  footer,
}: NewPasswordStepProps) => {
  const t = useT()
  const isFilled = password.length >= 8 && confirmPassword.length >= 8
  const mismatch = password.length > 0 && confirmPassword.length > 0 && password !== confirmPassword

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isFilled || mismatch) return
    onSubmit()
  }

  return (
    <AuthCard onBack={onBack}>
      <div className="flex flex-col items-center">
        <VoxelLogo className="mb-5" />
        <h1 className="text-xl font-bold text-voxel-black">{title}</h1>
      </div>

      <div>
        {error && <Alert type="error" message={error} className="mb-4" />}
        {mismatch && <Alert type="error" message={t.auth.newPassword.mismatch} className="mb-4" />}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <AuthInput
            type="password"
            placeholder={passwordPlaceholder ?? t.auth.newPassword.passwordPlaceholder}
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
            autoComplete="new-password"
            minLength={8}
            disabled={isLoading}
            required
          />
          <AuthInput
            type="password"
            placeholder={confirmPlaceholder ?? t.auth.newPassword.confirmPlaceholder}
            value={confirmPassword}
            onChange={(e) => onConfirmChange(e.target.value)}
            autoComplete="new-password"
            minLength={8}
            disabled={isLoading}
            required
          />

          <AuthButton active={isFilled && !mismatch} isLoading={isLoading} className="mt-2">
            {submitLabel}
          </AuthButton>
        </form>

        {footer && <div className="mt-4 text-center text-sm text-voxel-black">{footer}</div>}
      </div>
    </AuthCard>
  )
}
