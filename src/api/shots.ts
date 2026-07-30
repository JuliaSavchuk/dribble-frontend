import { api } from './index'
import type { Shot, PaginatedResponse } from '../types'

export interface GetShotsParams {
  limit?: number
  offset?: number
  search?: string
  tags?: string
  author?: number | string
}

// Ендпоінти `GET/POST /api/shots/`, `GET/PATCH/DELETE /api/shots/:id/`
export const shotsApi = {
  getShots: (params: GetShotsParams) =>
    api.get<PaginatedResponse<Shot>>('/shots/', { params }),

  getShot: (id: string | number) => api.get<Shot>(`/shots/${id}/`),

  createShot: (formData: FormData) => api.post<Shot>('/shots/', formData),

  updateShot: (id: string | number, data: Partial<Pick<Shot, 'title' | 'description'>>) =>
    api.patch<Shot>(`/shots/${id}/`, data),

  deleteShot: (id: string | number) => api.delete(`/shots/${id}/`),

  // Social API
  // Бекенд повертає поля `liked` / `saved` (а не `is_liked` / `is_saved`) Виправлено невідповідність.
  likeShot: (id: string | number) =>
    api.post<{ liked: boolean; likes_count: number }>(`/shots/${id}/like/`),

  saveShot: (id: string | number) =>
    api.post<{ saved: boolean }>(`/shots/${id}/save/`),
}