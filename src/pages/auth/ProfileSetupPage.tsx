import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router'
import { AuthBackground } from '../../components/auth/AuthBackground'
import { AuthCard } from '../../components/auth/AuthCard'
import { VoxelLogo } from '../../components/auth/VoxelLogo'
import { AuthInput } from '../../components/auth/AuthInput'
import { AuthButton } from '../../components/auth/AuthButton'
import { Alert } from '../../components/ui/Alert'
import { useRegister } from '../../hooks/useAuth'
import { useRegisterFlowStore } from '../../store/registerFlow'
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

const toUsername = (fullName: string, email: string) => {
  const fromName = fullName.trim().toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '')
  if (fromName.length >= 3) return fromName
  const fromEmail = email.split('@')[0]?.replace(/[^a-zA-Z0-9_]/g, '') ?? ''
  return fromEmail.length >= 3 ? fromEmail : `user_${Date.now()}`
}

export const ProfileSetupPage = () => {
  const navigate = useNavigate()
  const { email, password, setProfile } = useRegisterFlowStore()
  const [fullName, setFullName] = useState('')
  const [location, setLocation] = useState('')
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)

  const registerMutation = useRegister()

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setAvatarPreview(URL.createObjectURL(file))
  }

  const finish = (name: string, loc: string) => {
    setProfile(name, loc)
    registerMutation.mutate({
      email,
      username: toUsername(name, email),
      password,
      password2: password,
    })
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!fullName) return
    finish(fullName, location)
  }

  const handleSkip = () => finish('', '')

  const errorMsg = registerMutation.isError ? getErrorMessage(registerMutation.error) : null

  return (
    <AuthBackground>
      <AuthCard onBack={() => navigate('/register/password')}>
        <div className="flex flex-col items-center">
          <VoxelLogo className="mb-5" />
          <h1 className="w-full text-xl font-bold text-voxel-black">Tell us about yourself</h1>
        </div>

        <div>
          {errorMsg && <Alert type="error" message={errorMsg} className="mb-4" />}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label className="flex cursor-pointer items-center gap-3">
              <span className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full border border-dashed border-black/20 bg-white/40">
                {avatarPreview ? (
                  <img src={avatarPreview} alt="" className="h-full w-full object-cover" />
                ) : (
                  <svg viewBox="0 0 24 24" className="h-6 w-6 text-voxel-gray" fill="none" stroke="currentColor" strokeWidth={1.5}>
                    <rect x="3" y="3" width="18" height="18" rx="4" />
                    <circle cx="9" cy="10" r="2" />
                    <path d="M21 17l-5-5-4 4-3-3-5 5" />
                  </svg>
                )}
                <span className="absolute -right-0.5 -bottom-0.5 flex h-5 w-5 items-center justify-center rounded-full border border-black/10 bg-white text-voxel-black">
                  <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </span>
              <span className="text-xs text-voxel-gray-dark">
                300px x 300px minimum
                <br />
                JPG, GIF, or PNG. Max file size 4MB.
              </span>
              <input type="file" accept="image/jpeg,image/png,image/gif" className="hidden" onChange={handleAvatarChange} />
            </label>

            <AuthInput
              label="Full name"
              type="text"
              placeholder="Enter your name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              autoComplete="name"
              required
            />

            <AuthInput
              label="Location"
              type="text"
              placeholder="Enter your location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              autoComplete="address-level2"
            />

            <AuthButton active={fullName.length > 0} isLoading={registerMutation.isPending}>
              Continue
            </AuthButton>
          </form>

          <p className="mt-4 text-center text-sm">
            <button
              type="button"
              onClick={handleSkip}
              disabled={registerMutation.isPending}
              className="cursor-pointer font-semibold text-voxel-gray-dark underline disabled:opacity-50"
            >
              Skip
            </button>
          </p>
        </div>
      </AuthCard>
    </AuthBackground>
  )
}