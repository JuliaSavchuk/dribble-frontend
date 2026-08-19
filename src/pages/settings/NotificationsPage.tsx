import { useState, type FormEvent } from 'react'
import { SettingsLayout } from '../../components/settings/SettingsLayout'
import { NotificationRow, NotificationSection } from '../../components/settings/NotificationRow'
import { Toggle } from '../../components/ui/Toggle'
import { Button } from '../../components/ui/Button'
import { Alert } from '../../components/ui/Alert'
import { useT } from '../../i18n'

export const NotificationsPage = () => {
  const t = useT()
  const [browserEnabled, setBrowserEnabled] = useState(false)
  const [notice, setNotice] = useState('')

  const [emailPrefs, setEmailPrefs] = useState({
    communications: true,
    accountActivity: false,
    meetupsNearYou: true,
    marketingUpdates: true,
  })

  const [activityPrefs, setActivityPrefs] = useState({
    collaboratorInvite: true,
    comments: true,
    mentions: true,
    follows: true,
    invitationAccepted: true,
    shotLikes: true,
  })

  const [newsletterPrefs, setNewsletterPrefs] = useState({
    education: true,
  })

  const emailAllChecked = Object.values(emailPrefs).every(Boolean)
  const activityAllChecked = Object.values(activityPrefs).every(Boolean)
  const newsletterAllChecked = Object.values(newsletterPrefs).every(Boolean)

  const toggleAllEmail = (checked: boolean) =>
    setEmailPrefs({
      communications: checked,
      accountActivity: checked,
      meetupsNearYou: checked,
      marketingUpdates: checked,
    })

  const toggleAllActivity = (checked: boolean) =>
    setActivityPrefs({
      collaboratorInvite: checked,
      comments: checked,
      mentions: checked,
      follows: checked,
      invitationAccepted: checked,
    shotLikes: checked,
    })

  const toggleAllNewsletter = (checked: boolean) => setNewsletterPrefs({ education: checked })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setNotice(t.settings.notifications.notImplemented)
  }

  return (
    <SettingsLayout title={t.settings.notifications.title}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-10">
        {notice && <Alert type="info" message={notice} />}

        {/* Browser Notifications */}
        <div className="flex flex-col gap-6">
          <h2 className="text-xl font-semibold text-black">{t.settings.notifications.browserSection}</h2>
          <div className="flex items-center gap-4">
            <Toggle
              checked={browserEnabled}
              onChange={setBrowserEnabled}
              label={t.settings.notifications.enableBrowser}
            />
            <span className="text-base text-black">{t.settings.notifications.enableBrowser}</span>
          </div>
        </div>

        {/* Other Email Notifications */}
        <div className="flex flex-col gap-6">
          <h2 className="text-xl font-semibold text-black">{t.settings.notifications.emailSection}</h2>
          <NotificationSection
            title={t.settings.notifications.alertGroup}
            allChecked={emailAllChecked}
            onToggleAll={toggleAllEmail}
          >
            <NotificationRow
              label={t.settings.notifications.communications}
              description={t.settings.notifications.communicationsDescription}
              checked={emailPrefs.communications}
              onChange={(v) => setEmailPrefs((p) => ({ ...p, communications: v }))}
            />
            <NotificationRow
              label={t.settings.notifications.accountActivity}
              description={t.settings.notifications.accountActivityDescription}
              checked={emailPrefs.accountActivity}
              onChange={(v) => setEmailPrefs((p) => ({ ...p, accountActivity: v }))}
            />
            <NotificationRow
              label={t.settings.notifications.meetupsNearYou}
              description={t.settings.notifications.meetupsNearYouDescription}
              checked={emailPrefs.meetupsNearYou}
              onChange={(v) => setEmailPrefs((p) => ({ ...p, meetupsNearYou: v }))}
            />
            <NotificationRow
              label={t.settings.notifications.marketingUpdates}
              description={t.settings.notifications.marketingUpdatesDescription}
              checked={emailPrefs.marketingUpdates}
              onChange={(v) => setEmailPrefs((p) => ({ ...p, marketingUpdates: v }))}
              isLast
            />
          </NotificationSection>
        </div>

        {/* Account Activity */}
        <div className="flex flex-col gap-6">
          <NotificationSection
            title={t.settings.notifications.accountActivityGroup}
            allChecked={activityAllChecked}
            onToggleAll={toggleAllActivity}
          >
            <NotificationRow
              label={t.settings.notifications.collaboratorInvite}
              description={t.settings.notifications.collaboratorInviteDescription}
              checked={activityPrefs.collaboratorInvite}
              onChange={(v) => setActivityPrefs((p) => ({ ...p, collaboratorInvite: v }))}
            />
            <NotificationRow
              label={t.settings.notifications.comments}
              description={t.settings.notifications.commentsDescription}
              checked={activityPrefs.comments}
              onChange={(v) => setActivityPrefs((p) => ({ ...p, comments: v }))}
            />
            <NotificationRow
              label={t.settings.notifications.mentions}
              description={t.settings.notifications.mentionsDescription}
              checked={activityPrefs.mentions}
              onChange={(v) => setActivityPrefs((p) => ({ ...p, mentions: v }))}
            />
            <NotificationRow
              label={t.settings.notifications.newFollowers}
              description={t.settings.notifications.newFollowersDescription}
              checked={activityPrefs.follows}
              onChange={(v) => setActivityPrefs((p) => ({ ...p, follows: v }))}
            />
            <NotificationRow
              label={t.settings.notifications.invitationAccepted}
              description={t.settings.notifications.invitationAcceptedDescription}
              checked={activityPrefs.invitationAccepted}
              onChange={(v) => setActivityPrefs((p) => ({ ...p, invitationAccepted: v }))}
            />
            <NotificationRow
              label={t.settings.notifications.likes}
              description={t.settings.notifications.likesDescription}
              checked={activityPrefs.shotLikes}
              onChange={(v) => setActivityPrefs((p) => ({ ...p, shotLikes: v }))}
              isLast
            />
          </NotificationSection>
        </div>

        {/* Weekly Newsletters */}
        <div className="flex flex-col gap-6">
          <NotificationSection
            title={t.settings.notifications.newsletterGroup}
            allChecked={newsletterAllChecked}
            onToggleAll={toggleAllNewsletter}
          >
            <NotificationRow
              label={t.settings.notifications.education}
              description={t.settings.notifications.educationDescription}
              checked={newsletterPrefs.education}
              onChange={(v) => setNewsletterPrefs({ education: v })}
              isLast
            />
          </NotificationSection>
        </div>

        <div className="flex justify-end">
          <Button type="submit" variant="dark">
            {t.common.saveChanges}
          </Button>
        </div>
      </form>
    </SettingsLayout>
  )
}
