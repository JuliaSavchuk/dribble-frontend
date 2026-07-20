export interface SettingsNavItem {
  label: string
  path: string
}

// Єдине джерело правди для бокової панелі Settings
export const SETTINGS_NAV_ITEMS: SettingsNavItem[] = [
  { label: 'General', path: '/settings/general' },
  { label: 'Edit Profile', path: '/settings/profile' },
  { label: 'Password', path: '/settings/password' },
  { label: 'Social Profiles', path: '/settings/social-profiles' },
  { label: 'Company', path: '/settings/company' },
  { label: 'Payouts', path: '/settings/payouts' },
  { label: 'Teams', path: '/settings/teams' },
  { label: 'Notifications', path: '/settings/notifications' },
  { label: 'Privacy & Security', path: '/settings/privacy-security' },
]