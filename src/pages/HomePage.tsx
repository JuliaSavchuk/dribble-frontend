import { Link } from 'react-router'
import { Clapperboard, Briefcase, UserRound, SlidersHorizontal } from 'lucide-react'
import { useAuthStore } from '../store/authStore'
import { usePopularShotsQuery, usePopularTagsQuery } from '../hooks/useShots'
import { Button } from '../components/ui/Button'
import { ShotCard } from '../components/ui/ShotCard'
import { CollageTile } from '../components/ui/CollageTile'
import { formatCount } from '../utils/formatCount'
import { useT } from '../i18n'

// Позиції плиток колажу в сітці 5x2 (grid-cols-5 grid-rows-2) — суто
// декоративне розміщення за макетом, вміст плиток заповнюється реальними
// роботами нижче.
const COLLAGE_LAYOUT = [
  'col-span-1 row-span-1',
  'col-span-1 row-span-1',
  'col-span-2 row-span-1',
  'col-span-1 row-span-2',
  'col-span-2 row-span-1',
  'col-span-1 row-span-1',
  'col-span-1 row-span-1',
]

export const HomePage = () => {
  const t = useT()
  const user = useAuthStore((s) => s.user)

  const { data, isLoading, isError } = usePopularShotsQuery(24)
  const allShots = data?.results ?? []

  
  const { data: popularTags = [] } = usePopularTagsQuery()
  
  const likedShots = [...allShots].filter((s) => s.likes_count > 0).sort((a, b) => b.likes_count - a.likes_count)
  const unlikedShots = allShots.filter((s) => s.likes_count === 0)
  const collageShots = [...likedShots, ...unlikedShots].slice(0, COLLAGE_LAYOUT.length)
  const shots = allShots.slice(0, 16)

  return (
    <div className="bg-white">
      {/*Hero*/}
      <section className="max-w-[110rem] mx-auto px-6 sm:px-10 pt-16 pb-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="font-app font-bold text-5xl sm:text-6xl leading-[1.05] text-ink">
            {t.home.heroLine1}
            <br />
            {t.home.heroLine2}
            <br />
            <span className="text-primary">{t.home.heroLine3}</span>
          </h1>

          <p className="mt-6 max-w-lg text-lg text-ink/55 font-medium">{t.home.heroSubtitle}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold text-white bg-linear-to-r from-red-600 to-fuchsia-800">
              <Clapperboard className="w-4 h-4" />
              {t.home.badgeShorts}
            </span>
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold text-ink border border-ink">
              <Briefcase className="w-4 h-4" />
              {t.home.badgeServices}
            </span>
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold text-ink border border-ink">
              <UserRound className="w-4 h-4" />
              {t.home.badgeDesigner}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-5 grid-rows-2 gap-3 sm:gap-4 aspect-16/7 w-full">
          {isLoading &&
            COLLAGE_LAYOUT.map((className, i) => (
              <div key={i} className={`rounded-3xl bg-surface-alt animate-pulse ${className}`} />
            ))}

          {!isLoading &&
            collageShots.map((shot, i) => (
              <Link key={shot.id} to={`/shot/${shot.id}`} className={COLLAGE_LAYOUT[i]}>
                <CollageTile
                  image={shot.preview || shot.image}
                  label={shot.title}
                  count={formatCount(shot.likes_count)}
                  className="h-full w-full"
                />
              </Link>
            ))}
        </div>
      </section>

      {/*Популярні теги*/}
      <section className="max-w-[110rem] mx-auto px-6 sm:px-10 py-6 flex items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-2xl font-semibold text-ink shrink-0">{t.home.popular}</span>
          <Link
            to="/feed"
            className="px-4 py-1.5 rounded-full text-sm font-semibold text-ink border border-border hover:border-ink transition-colors"
          >
            all
          </Link>
          {popularTags.map((tag) => (
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
          aria-label={t.home.filters}
          className="hidden sm:flex w-10 h-10 rounded-full items-center justify-center border border-border text-ink hover:bg-surface-alt transition-colors shrink-0"
        >
          <SlidersHorizontal className="w-5 h-5" />
        </button>
      </section>

      {/*Стрічка популярних робіт*/}
      <section className="max-w-[110rem] mx-auto px-6 sm:px-10 pb-16">
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-4/3 rounded-2xl bg-surface-alt animate-pulse border border-border" />
            ))}
          </div>
        )}

        {isError && (
          <div className="text-center py-12 text-red-500 font-semibold">{t.home.feedLoadError}</div>
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
              <Button size="lg">{t.home.loadMore}</Button>
            </Link>
          ) : (
            <Link to="/register">
              <Button variant="secondary" size="lg" className="border-primary text-primary hover:bg-primary/5">
                {t.home.signUpToContinue}
              </Button>
            </Link>
          )}
        </div>
      </section>
    </div>
  )
}