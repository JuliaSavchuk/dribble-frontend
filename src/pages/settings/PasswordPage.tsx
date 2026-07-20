import { useState, type FormEvent } from 'react'
import { useChangePassword } from '../../hooks/useAuth'
import { SettingsLayout } from '../../components/settings/SettingsLayout'
import { SettingsField } from '../../components/settings/SettingsField'
import { Button } from '../../components/ui/Button'
import { Alert } from '../../components/ui/Alert'
import { getErrorMessage } from '../../utils/errors'

export const PasswordPage = () => {
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
      setError('Пароль має містити щонайменше 5 символів.')
      return
    }
    if (newPassword !== newPassword2) {
      setError('Нові паролі не співпадають.')
      return
    }

    changePasswordMutation.mutate(
      { old_password: oldPassword, new_password: newPassword, new_password2: newPassword2 },
      {
        onSuccess: () => {
          setSuccess('Пароль успішно змінено!')
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
    <SettingsLayout title="Password">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {success && <Alert type="success" message={success} />}
        {error && <Alert type="error" message={error} />}

        <SettingsField
          label="Current password"
          type="password"
          placeholder="Enter current password"
          autoComplete="current-password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          required
        />
        <SettingsField
          label="Password"
          type="password"
          placeholder="Enter password"
          autoComplete="new-password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          hint="Minimum 5 characters"
          required
        />
        <SettingsField
          label="Confirm password"
          type="password"
          placeholder="Enter password again"
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
            Save
          </Button>
        </div>
      </form>
    </SettingsLayout>
  )
}