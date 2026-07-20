import { api } from './index'
import type { Comment, PaginatedResponse } from '../types'

export interface GetCommentsParams {
  limit?: number
  offset?: number
}

// Comments API GET/POST /api/shots/:id/comments/
// Коментарі повертаються пагіновано, по 15 на сторінку.
export const commentsApi = {
  getComments: (shotId: string | number, params?: GetCommentsParams) =>
    api.get<PaginatedResponse<Comment>>(`/shots/${shotId}/comments/`, { params }),

  addComment: (shotId: string | number, text: string) =>
    api.post<Comment>(`/shots/${shotId}/comments/`, { text }),

  // Видалення власного коментаря - DELETE /shots/:id/comments/:commentId/
  deleteComment: (shotId: string | number, commentId: number) =>
    api.delete(`/shots/${shotId}/comments/${commentId}/`),
}