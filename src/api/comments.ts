import { api } from './index'
import type { Comment, PaginatedResponse } from '../types'

export interface GetCommentsParams {
  limit?: number
  offset?: number
}

// Comments API GET/POST /api/shots/:id/comments/
// Коментарі мають повертатись пагіновано, по 15 на сторінку. Наразі бекенд
// (apps/shots/views.py) повертає простий масив без пагінації (BUG-3 з
// TESTING_PLAN.md) — тип відповіді відображає обидва можливі варіанти,
// нормалізація відбувається у хуку useCommentsQuery.
export const commentsApi = {
  getComments: (shotId: string | number, params?: GetCommentsParams) =>
    api.get<PaginatedResponse<Comment> | Comment[]>(`/shots/${shotId}/comments/`, { params }),

  addComment: (shotId: string | number, text: string) =>
    api.post<Comment>(`/shots/${shotId}/comments/`, { text }),

  // Видалення власного коментаря - DELETE /shots/:id/comments/:commentId/
  deleteComment: (shotId: string | number, commentId: number) =>
    api.delete(`/shots/${shotId}/comments/${commentId}/`),
}