import { useState } from 'react'
import { SettingsLayout } from '../../components/settings/SettingsLayout'
import { Toggle } from '../../components/ui/Toggle'
import { Button } from '../../components/ui/Button'
import { Alert } from '../../components/ui/Alert'
import { useT } from '../../i18n'

export const PrivacySecurityPage = () => {
  const t = useT()
  const [activityStatus, setActivityStatus] = useState(true)
  const [readReceipts, setReadReceipts] = useState(true)
  const [notice, setNotice] = useState('')

  const handleDeleteClick = () => {
    setNotice(t.settings.privacy.notImplemented)
  }

  return (
    <SettingsLayout title={t.settings.privacy.title}>
      <div className="flex flex-col gap-9">
        {notice && <Alert type="info" message={notice} />}

        <h2 className="text-xl font-semibold text-black">{t.settings.privacy.activityPrivacy}</h2>

        <div className="flex flex-col gap-6">
          <div className="flex items-start gap-4 pb-6 border-b border-black">
            <Toggle
              checked={activityStatus}
              onChange={setActivityStatus}
              label={t.settings.privacy.activityStatus}
            />
            <div className="flex flex-col gap-1">
              <span className="text-base text-black">{t.settings.privacy.activityStatus}</span>
              <span className="text-sm text-black">
                {t.settings.privacy.activityStatusDescription}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Toggle checked={readReceipts} onChange={setReadReceipts} label={t.settings.privacy.readReceipts} />
            <div className="flex flex-col gap-1">
              <span className="text-base text-black">{t.settings.privacy.readReceipts}</span>
              <span className="text-sm text-black">
                {t.settings.privacy.readReceiptsDescription}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-6 border-t border-black">
          <h2 className="text-xl font-semibold text-black">{t.settings.privacy.deleteAccount}</h2>
          <p className="text-base text-black max-w-166.5">
            {t.settings.privacy.deleteDescription}
          </p>
          <Button type="button" variant="danger" onClick={handleDeleteClick} className="w-fit">
            {t.settings.privacy.deleteButton}
          </Button>
        </div>
      </div>
    </SettingsLayout>
  )
}
