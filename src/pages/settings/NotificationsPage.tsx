import { useState, type FormEvent } from 'react'
import { SettingsLayout } from '../../components/settings/SettingsLayout'
import { NotificationRow, NotificationSection } from '../../components/settings/NotificationRow'
import { Toggle } from '../../components/ui/Toggle'
import { Button } from '../../components/ui/Button'
import { Alert } from '../../components/ui/Alert'

// Бекенд не має моделі "notification preferences" — весь стан живе лише
// в React-компоненті на час сесії. "Save change" чесно повідомляє про
// відсутність підключення до сервера, а не імітує збереження.
export const NotificationsPage = () => {
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
    setNotice(
      'Розділ «Notifications» ще не підключений до бекенду — налаштування зберігаються лише локально, в межах цього сеансу.'
    )
  }

  return (
    <SettingsLayout title="Notifications">
      <form onSubmit={handleSubmit} className="flex flex-col gap-10">
        {notice && <Alert type="info" message={notice} />}

        {/* Browser Notifications */}
        <div className="flex flex-col gap-6">
          <h2 className="text-xl font-semibold text-black">Browser Notifications</h2>
          <div className="flex items-center gap-4">
            <Toggle
              checked={browserEnabled}
              onChange={setBrowserEnabled}
              label="Enable Desktop Browser Notifications"
            />
            <span className="text-base text-black">Enable Desktop Browser Notifications</span>
          </div>
        </div>

        {/* Other Email Notifications */}
        <div className="flex flex-col gap-6">
          <h2 className="text-xl font-semibold text-black">Other Email Notifications</h2>
          <NotificationSection
            title="Alert"
            allChecked={emailAllChecked}
            onToggleAll={toggleAllEmail}
          >
            <NotificationRow
              label="Communications"
              description="Get Voxel news, announcements, and product updates"
              checked={emailPrefs.communications}
              onChange={(v) => setEmailPrefs((p) => ({ ...p, communications: v }))}
            />
            <NotificationRow
              label="Account Activity"
              description="Get important notifications about you or activity you've missed"
              checked={emailPrefs.accountActivity}
              onChange={(v) => setEmailPrefs((p) => ({ ...p, accountActivity: v }))}
            />
            <NotificationRow
              label="Meetups Near You"
              description="Get an email when a Voxel Meetup is posted close to my location"
              checked={emailPrefs.meetupsNearYou}
              onChange={(v) => setEmailPrefs((p) => ({ ...p, meetupsNearYou: v }))}
            />
            <NotificationRow
              label="Marketing Updates"
              description="Stay informed about our latest products, promotions, and special offers"
              checked={emailPrefs.marketingUpdates}
              onChange={(v) => setEmailPrefs((p) => ({ ...p, marketingUpdates: v }))}
              isLast
            />
          </NotificationSection>
        </div>

        {/* Account Activity */}
        <div className="flex flex-col gap-6">
          <NotificationSection
            title="Account Activity"
            allChecked={activityAllChecked}
            onToggleAll={toggleAllActivity}
          >
            <NotificationRow
              label="Collaborator invite"
              description="Someone asks me to be a collaborator on one of their shots"
              checked={activityPrefs.collaboratorInvite}
              onChange={(v) => setActivityPrefs((p) => ({ ...p, collaboratorInvite: v }))}
            />
            <NotificationRow
              label="Comments"
              description="Someone comments on one of my shots"
              checked={activityPrefs.comments}
              onChange={(v) => setActivityPrefs((p) => ({ ...p, comments: v }))}
            />
            <NotificationRow
              label="Mentions"
              description="Someone mentions me"
              checked={activityPrefs.mentions}
              onChange={(v) => setActivityPrefs((p) => ({ ...p, mentions: v }))}
            />
            <NotificationRow
              label="New followers"
              description="Anyone follows me"
              checked={activityPrefs.follows}
              onChange={(v) => setActivityPrefs((p) => ({ ...p, follows: v }))}
            />
            <NotificationRow
              label="Invitation accepted"
              description="Someone accepts my invitation"
              checked={activityPrefs.invitationAccepted}
              onChange={(v) => setActivityPrefs((p) => ({ ...p, invitationAccepted: v }))}
            />
            <NotificationRow
              label="Likes"
              description="Someone likes one of my shots"
              checked={activityPrefs.shotLikes}
              onChange={(v) => setActivityPrefs((p) => ({ ...p, shotLikes: v }))}
              isLast
            />
          </NotificationSection>
        </div>

        {/* Weekly Newsletters */}
        <div className="flex flex-col gap-6">
          <NotificationSection
            title="Weekly Newsletters"
            allChecked={newsletterAllChecked}
            onToggleAll={toggleAllNewsletter}
          >
            <NotificationRow
              label="Education"
              description="Monday: design workshops and education resources for your career"
              checked={newsletterPrefs.education}
              onChange={(v) => setNewsletterPrefs({ education: v })}
              isLast
            />
          </NotificationSection>
        </div>

        <div className="flex justify-end">
          <Button type="submit" variant="dark">
            Save change
          </Button>
        </div>
      </form>
    </SettingsLayout>
  )
}
