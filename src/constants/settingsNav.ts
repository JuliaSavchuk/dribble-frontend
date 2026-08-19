import { useT } from '../i18n'

export interface SettingsNavItem {
  label: string
  path: string
}

export const useSettingsNavItems = (): SettingsNavItem[] => {
  const t = useT()

  return [
    { label: t.settingsNav.general, path: '/settings/general' },
    { label: t.settingsNav.editProfile, path: '/settings/profile' },
    { label: t.settingsNav.password, path: '/settings/password' },
    { label: t.settingsNav.socialProfiles, path: '/settings/social-profiles' },
    { label: t.settingsNav.company, path: '/settings/company' },
    { label: t.settingsNav.payouts, path: '/settings/payouts' },
    { label: t.settingsNav.teams, path: '/settings/teams' },
    { label: t.settingsNav.notifications, path: '/settings/notifications' },
    { label: t.settingsNav.privacySecurity, path: '/settings/privacy-security' },
  ]
}
