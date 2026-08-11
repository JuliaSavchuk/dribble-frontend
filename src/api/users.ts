import { api } from './index'
import type { FollowUser, PaginatedResponse, PublicProfile, Shot } from '../types'

// Social/Users API
export const usersApi = {
  getPublicProfile: (username: string) => api.get<PublicProfile>(`/users/${username}/`),

  // Бекенд повертає поле `following` (а не `is_following`). Виправлено невідповідність.
  follow: (username: string) =>
    api.post<{ following: boolean; followers_count: number }>(`/users/${username}/follow/`),

  // Вподобані роботи користувача. Мають повертатись пагіновано, але наразі
  // бекенд (apps/users/views.py: LikedShotsView) не має pagination_class і
  // повертає простий масив (BUG-8 з TESTING_PLAN.md) — тип відображає обидва
  // варіанти, нормалізація відбувається у хуку useLikedShotsQuery.
  getLikedShots: (username: string, params?: { limit?: number; offset?: number }) =>
    api.get<PaginatedResponse<Shot> | Shot[]>(`/users/${username}/liked/`, { params }),

  // Списки підписників / підписок
  getFollowers: (username: string) => api.get<FollowUser[]>(`/users/${username}/followers/`),

  getFollowing: (username: string) => api.get<FollowUser[]>(`/users/${username}/following/`),
}
