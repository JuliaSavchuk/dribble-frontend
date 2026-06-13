import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router'
import { AuthBackground } from '../../components/auth/AuthBackground'
import { AuthCard } from '../../components/auth/AuthCard'
import { VoxelLogo } from '../../components/auth/VoxelLogo'
import { AuthInput } from '../../components/auth/AuthInput'
import { AuthButton } from '../../components/auth/AuthButton'

export const RecoveryPage = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!email) return
    navigate('/recovery/new-password')
  }

  return (
    <AuthBackground>
      <AuthCard onBack={() => navigate('/login')}>
        <div className="flex flex-col items-center">
          <VoxelLogo className="mb-5" />
          <h1 className="w-full text-xl font-bold text-voxel-black">Recovery your password</h1>
        </div>

        <div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <AuthInput
              type="email"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />

            <AuthButton active={email.length > 0}>Send</AuthButton>
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