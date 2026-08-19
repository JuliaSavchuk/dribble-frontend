import { useState, type FormEvent } from 'react'
import { useChangePassword } from '../../hooks/useAuth'
import { SettingsLayout } from '../../components/settings/SettingsLayout'
import { SettingsField } from '../../components/settings/SettingsField'
import { Button } from '../../components/ui/Button'
import { Alert } from '../../components/ui/Alert'
import { getErrorMessage } from '../../utils/errors'
import { useT } from '../../i18n'

export const PasswordPage = () => {
  const t = useT()
  const changePasswordMutation = useChangePassword()

  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newPassword2, setNewPassword2] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setError('')

    if (newPassword.length < 5) {
      setError(t.settings.password.tooShort)
      return
    }
    if (newPassword !== newPassword2) {
      setError(t.settings.password.mismatch)
      return
    }

    changePasswordMutation.mutate(
      { old_password: oldPassword, new_password: newPassword, new_password2: newPassword2 },
      {
        onSuccess: () => {
          setSuccess(t.settings.password.changed)
          setOldPassword('')
          setNewPassword('')
          setNewPassword2('')
          setTimeout(() => setSuccess(''), 4000)
        },
        onError: (err) => setError(getErrorMessage(err)),
      }
    )
  }

  return (
    <SettingsLayout title={t.settings.password.title}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {success && <Alert type="success" message={success} />}
        {error && <Alert type="error" message={error} />}

        <SettingsField
          label={t.settings.password.currentPassword}
          type="password"
          placeholder={t.settings.password.currentPasswordPlaceholder}
          autoComplete="current-password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          required
        />
        <SettingsField
          label={t.settings.password.newPassword}
          type="password"
          placeholder={t.settings.password.newPasswordPlaceholder}
          autoComplete="new-password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          hint={t.settings.password.minLengthHint}
          required
        />
        <SettingsField
          label={t.settings.password.confirmPassword}
          type="password"
          placeholder={t.settings.password.confirmPasswordPlaceholder}
          autoComplete="new-password"
          value={newPassword2}
          onChange={(e) => setNewPassword2(e.target.value)}
          required
        />

        <div className="flex justify-end">
          <Button
            type="submit"
            variant="dark"
            isLoading={changePasswordMutation.isPending}
            disabled={changePasswordMutation.isPending}
          >
            {t.settings.password.save}
          </Button>
        </div>
      </form>
    </SettingsLayout>
  )
}