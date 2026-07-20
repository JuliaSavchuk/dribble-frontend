import { useLocation } from 'react-router'
import { Construction } from 'lucide-react'
import { SettingsLayout } from '../../components/settings/SettingsLayout'
import { SETTINGS_NAV_ITEMS } from '../../constants/settingsNav'

export const ComingSoonPage = () => {
  const { pathname } = useLocation()
  const current = SETTINGS_NAV_ITEMS.find((item) => item.path === pathname)
  const title = current?.label ?? 'Settings'

  return (
    <SettingsLayout title={title}>
      <div className="flex flex-col items-center text-center gap-4 py-20 rounded-[20px] border border-dashed border-black/20">
        <Construction className="w-10 h-10 text-black/38" />
        <div>
          <p className="text-lg font-semibold text-black">Розділ «{title}» у розробці</p>
          <p className="text-sm text-black/38 mt-1 max-w-sm">
            Ця сторінка ще не створена. Ми додамо її пізніше.
          </p>
        </div>
      </div>
    </SettingsLayout>
  )
}