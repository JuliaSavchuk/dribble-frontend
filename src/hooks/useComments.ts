import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { commentsApi } from '../api/comments'

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
      return response.data
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