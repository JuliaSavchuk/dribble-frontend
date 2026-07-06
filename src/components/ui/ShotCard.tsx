import { Link } from 'react-router'
import { Heart, Bookmark } from 'lucide-react'
import type { Shot } from '../../types'
import { useAuthStore } from '../../store/authStore'
import { useLikeShotMutation, useSaveShotMutation } from '../../hooks/useShots'
import { cn } from '../../utils/cn'

interface ShotCardProps {
  shot: Shot
}

export const ShotCard = ({ shot }: ShotCardProps) => {
  const isAuthed = useAuthStore((s) => !!s.accessToken)
  const likeMutation = useLikeShotMutation(shot.id)
  const saveMutation = useSaveShotMutation(shot.id)

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!isAuthed || likeMutation.isPending) return
    likeMutation.mutate()
  }

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!isAuthed || saveMutation.isPending) return
    saveMutation.mutate()
  }

  return (
    <div className="group relative flex flex-col gap-2 bg-surface-alt border border-border rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5">
      {/* Контейнер зображення та hover overlay */}
      <div className="relative aspect-[4/3] bg-surface overflow-hidden">
        <img
          src={shot.preview || shot.image}
          alt={shot.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <div className="flex justify-between items-center text-white">
            <Link to={`/shot/${shot.id}`} className="font-semibold truncate max-w-[70%] hover:underline">
              {shot.title}
            </Link>
            <div className="flex gap-2">
              <button
                type="button"
                title="Лайк"
                onClick={handleLike}
                disabled={!isAuthed}
                className={cn(
                  'w-8 h-8 rounded-full bg-surface-alt/80 border border-border/50 flex items-center justify-center transition-all cursor-pointer disabled:cursor-not-allowed',
                  shot.is_liked ? 'text-primary bg-white' : 'text-muted hover:text-primary hover:bg-white'
                )}
              >
                <Heart className="w-4 h-4" fill={shot.is_liked ? 'currentColor' : 'none'} />
              </button>
              <button
                type="button"
                title="Зберегти"
                onClick={handleSave}
                disabled={!isAuthed}
                className={cn(
                  'w-8 h-8 rounded-full bg-surface-alt/80 border border-border/50 flex items-center justify-center transition-all cursor-pointer disabled:cursor-not-allowed',
                  shot.is_saved ? 'text-white bg-white/30' : 'text-muted hover:text-white hover:bg-white/20'
                )}
              >
                <Bookmark className="w-4 h-4" fill={shot.is_saved ? 'currentColor' : 'none'} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Інформація про автора */}
      <div className="flex justify-between items-center px-3 py-2 text-xs">
        <Link to={`/shot/${shot.id}`} className="flex items-center gap-2 min-w-0">
          <img
            src={shot.author.avatar || 'https://via.placeholder.com/50'}
            alt={shot.author.username}
            className="w-5 h-5 rounded-full object-cover border border-border shrink-0"
          />
          <span className="font-medium text-white hover:text-primary transition-colors truncate max-w-[100px]">
            {shot.author.username}
          </span>
        </Link>
        <div className="flex items-center gap-3 text-muted shrink-0">
          <span className="flex items-center gap-1">
            <Heart className="w-3.5 h-3.5" fill={shot.is_liked ? 'currentColor' : 'none'} />
            {shot.likes_count}
          </span>
        </div>
      </div>
    </div>
  )
}
