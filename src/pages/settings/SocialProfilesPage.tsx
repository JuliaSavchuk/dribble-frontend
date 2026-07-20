import { useState, type FormEvent } from 'react'
import { useProfile, useUpdateProfile } from '../../hooks/useAuth'
import { SettingsLayout } from '../../components/settings/SettingsLayout'
import { SettingsField } from '../../components/settings/SettingsField'
import { Button } from '../../components/ui/Button'
import { Alert } from '../../components/ui/Alert'
import { Spinner } from '../../components/ui/Spinner'
import { TwitterIcon, InstagramIcon, LinkedInIcon, WebIcon } from '../../components/ui/SocialIcons'

// На відміну від General/Edit Profile/Company, поля тут (website, twitter,
// instagram, linkedin) ВЖЕ входять до Фази 0 API контракту — це та сама
// логіка, що раніше жила у ProfilePage.tsx, лише перенесена у власну
// сторінку розділу Settings за новим макетом.
export const SocialProfilesPage = () => {
  const { data: profile, isLoading } = useProfile()
  const updateMutation = useUpdateProfile()

  const [website, setWebsite] = useState('')
  const [twitter, setTwitter] = useState('')
  const [instagram, setInstagram] = useState('')
  const [linkedin, setLinkedin] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  const [hydratedForId, setHydratedForId] = useState<number | null>(null)
  if (profile && profile.id !== hydratedForId) {
    setHydratedForId(profile.id)
    setWebsite(profile.website ?? '')
    setTwitter(profile.twitter ?? '')
    setInstagram(profile.instagram ?? '')
    setLinkedin(profile.linkedin ?? '')
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    updateMutation.mutate(
      { website, twitter, instagram, linkedin },
      {
        onSuccess: () => {
          setSuccessMsg('Зміни збережено!')
          setTimeout(() => setSuccessMsg(''), 4000)
        },
      }
    )
  }

  if (isLoading) {
    return (
      <SettingsLayout title="Social Profiles">
        <div className="py-20 flex justify-center">
          <Spinner size="lg" />
        </div>
      </SettingsLayout>
    )
  }

  return (
    <SettingsLayout title="Social Profiles">
      <form onSubmit={handleSubmit} className="flex flex-col gap-9">
        {successMsg && <Alert type="success" message={successMsg} />}
        {updateMutation.isError && (
          <Alert type="error" message="Не вдалося зберегти. Спробуйте ще раз." />
        )}

        <SettingsField
          label="Website"
          type="url"
          placeholder="https://myportfolio.com"
          icon={<WebIcon />}
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
        <SettingsField
          label="Twitter / X"
          type="url"
          placeholder="https://twitter.com/username"
          icon={<TwitterIcon />}
          value={twitter}
          onChange={(e) => setTwitter(e.target.value)}
        />
        <SettingsField
          label="Instagram"
          type="url"
          placeholder="https://instagram.com/username"
          icon={<InstagramIcon />}
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
        />
        <SettingsField
          label="LinkedIn"
          type="url"
          placeholder="https://linkedin.com/in/username"
          icon={<LinkedInIcon />}
          value={linkedin}
          onChange={(e) => setLinkedin(e.target.value)}
        />

        <div className="flex justify-end">
          <Button
            type="submit"
            variant="dark"
            isLoading={updateMutation.isPending}
            disabled={updateMutation.isPending}
          >
            Save change
          </Button>
        </div>
      </form>
    </SettingsLayout>
  )
}