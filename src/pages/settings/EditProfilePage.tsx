import { useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import { useProfile, useUpdateProfile } from '../../hooks/useAuth'
import { SettingsLayout } from '../../components/settings/SettingsLayout'
import { SettingsTextarea } from '../../components/settings/SettingsField'
import { Avatar } from '../../components/ui/Avatar'
import { Button } from '../../components/ui/Button'
import { Alert } from '../../components/ui/Alert'
import { Spinner } from '../../components/ui/Spinner'

export const EditProfilePage = () => {
  const { data: profile, isLoading } = useProfile()
  const updateMutation = useUpdateProfile()

  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const [bio, setBio] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  const fileInputRef = useRef<HTMLInputElement>(null)

  const [hydratedForId, setHydratedForId] = useState<number | null>(null)
  if (profile && profile.id !== hydratedForId) {
    setHydratedForId(profile.id)
    setAvatarPreview(profile.avatar)
    setBio(profile.bio ?? '')
  }

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setAvatarFile(file)
      setAvatarPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    updateMutation.mutate(
      { bio, avatar: avatarFile },
      {
        onSuccess: () => {
          setAvatarFile(null)
          setSuccessMsg('Профіль успішно оновлено!')
          setTimeout(() => setSuccessMsg(''), 4000)
        },
      }
    )
  }

  if (isLoading) {
    return (
      <SettingsLayout title="Edit Profile">
        <div className="py-20 flex justify-center">
          <Spinner size="lg" />
        </div>
      </SettingsLayout>
    )
  }

  return (
    <SettingsLayout title="Edit Profile">
      <form onSubmit={handleSubmit} className="flex flex-col gap-9">
        {successMsg && <Alert type="success" message={successMsg} />}
        {updateMutation.isError && (
          <Alert type="error" message="Не вдалося зберегти. Спробуйте ще раз." />
        )}

        {/* Аватар */}
        <div className="flex flex-wrap items-center gap-4">
          <Avatar
            src={avatarPreview}
            username={profile?.username ?? '?'}
            className="w-23.5 h-23.5 border border-border shrink-0"
            textClassName="text-2xl"
          />
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-5 py-1.5 rounded-md bg-black/4 text-sm font-semibold text-black hover:bg-black/8 transition-colors cursor-pointer"
              >
                Select image
              </button>
              <span className="text-sm font-semibold text-black">
                {avatarFile ? avatarFile.name : 'No image selected'}
              </span>
            </div>
            <p className="text-sm font-semibold text-black/38">JPG, GIF or PNG, Max size of 5mb</p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/gif"
              onChange={handleAvatarChange}
              className="hidden"
            />
          </div>
        </div>

        <SettingsTextarea
          label="Bio"
          placeholder="Brief description for your profile"
          maxLength={1024}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          hint="Brief description for your profile."
        />

        <div className="flex justify-end">
          <Button
            type="submit"
            variant="dark"
            isLoading={updateMutation.isPending}
            disabled={updateMutation.isPending}
          >
            Save Profile
          </Button>
        </div>
      </form>
    </SettingsLayout>
  )
}