import { useLocation } from 'react-router'
import { Construction } from 'lucide-react'
import { SettingsLayout } from '../../components/settings/SettingsLayout'
import { useSettingsNavItems } from '../../constants/settingsNav'
import { useT } from '../../i18n'

export const ComingSoonPage = () => {
  const t = useT()
  const { pathname } = useLocation()
  const items = useSettingsNavItems()
  const current = items.find((item) => item.path === pathname)
  const title = current?.label ?? t.nav.settings

  return (
    <SettingsLayout title={title}>
      <div className="flex flex-col items-center text-center gap-4 py-20 rounded-[20px] border border-dashed border-black/20">
        <Construction className="w-10 h-10 text-black/38" />
        <div>
          <p className="text-lg font-semibold text-black">{t.comingSoon.sectionInDevelopment(title)}</p>
          <p className="text-sm text-black/38 mt-1 max-w-sm">{t.comingSoon.notCreatedYet}</p>
        </div>
      </div>
    </SettingsLayout>
  )
}