import { useState } from 'react'
import { SettingsLayout } from '../../components/settings/SettingsLayout'
import { Button } from '../../components/ui/Button'
import { Alert } from '../../components/ui/Alert'
import { useT } from '../../i18n'

export const PayoutsPage = () => {
  const t = useT()
  const [notice, setNotice] = useState('')

  const handleConnect = () => {
    setNotice(t.settings.payouts.notImplemented)
  }

  return (
    <SettingsLayout title={t.settings.payouts.title}>
      <div className="flex flex-col gap-6 max-w-88.75">
        {notice && <Alert type="info" message={notice} />}

        <h2 className="text-base font-semibold text-black">{t.settings.payouts.connectMethod}</h2>
        <p className="text-base text-black -mt-4">
          {t.settings.payouts.connectDescription}
        </p>

        <Button type="button" variant="dark" onClick={handleConnect} className="w-fit">
          {t.common.connect}
        </Button>

        <button
          type="button"
          onClick={handleConnect}
          className="text-sm text-black underline underline-offset-2 hover:opacity-70 transition-opacity cursor-pointer w-fit"
        >
          {t.common.learnMore}
        </button>
      </div>
    </SettingsLayout>
  )
}
