import { useParams, Link } from 'react-router'
import { Globe, UserPlus, UserCheck } from 'lucide-react'
import { usePublicProfileQuery, useFollowMutation } from '../hooks/useUsers'
import { useFeedQuery } from '../hooks/useShots'
import { useAuthStore } from '../store/authStore'
import { Button } from '../components/ui/Button'
import { ShotCard } from '../components/ui/ShotCard'
import { Spinner } from '../components/ui/Spinner'

export const UserProfilePage = () => {
  const { id } = useParams<{ id: string }>()
  const currentUser = useAuthStore((s) => s.user)
  const isAuthed = useAuthStore((s) => !!s.accessToken)

  const { data: profile, isLoading, isError } = usePublicProfileQuery(id!)
  const followMutation = useFollowMutation(id!)

  const { data: shotsData } = useFeedQuery({ author: id })
  const shots = shotsData?.pages.flatMap((page) => page.results) ?? []

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    )
  }

  if (isError || !profile) {
    return (
      <div className="text-center py-24 text-red-500 font-semibold">
        Користувача не знайдено.
      </div>
    )
  }

  const isOwnProfile = currentUser?.id === profile.id

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Шапка профілю */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-10">
        <img
          src={profile.avatar || 'https://via.placeholder.com/150'}
          alt={profile.username}
          className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg"
        />

        <div className="flex-1 text-center sm:text-left">
          <h1 className="text-2xl font-extrabold text-ink">{profile.username}</h1>
          {profile.bio && <p className="text-muted mt-1 text-sm max-w-md">{profile.bio}</p>}
          {profile.website && (
            <a
              href={profile.website}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline mt-2"
            >
              <Globe className="w-3.5 h-3.5" />
              {profile.website.replace(/^https?:\/\//, '')}
            </a>
          )}

          <div className="flex justify-center sm:justify-start gap-6 mt-4 text-sm">
            <span>
              <b className="text-ink">{profile.shots_count}</b>{' '}
              <span className="text-muted">робіт</span>
            </span>
            <span>
              <b className="text-ink">{profile.followers_count}</b>{' '}
              <span className="text-muted">підписників</span>
            </span>
            <span>
              <b className="text-ink">{profile.following_count}</b>{' '}
              <span className="text-muted">підписок</span>
            </span>
          </div>
        </div>

        {!isOwnProfile && isAuthed && (
          <Button
            variant={profile.is_following ? 'secondary' : 'primary'}
            onClick={() => followMutation.mutate()}
            isLoading={followMutation.isPending}
          >
            {profile.is_following ? (
              <>
                <UserCheck className="w-4 h-4" /> Ви підписані
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4" /> Підписатись
              </>
            )}
          </Button>
        )}

        {isOwnProfile && (
          <Link to="/profile">
            <Button variant="secondary">Редагувати профіль</Button>
          </Link>
        )}
      </div>

      {/* Роботи користувача */}
      <h2 className="text-lg font-bold text-ink mb-4">Роботи</h2>
      {shots.length === 0 ? (
        <p className="text-muted text-sm">Користувач ще не опублікував жодної роботи.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {shots.map((shot) => (
            <ShotCard key={shot.id} shot={shot} />
          ))}
        </div>
      )}
    </div>
  )
}
