import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '../../utils/cn'

interface PaginationProps {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
}

// Будує компактний список сторінок з "..." для великої кількості сторінок,
// напр. [1, '...', 4, 5, 6, '...', 12]
const buildPageList = (page: number, totalPages: number): (number | 'ellipsis')[] => {
  const delta = 1
  const pages: (number | 'ellipsis')[] = []

  const start = Math.max(2, page - delta)
  const end = Math.min(totalPages - 1, page + delta)

  pages.push(1)
  if (start > 2) pages.push('ellipsis')
  for (let i = start; i <= end; i++) pages.push(i)
  if (end < totalPages - 1) pages.push('ellipsis')
  if (totalPages > 1) pages.push(totalPages)

  return pages
}

export const Pagination = ({ page, totalPages, onPageChange, className }: PaginationProps) => {
  if (totalPages <= 1) return null

  const pages = buildPageList(page, totalPages)

  return (
    <nav
      aria-label="Пагінація коментарів"
      className={cn('flex items-center justify-center gap-1.5', className)}
    >
      <button
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        aria-label="Попередня сторінка"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-ink btn-pop transition-colors hover:bg-surface-alt disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {pages.map((p, i) =>
        p === 'ellipsis' ? (
          <span key={`ellipsis-${i}`} className="px-1.5 text-sm text-muted select-none">
            &hellip;
          </span>
        ) : (
          <button
            key={p}
            type="button"
            onClick={() => onPageChange(p)}
            aria-current={p === page ? 'page' : undefined}
            className={cn(
              'flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold btn-pop transition-colors',
              p === page ? 'bg-primary text-white' : 'text-ink hover:bg-surface-alt'
            )}
          >
            {p}
          </button>
        )
      )}

      <button
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        aria-label="Наступна сторінка"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-ink btn-pop transition-colors hover:bg-surface-alt disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  )
}