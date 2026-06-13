import { Link, useNavigate } from 'react-router'
import { useAuthStore } from '../../store/authStore'
import { Button } from '../ui/Button'

//Dribbble-style logo SVG
const DribbbleLogo = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-8 h-8"
  >
    <circle cx="12" cy="12" r="10" fill="#EA4C89" />
    <path
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
      fill="#EA4C89"
    />
    <path
      d="M12 2a10 10 0 0 1 6.56 2.44c-1.07 1.56-2.49 2.98-4.21 4.16A19.47 19.47 0 0 0 12 4.03 10.05 10.05 0 0 1 12 2z"
      fill="#C73872"
      opacity="0.6"
    />
    <ellipse cx="12" cy="12" rx="10" ry="10" stroke="#fff" strokeWidth="0" />
    <path
      d="M7 7.5C8.5 9 10 10 12 10.5c1.5.4 3.2.4 5.5-.2A9.97 9.97 0 0 0 12 2C9.9 2 8 2.7 6.5 3.9 6.8 5 7 6.2 7 7.5z"
      fill="rgba(255,255,255,0.18)"
    />
    <path
      d="M11.5 13.5c-1.6-.5-3.3-1.4-4.9-2.8A9.94 9.94 0 0 0 2.02 12.5C2.3 16.4 4.8 19.7 8.2 21.2c.3-2.5 1.5-5.3 3.3-7.7z"
      fill="rgba(255,255,255,0.18)"
    />
    <path
      d="M13 14.2c1.6.4 3.3.4 5.2-.1.5-1.7.7-3.4.5-5.1-2.1.6-3.9.6-5.5.2-.1.9-.1 1.8-.1 2.7 0 .8 0 1.6-.1 2.3z"
      fill="rgba(255,255,255,0.18)"
    />
  </svg>
)

export const Navbar = () => {
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[#27273F] bg-[#0F0F1A]/95 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link
          to={user ? '/profile' : '/login'}
          className="flex items-center gap-2.5 group"
        >
          <DribbbleLogo />
          <span className="font-extrabold text-lg text-white tracking-tight group-hover:text-[#EA4C89] transition-colors duration-200">
            Dribbble
          </span>
        </Link>

        {/* Nav actions */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link to="/profile">
                <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full hover:bg-[#16162a] transition-colors duration-200">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.username}
                      className="w-8 h-8 rounded-full object-cover border-2 border-[#27273F] hover:border-[#EA4C89] transition-colors"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-[#EA4C89]/20 border-2 border-[#EA4C89]/30 flex items-center justify-center">
                      <span className="text-xs font-bold text-[#EA4C89]">
                        {user.username.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  <span className="text-sm font-medium text-white hidden sm:block">
                    {user.username}
                  </span>
                </div>
              </Link>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                Вийти
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Вхід
                </Button>
              </Link>
              <Link to="/register">
                <Button size="sm">Реєстрація</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
