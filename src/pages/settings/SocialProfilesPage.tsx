import { useState, type FormEvent } from 'react'
import { useProfile, useUpdateProfile } from '../../hooks/useAuth'
import { SettingsLayout } from '../../components/settings/SettingsLayout'
import { SettingsField } from '../../components/settings/SettingsField'
import { Button } from '../../components/ui/Button'
import { Alert } from '../../components/ui/Alert'
import { Spinner } from '../../components/ui/Spinner'
import { TwitterIcon, InstagramIcon, LinkedInIcon, WebIcon } from '../../components/ui/SocialIcons'
import { useT } from '../../i18n'

export const SocialProfilesPage = () => {
  const t = useT()
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
          setSuccessMsg(t.settings.socialProfiles.saved)
          setTimeout(() => setSuccessMsg(''), 4000)
        },
      }
    )
  }

  if (isLoading) {
    return (
      <SettingsLayout title={t.settings.socialProfiles.title}>
        <div className="py-20 flex justify-center">
          <Spinner size="lg" />
        </div>
      </SettingsLayout>
    )
  }

  return (
    <SettingsLayout title={t.settings.socialProfiles.title}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-9">
        {successMsg && <Alert type="success" message={successMsg} />}
        {updateMutation.isError && (
          <Alert type="error" message={t.settings.socialProfiles.saveFailed} />
        )}

        <SettingsField
          label={t.settings.socialProfiles.website}
          type="url"
          placeholder="https://myportfolio.com"
          icon={<WebIcon />}
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
        <SettingsField
          label={t.settings.socialProfiles.twitter}
          type="url"
          placeholder="https://twitter.com/username"
          icon={<TwitterIcon />}
          value={twitter}
          onChange={(e) => setTwitter(e.target.value)}
        />
        <SettingsField
          label={t.settings.socialProfiles.instagram}
          type="url"
          placeholder="https://instagram.com/username"
          icon={<InstagramIcon />}
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
        />
        <SettingsField
          label={t.settings.socialProfiles.linkedin}
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
            {t.common.saveChanges}
          </Button>
        </div>
      </form>
    </SettingsLayout>
  )
}