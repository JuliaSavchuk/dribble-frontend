import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { commentsApi } from '../api/comments'
import { normalizePaginated } from '../utils/pagination'

//коментарі повертаються сторінками по 15 штук.
export const COMMENTS_PAGE_SIZE = 15

export const useCommentsQuery = (shotId: string | number, page: number = 1) => {
  return useQuery({
    queryKey: ['comments', shotId, page],
    queryFn: async () => {
      const response = await commentsApi.getComments(shotId, {
        limit: COMMENTS_PAGE_SIZE,
        offset: (page - 1) * COMMENTS_PAGE_SIZE,
      })
      // BUG-3 (TESTING_PLAN.md): бекенд наразі повертає простий масив
      // замість { count, results } — нормалізуємо, щоб ShotDetailPage.tsx
      // не падав на commentsData.results.length / commentsData.count.
      return normalizePaginated(response.data)
    },
    enabled: !!shotId,
    placeholderData: keepPreviousData,
  })
}

export const useAddCommentMutation = (shotId: string | number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (text: string) => commentsApi.addComment(shotId, text),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', shotId] })
      queryClient.invalidateQueries({ queryKey: ['shot', shotId] })
    },
  })
}

// Видалення власного коментаря
export const useDeleteCommentMutation = (shotId: string | number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (commentId: number) => commentsApi.deleteComment(shotId, commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', shotId] })
      queryClient.invalidateQueries({ queryKey: ['shot', shotId] })
    },
  })
}