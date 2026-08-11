import { useState } from 'react'
import { Users } from 'lucide-react'
import { SettingsLayout } from '../../components/settings/SettingsLayout'
import { Button } from '../../components/ui/Button'
import { Alert } from '../../components/ui/Alert'

// Немає бекенд-підтримки команд (моделей/ендпоінтів) — "Create" повідомляє
// про це чесно. Замість фірмової ілюстрації з макету (файл недоступний
// у коді) використано нейтральну ілюстрацію-заглушку тими самими
// кольорами застосунку, щоб не порушувати візуальну єдність сторінки.
export const TeamsPage = () => {
  const [notice, setNotice] = useState('')

  const handleCreate = () => {
    setNotice('Робота з командами ще не реалізована на бекенді — цю дію поки не збережено.')
  }

  return (
    <SettingsLayout title="Teams">
      <div className="flex flex-col items-center text-center gap-6 py-10">
        {notice && <Alert type="info" message={notice} className="w-full" />}

        <div className="w-full max-w-md aspect-6/5 rounded-[20px] bg-surface-alt flex items-center justify-center">
          <div className="w-28 h-28 rounded-full bg-primary/10 flex items-center justify-center">
            <Users className="w-14 h-14 text-primary" strokeWidth={1.5} />
          </div>
        </div>

        <div className="flex flex-col gap-2 max-w-sm">
          <h2 className="text-xl font-semibold text-black">Create a Team</h2>
          <p className="text-sm text-black/60">
            Collaborate with teammates, manage shared projects, and hire together on Voxel.
          </p>
        </div>

        <Button type="button" variant="dark" onClick={handleCreate}>
          Create
        </Button>
      </div>
    </SettingsLayout>
  )
}
