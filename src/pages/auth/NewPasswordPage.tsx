import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router'
import { AuthBackground } from '../../components/auth/AuthBackground'
import { AuthCard } from '../../components/auth/AuthCard'
import { VoxelLogo } from '../../components/auth/VoxelLogo'
import { AuthInput } from '../../components/auth/AuthInput'
import { AuthButton } from '../../components/auth/AuthButton'
import { Alert } from '../../components/ui/Alert'

export const NewPasswordPage = () => {
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState<string | null>(null)

  const isFilled = password.length > 0 && confirm.length > 0

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!isFilled) return
    if (password !== confirm) {
      setError('Паролі не співпадають.')
      return
    }
    setError(null)
    navigate('/login')
  }

  return (
    <AuthBackground>
      <AuthCard onBack={() => navigate('/recovery')}>
        <div className="flex flex-col items-center">
          <VoxelLogo className="mb-5" />
          <h1 className="w-full text-xl font-bold text-voxel-black">Create a new password</h1>
        </div>

        <div>
          {error && <Alert type="error" message={error} className="mb-4" />}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <AuthInput
              type="password"
              placeholder="Enter a new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              required
            />
            <AuthInput
              type="password"
              placeholder="Confirm password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              autoComplete="new-password"
              required
            />

            <AuthButton active={isFilled}>Send</AuthButton>
          </form>

          <p className="mt-6 text-center text-sm">
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="cursor-pointer text-sm text-voxel-gray-dark hover:underline"
            >
              Use Google
            </button>
          </p>
        </div>
      </AuthCard>
    </AuthBackground>
  )
}