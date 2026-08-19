import { useState } from 'react'
import { Users } from 'lucide-react'
import { SettingsLayout } from '../../components/settings/SettingsLayout'
import { Button } from '../../components/ui/Button'
import { Alert } from '../../components/ui/Alert'
import { useT } from '../../i18n'

export const TeamsPage = () => {
  const t = useT()
  const [notice, setNotice] = useState('')

  const handleCreate = () => {
    setNotice(t.settings.teams.notImplemented)
  }

  return (
    <SettingsLayout title={t.settings.teams.title}>
      <div className="flex flex-col items-center text-center gap-6 py-10">
        {notice && <Alert type="info" message={notice} className="w-full" />}

        <div className="w-full max-w-md aspect-6/5 rounded-[20px] bg-surface-alt flex items-center justify-center">
          <div className="w-28 h-28 rounded-full bg-primary/10 flex items-center justify-center">
            <Users className="w-14 h-14 text-primary" strokeWidth={1.5} />
          </div>
        </div>

        <div className="flex flex-col gap-2 max-w-sm">
          <h2 className="text-xl font-semibold text-black">{t.settings.teams.createTeam}</h2>
          <p className="text-sm text-black/60">
            {t.settings.teams.description}
          </p>
        </div>

        <Button type="button" variant="dark" onClick={handleCreate}>
          {t.common.create}
        </Button>
      </div>
    </SettingsLayout>
  )
}
