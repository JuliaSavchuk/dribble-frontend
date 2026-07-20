import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router'
import { ChevronDown, Search, Globe, Menu, X, Settings } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import { Button } from '../ui/Button'
import { Avatar } from '../ui/Avatar'
import logo from '../../assets/voxel-logo.png'

const NAV_ITEMS = [
  { label: 'Categories', to: '/feed' },
  { label: 'Community', to: '/feed' },
  { label: 'Find a job', to: '/feed' },
]

export const Navbar = () => {
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    setIsMenuOpen(false)
    navigate('/')
  }

  const handleSearch = (e: FormEvent) => {
    e.preventDefault()
    if (search.trim()) {
      setIsMenuOpen(false)
      navigate(`/search?q=${encodeURIComponent(search.trim())}`)
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border font-app">
      <div className="max-w-[110rem] mx-auto px-6 sm:px-10 h-20 flex items-center gap-6">
        {/* Логотип */}
        <Link to="/" className="flex items-center gap-1.5 shrink-0" onClick={() => setIsMenuOpen(false)}>
          <img src={logo} alt="" className="h-9 w-9" draggable={false} />
          <span className="font-script text-2xl text-ink -mt-1">Voxel</span>
        </Link>

        {/* Категорії / спільнота / робота */}
        <nav className="hidden lg:flex items-center gap-1 shrink-0">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="flex items-center gap-1 px-3 py-2 rounded-full text-sm font-semibold text-ink hover:bg-surface-alt transition-colors"
            >
              {item.label}
              <ChevronDown className="w-3.5 h-3.5" />
            </Link>
          ))}
        </nav>

        {/* Пошук */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink" />
            <input
              type="text"
              placeholder="Find a style"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-full border-2 border-ink bg-white pl-11 pr-4 py-2.5 text-sm text-ink placeholder:text-[#3E3E3E] focus:outline-none"
            />
          </div>
        </form>

        {/* Дії справа */}
        <div className="flex items-center gap-3 ml-auto shrink-0">
          {user ? (
            <>
              <Link
                to="/upload"
                className="hidden sm:block px-3 py-1.5 rounded-full text-sm font-semibold text-ink hover:bg-surface-alt transition-colors"
              >
                Опублікувати
              </Link>
              <Link to={`/users/${user.username}`}>
                <div className="flex items-center gap-2.5 px-2 py-1 rounded-full hover:bg-surface-alt transition-colors">
                  <Avatar src={user.avatar} username={user.username} className="w-9 h-9" textClassName="text-xs" />
                  <span className="hidden sm:block text-sm font-semibold text-ink">{user.username}</span>
                </div>
              </Link>

              <Link
                to="/settings/general"
                aria-label="Налаштування"
                className="hidden sm:flex w-9 h-9 rounded-full items-center justify-center text-ink hover:bg-surface-alt transition-colors"
              >
                <Settings className="w-5 h-5" />
              </Link>

              <Button variant="ghost" size="sm" onClick={handleLogout} className="hidden sm:inline-flex">
                Вийти
              </Button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hidden sm:block text-sm font-semibold text-ink hover:text-primary transition-colors px-2"
              >
                Log in
              </Link>
              <Link to="/register" className="hidden sm:block">
                <Button size="sm">Sign up</Button>
              </Link>
            </>
          )}

          <button
            type="button"
            aria-label="Мова"
            className="hidden sm:flex w-9 h-9 rounded-full items-center justify-center text-ink hover:bg-surface-alt transition-colors"
          >
            <Globe className="w-5 h-5" />
          </button>

          {/* Бургер-кнопка — видима нижче lg (там, де приховані категорії/пошук/дії) */}
          <button
            type="button"
            aria-label={isMenuOpen ? 'Закрити меню' : 'Відкрити меню'}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((v) => !v)}
            className="lg:hidden w-9 h-9 flex items-center justify-center rounded-full text-ink hover:bg-surface-alt transition-colors btn-pop cursor-pointer"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Мобільна шторка (drawer) */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-border bg-white px-6 sm:px-10 py-4 flex flex-col gap-4">
          {/* Пошук — дублюється тут тільки для екранів менших за md, де його немає в шапці */}
          <form onSubmit={handleSearch} className="md:hidden flex">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink" />
              <input
                type="text"
                placeholder="Find a style"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-full border-2 border-ink bg-white pl-11 pr-4 py-2.5 text-sm text-ink placeholder:text-[#3E3E3E] focus:outline-none"
              />
            </div>
          </form>

          {/* Категорії / спільнота / робота */}
          <nav className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-1 px-3 py-2.5 rounded-xl text-sm font-semibold text-ink hover:bg-surface-alt transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Дії — дублюються тут тільки для екранів менших за sm, де в шапці їх не видно */}
          <div className="sm:hidden flex flex-col gap-2 pt-2 border-t border-border">
            {user ? (
              <>
                <Link
                  to="/upload"
                  onClick={() => setIsMenuOpen(false)}
                  className="px-3 py-2.5 rounded-xl text-sm font-semibold text-ink hover:bg-surface-alt transition-colors"
                >
                  Опублікувати
                </Link>
                <Link
                  to="/settings/general"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold text-ink hover:bg-surface-alt transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  Налаштування
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="text-left px-3 py-2.5 rounded-xl text-sm font-semibold text-ink hover:bg-surface-alt transition-colors cursor-pointer"
                >
                  Вийти
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="px-3 py-2.5 rounded-xl text-sm font-semibold text-ink hover:bg-surface-alt transition-colors"
                >
                  Log in
                </Link>
                <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                  <Button size="sm" className="w-full">
                    Sign up
                  </Button>
                </Link>
              </>
            )}
            <button
              type="button"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold text-ink hover:bg-surface-alt transition-colors cursor-pointer"
            >
              <Globe className="w-4 h-4" />
              Мова
            </button>
          </div>
        </div>
      )}
    </header>
  )
}