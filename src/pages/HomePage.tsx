import { Link } from 'react-router'
import { Clapperboard, Briefcase, UserRound, SlidersHorizontal } from 'lucide-react'
import { useAuthStore } from '../store/authStore'
import { useFeedQuery } from '../hooks/useShots'
import { Button } from '../components/ui/Button'
import { ShotCard } from '../components/ui/ShotCard'
import { CollageTile } from '../components/ui/CollageTile'

const POPULAR_TAGS = ['branding', 'web design', 'ui kit', 'wireframes', 'typography', 'icon sets', '3d design']

// Декоративний колаж у хіро-блоці (маркетингові зображення, не з бекенду)
const COLLAGE: { image: string; label: string; count: string; className: string; dark?: boolean }[] = [
  {
    image: 'https://images.unsplash.com/photo-1596466596120-2d8173f3e19c?auto=format&fit=crop&w=400&q=80',
    label: 'Tattoo',
    count: '3k',
    className: 'col-span-1 row-span-1 aspect-square',
  },
  {
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=400&q=80',
    label: 'Poster',
    count: '4k',
    className: 'col-span-1 row-span-1 aspect-square',
    dark: false,
  },
  {
    image: 'https://images.unsplash.com/photo-1587049633312-d628ae50a8ae?auto=format&fit=crop&w=500&q=80',
    label: 'Advert',
    count: '9k',
    className: 'col-span-2 row-span-1 aspect-[2/1]',
  },
  {
    image: 'https://images.unsplash.com/photo-1547394765-185e1e68f34e?auto=format&fit=crop&w=400&q=80',
    label: 'Deck',
    count: '5k',
    className: 'col-span-1 row-span-2 aspect-[1/2]',
  },
  {
    image: 'https://images.unsplash.com/photo-1509966756634-9c23dd6e6815?auto=format&fit=crop&w=500&q=80',
    label: '3d Designe',
    count: '2k',
    className: 'col-span-2 row-span-1 aspect-[2/1]',
  },
  {
    image: 'https://images.unsplash.com/photo-1611926653458-09294b3142bf?auto=format&fit=crop&w=400&q=80',
    label: 'Graphics',
    count: '25k',
    className: 'col-span-1 row-span-1 aspect-square',
    dark: false,
  },
  {
    image: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?auto=format&fit=crop&w=400&q=80',
    label: 'Ai',
    count: '30k',
    className: 'col-span-1 row-span-1 aspect-square',
  },
]

export const HomePage = () => {
  const user = useAuthStore((s) => s.user)

  const { data, isLoading, isError } = useFeedQuery({})
  const shots = data?.pages.flatMap((page) => page.results).slice(0, 16) ?? []

  return (
    <div className="bg-white">
      {/* ─── Hero ─────────────────────────────────────────────────────────── */}
      <section className="max-w-[1760px] mx-auto px-6 sm:px-10 pt-16 pb-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="font-app font-bold text-5xl sm:text-6xl leading-[1.05] text-ink">
            Showcase.
            <br />
            Inspire.
            <br />
            <span className="text-primary">Ger Discovered</span>
          </h1>

          <p className="mt-6 max-w-lg text-lg text-ink/55 font-medium">
            Voxel is the leading platform to share your work, connect with other creatives and grow
            your career
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-red-600 to-fuchsia-800">
              <Clapperboard className="w-4 h-4" />
              Shorts
            </span>
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold text-ink border border-ink">
              <Briefcase className="w-4 h-4" />
              Services
            </span>
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold text-ink border border-ink">
              <UserRound className="w-4 h-4" />
              Designer
            </span>
          </div>
        </div>

        {/* Колаж */}
        <div className="grid grid-cols-4 gap-4 auto-rows-[110px] sm:auto-rows-[130px]">
          {COLLAGE.map((tile) => (
            <CollageTile key={tile.label} {...tile} />
          ))}
        </div>
      </section>

      {/* ─── Популярні теги ───────────────────────────────────────────────── */}
      <section className="max-w-[1760px] mx-auto px-6 sm:px-10 py-6 flex items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-2xl font-semibold text-ink shrink-0">Popular:</span>
          {POPULAR_TAGS.map((tag) => (
            <Link
              key={tag}
              to={`/feed?tags=${encodeURIComponent(tag)}`}
              className="px-4 py-1.5 rounded-full text-sm font-semibold text-ink border border-border hover:border-ink transition-colors"
            >
              {tag}
            </Link>
          ))}
        </div>
        <button
          type="button"
          aria-label="Фільтри"
          className="hidden sm:flex w-10 h-10 rounded-full items-center justify-center border border-border text-ink hover:bg-surface-alt transition-colors shrink-0"
        >
          <SlidersHorizontal className="w-5 h-5" />
        </button>
      </section>

      {/* ─── Стрічка популярних робіт ─────────────────────────────────────── */}
      <section className="max-w-[1760px] mx-auto px-6 sm:px-10 pb-16">
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-[4/3] rounded-2xl bg-surface-alt animate-pulse border border-border" />
            ))}
          </div>
        )}

        {isError && (
          <div className="text-center py-12 text-red-500 font-semibold">
            Не вдалося завантажити стрічку робіт. Будь ласка, спробуйте пізніше.
          </div>
        )}

        {!isLoading && !isError && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {shots.map((shot) => (
              <ShotCard key={shot.id} shot={shot} />
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-14 flex justify-center">
          {user ? (
            <Link to="/feed">
              <Button size="lg">Переглянути всю стрічку</Button>
            </Link>
          ) : (
            <Link to="/register">
              <Button variant="secondary" size="lg" className="border-primary text-primary hover:bg-primary/5">
                Sign up to continue
              </Button>
            </Link>
          )}
        </div>
      </section>
    </div>
  )
}
