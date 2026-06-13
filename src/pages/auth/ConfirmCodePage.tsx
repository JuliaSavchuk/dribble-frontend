import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router'
import { AuthBackground } from '../../components/auth/AuthBackground'
import { AuthCard } from '../../components/auth/AuthCard'
import { VoxelLogo } from '../../components/auth/VoxelLogo'
import { AuthButton } from '../../components/auth/AuthButton'
import { OtpInput } from '../../components/auth/OtpInput'
import { useRegisterFlowStore } from '../../store/registerFlow'

const maskEmail = (email: string) => {
  const [name, domain] = email.split('@')
  if (!name || !domain) return email
  const visible = name.slice(0, 1)
  return `${visible}${'*'.repeat(Math.max(name.length - 1, 3))}@****.${domain.split('.').pop()}`
}

export const ConfirmCodePage = () => {
  const navigate = useNavigate()
  const email = useRegisterFlowStore((s) => s.email)
  const [code, setCode] = useState<string[]>(Array(6).fill(''))

  const isComplete = code.every((digit) => digit !== '')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!isComplete) return
    navigate('/register/password')
  }

  return (
    <AuthBackground>
      <AuthCard onBack={() => navigate('/register')}>
        <div className="flex flex-col items-center">
          <VoxelLogo className="mb-5" />
          <h1 className="text-xl font-bold text-voxel-black">Confirm it's you</h1>
          <p className="mt-2 text-center text-sm text-voxel-gray-dark">
            We've sent you a passcode.
            <br />
            Please check your inbox at {maskEmail(email || 'you@example.com')}.
          </p>
        </div>

        <div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <OtpInput value={code} onChange={setCode} />

            <p className="text-center text-sm text-voxel-gray-dark">
              <button type="button" className="cursor-pointer hover:underline">
                Resend code
              </button>
            </p>

            <AuthButton active={isComplete}>Continue</AuthButton>
          </form>

          <p className="mt-6 text-center text-sm text-voxel-gray-dark">
            Can't find your code?{' '}
            <button
              type="button"
              onClick={() => navigate('/register/password')}
              className="cursor-pointer hover:underline"
            >
              Use password
            </button>
          </p>
        </div>
      </AuthCard>
    </AuthBackground>
  )
}