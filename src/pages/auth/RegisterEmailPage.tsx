import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router'
import { AuthBackground } from '../../components/auth/AuthBackground'
import { AuthCard } from '../../components/auth/AuthCard'
import { VoxelLogo } from '../../components/auth/VoxelLogo'
import { AuthInput } from '../../components/auth/AuthInput'
import { AuthButton } from '../../components/auth/AuthButton'
import { GoogleButton } from '../../components/auth/GoogleButton'
import { useRegisterFlowStore } from '../../store/registerFlow'

export const RegisterEmailPage = () => {
  const navigate = useNavigate()
  const setEmail = useRegisterFlowStore((s) => s.setEmail)
  const [value, setValue] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!value) return
    setEmail(value)
    navigate('/register/confirm')
  }

  const handleGoogle = () => {
    // У виробничому середовищі: запустити процес аутентифікації Google OAuth
    navigate('/register/profile')
  }

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
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <AuthInput
              type="email"
              placeholder="Enter email address"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              autoComplete="email"
              required
            />

            <AuthButton active={value.length > 0}>Continue</AuthButton>

            <div className="flex items-center gap-3 text-xs text-voxel-gray">
              <div className="h-px flex-1 bg-black/10" />
              <span>or</span>
              <div className="h-px flex-1 bg-black/10" />
            </div>

            <GoogleButton label="Login with Google account" onClick={handleGoogle} />
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