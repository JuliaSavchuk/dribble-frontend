import type { ReactNode } from 'react'
import { useAuthStore } from '../../store/authStore'
import { useProfile } from '../../hooks/useAuth'
import { Avatar } from '../ui/Avatar'
import { SettingsSidebar } from './SettingsSidebar'

interface SettingsLayoutProps {
  /** Назва поточного розділу, показується у заголовку як "Ім'я / Розділ" (напр. "Yurii Borysiuk / General") */
  title: string
  children: ReactNode
}

// Спільна "рамка" для всіх сторінок розділу Settings: заголовок з аватаром + боковою панеллю.
export const SettingsLayout = ({ title, children }: SettingsLayoutProps) => {
  const user = useAuthStore((s) => s.user)
  const displayName = user?.username ?? ''

  // Аналогічно до Navbar.tsx: user.avatar з persisted-стору може містити
  // прострочений підписаний URL з Cloudflare R2. useProfile() дає свіжіше
  // значення (оновлюється щонайбільше раз на 5 хв).
  const { data: profile } = useProfile()
  const avatarSrc = profile?.avatar ?? user?.avatar

  return (
    <div className="max-w-[1920px] mx-auto px-6 sm:px-16 lg:px-36 pt-14 sm:pt-20 pb-20">
      {/* Заголовок */}
      <div className="flex items-center gap-6 mb-12 sm:mb-16">
        <Avatar
          src={avatarSrc}
          username={user?.username ?? '?'}
          className="w-16 h-16 sm:w-23.5 sm:h-23.5 border border-border"
          textClassName="text-2xl sm:text-3xl"
        />
        <div>
          <h1 className="text-xl sm:text-2xl font-medium text-black">
            {displayName} / {title}
          </h1>
          <p className="text-sm text-black/38 mt-1">Set up your Voxel presence and hiring needs</p>
        </div>
      </div>

      {/* Боковая панель + контент */}
      <div className="flex flex-col md:flex-row gap-10 lg:gap-24">
        <SettingsSidebar />
        <div className="flex-1 min-w-0 max-w-156.75">{children}</div>
      </div>
    </div>
  )
}