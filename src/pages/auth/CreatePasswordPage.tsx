import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router'
import { AuthBackground } from '../../components/auth/AuthBackground'
import { AuthCard } from '../../components/auth/AuthCard'
import { VoxelLogo } from '../../components/auth/VoxelLogo'
import { AuthInput } from '../../components/auth/AuthInput'
import { AuthButton } from '../../components/auth/AuthButton'
import { useRegisterFlowStore } from '../../store/registerFlow'

export const CreatePasswordPage = () => {
  const navigate = useNavigate()
  const setPassword = useRegisterFlowStore((s) => s.setPassword)
  const [value, setValue] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!value) return
    setPassword(value)
    navigate('/register/profile')
  }

  return (
    <AuthBackground>
      <AuthCard onBack={() => navigate('/register/confirm')}>
        <div className="mb-6 flex flex-col items-center">
          <VoxelLogo className="mb-5" />
          <h1 className="text-xl font-bold text-voxel-black">Create your password</h1>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <AuthInput
            type="password"
            placeholder="Enter your password"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            autoComplete="new-password"
            required
          />

          <AuthButton active={value.length > 0}>Login</AuthButton>
        </form>

        <p className="mt-6 text-center text-sm text-voxel-gray-dark">
          Don't remember your password?{' '}
          <button
            type="button"
            onClick={() => navigate('/recovery')}
            className="cursor-pointer font-semibold text-voxel-black underline"
          >
            Recovery
          </button>
        </p>
      </AuthCard>
    </AuthBackground>
  )
}
