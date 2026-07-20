import { NavLink } from 'react-router'
import { cn } from '../../utils/cn'
import { SETTINGS_NAV_ITEMS } from '../../constants/settingsNav'

// Бокова панель розділу Settings — використовується на кожній сторінці
// налаштувань, щоб не дублювати список пунктів меню в кожному файлі.
export const SettingsSidebar = () => {
  return (
    <nav className="flex flex-col gap-6 w-full md:w-57.5 shrink-0" aria-label="Settings">
      {SETTINGS_NAV_ITEMS.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            cn(
              'text-xl sm:text-2xl font-semibold leading-none transition-colors w-fit',
              isActive ? 'text-black' : 'text-black/38 hover:text-black/60'
            )
          }
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  )
}