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
  const [locationVal, setLocationVal] = useState('')
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
    finish(fullName, locationVal)
  }

  const handleSkip = () => finish('', '')

  const errorMsg = registerMutation.isError ? getErrorMessage(registerMutation.error) : null

  return (
    <AuthBackground>
      <AuthCard onBack={() => navigate('/register/password')}>

        <div className="flex flex-col items-center gap-1">
          <VoxelLogo className="mb-2" />
          <h1 className="text-[22px] font-bold text-voxel-black text-center">Tell us about yourself</h1>
        </div>

        <div className="flex flex-col gap-5">
          {errorMsg && <Alert type="error" message={errorMsg} className="mb-1" />}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            <label className="flex cursor-pointer items-center gap-5">
              <span className="relative shrink-0 flex h-27.5 w-27.5 items-center justify-center rounded-full border border-[#C6CDD6] bg-transparent overflow-visible">
                <span className="relative flex h-21.5 w-21.5 items-center justify-center rounded-full border border-[#C6CDD6] bg-[#EDF0F3] overflow-visible">
                  {avatarPreview ? (
                    <img src={avatarPreview} alt="" className="h-full w-full object-cover rounded-full" />
                  ) : (
                    <svg
                      viewBox="0 0 24 24"
                      className="h-11.5 w-11.5 text-[#B4BDC8]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.1}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="3.5" />
                      <circle cx="8.5" cy="9.5" r="1.5" />
                      <path d="M21 17l-5.5-5.5-4.5 4.5-2.5-2.5L3 18" />
                    </svg>
                  )}
                  <span className="absolute -bottom-2 -right-2 flex h-6.5 w-6.5 items-center justify-center rounded-full border-2 border-voxel-white bg-[#C6CDD6] shadow-sm">
                    <svg viewBox="0 0 24 24" className="h-3 w-3 text-white" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </span>
              </span>

              <span className="text-[13px] leading-[1.6] text-voxel-gray-dark">
                300px x 300px minimum<br />
                JPG, GIF, or PNG. Max file size 4MB.
              </span>

              <input type="file" accept="image/jpeg,image/png,image/gif" className="hidden" onChange={handleAvatarChange} />
            </label>

            <AuthInput
              id="profile-full-name"
              label="Full name"
              type="text"
              placeholder="Enter your name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              autoComplete="name"
              required
            />

            <AuthInput
              id="profile-location"
              label="Location"
              type="text"
              placeholder="Enter your location"
              value={locationVal}
              onChange={(e) => setLocationVal(e.target.value)}
              autoComplete="address-level2"
            />

            <AuthButton active={fullName.length > 0} isLoading={registerMutation.isPending}>
              Continue
            </AuthButton>
          </form>

          <p className="text-center text-sm">
            <button
              type="button"
              onClick={handleSkip}
              disabled={registerMutation.isPending}
              className="cursor-pointer text-voxel-gray-dark hover:underline disabled:opacity-50"
            >
              Skip
            </button>
          </p>
        </div>

      </AuthCard>
    </AuthBackground>
  )
}