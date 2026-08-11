import { useState } from 'react'
import { SettingsLayout } from '../../components/settings/SettingsLayout'
import { Button } from '../../components/ui/Button'
import { Alert } from '../../components/ui/Alert'

// Так само, як і Company, ця сторінка не має бекенд-підтримки (немає
// платіжного провайдера чи ендпоінта на сервері) — "Connect" чесно
// повідомляє про це, а не імітує підключення платіжного методу.
export const PayoutsPage = () => {
  const [notice, setNotice] = useState('')

  const handleConnect = () => {
    setNotice(
      'Підключення способу виплат ще не реалізоване на бекенді — ця дія поки не має ефекту.'
    )
  }

  return (
    <SettingsLayout title="Payouts">
      <div className="flex flex-col gap-6 max-w-88.75">
        {notice && <Alert type="info" message={notice} />}

        <h2 className="text-base font-semibold text-black">Connect a payout method</h2>
        <p className="text-base text-black -mt-4">
          Connect to enable sending proposal and securely accept payments on Voxel
        </p>

        <Button type="button" variant="dark" onClick={handleConnect} className="w-fit">
          Connect
        </Button>

        <button
          type="button"
          onClick={handleConnect}
          className="text-sm text-black underline underline-offset-2 hover:opacity-70 transition-opacity cursor-pointer w-fit"
        >
          Learn more
        </button>
      </div>
    </SettingsLayout>
  )
}
