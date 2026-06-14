import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router'
import { AuthBackground } from '../../components/auth/AuthBackground'
import { AuthCard } from '../../components/auth/AuthCard'
import { VoxelLogo } from '../../components/auth/VoxelLogo'
import { AuthInput } from '../../components/auth/AuthInput'
import { AuthButton } from '../../components/auth/AuthButton'
import { GoogleButton } from '../../components/auth/GoogleButton'
import { Alert } from '../../components/ui/Alert'
import { useRegister, useGoogleLogin } from '../../hooks/useAuth'
import type { ApiError } from '../../types'

function getErrorMessage(error: unknown): string {
  const err = error as { response?: { data?: ApiError } }
  const data = err?.response?.data
  if (!data) return 'Сталася помилка. Спробуйте ще раз.'
  if (data.detail) return data.detail
  const firstKey = Object.keys(data)[0]
  if (firstKey) {
    const val = data[firstKey]
    return Array.isArray(val) ? val[0] : (val ?? 'Помилка')
  }
  return 'Помилка реєстрації.'
}

export const RegisterPage = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')

  const registerMutation = useRegister()
  const googleMutation = useGoogleLogin()

  const isFilled = email.length > 0 && username.length > 0 && password.length > 0 && password2.length > 0

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!isFilled) return
    registerMutation.mutate({ email, username, password, password2 })
  }

  const handleGoogle = () => {
    // У виробничому середовищі: отримати Google ID token через Google SDK
    googleMutation.mutate('mock-google-id-token')
  }

  const errorMsg = registerMutation.isError
    ? getErrorMessage(registerMutation.error)
    : googleMutation.isError
      ? getErrorMessage(googleMutation.error)
      : null

  return (
    <AuthBackground>
      <AuthCard onBack={() => navigate('/login')}>
        <div className="flex flex-col items-center">
          <VoxelLogo className="mb-5" />
          <h1 className="text-xl font-bold text-voxel-black">Welcome to Voxel</h1>
          <p className="mt-2 text-center text-sm text-voxel-gray-dark">
            Create your account and discover world-class design talent.
          </p>
        </div>

        <div>
          {errorMsg && <Alert type="error" message={errorMsg} className="mb-4" />}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <AuthInput
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              name="email"
              required
            />

            <AuthInput
              type="text"
              placeholder="Choose a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="new-username"
              name="username"
              id="username"
              required
            />

            <AuthInput
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              required
            />

            <AuthInput
              type="password"
              placeholder="Confirm password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              autoComplete="new-password"
              required
            />

            <AuthButton
              active={isFilled}
              isLoading={registerMutation.isPending}
            >
              Create account
            </AuthButton>

            <div className="flex items-center gap-3 text-xs text-voxel-gray">
              <div className="h-px flex-1 bg-black/10" />
              <span>or</span>
              <div className="h-px flex-1 bg-black/10" />
            </div>

            <GoogleButton
              label="Sign up with Google"
              onClick={handleGoogle}
              disabled={googleMutation.isPending}
            />
          </form>

          <p className="mt-6 text-center text-xs text-voxel-gray-dark">
            By continuing, you agree to our Terms and Privacy Policy.
          </p>
          <p className="mt-2 text-center text-sm text-voxel-black">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold underline">
              Sign in
            </Link>
          </p>
        </div>
      </AuthCard>
    </AuthBackground>
  )
}