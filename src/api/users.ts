import { api } from './index'
import type { FollowUser, PaginatedResponse, PublicProfile, Shot } from '../types'

// Social/Users API
export const usersApi = {
  getPublicProfile: (username: string) => api.get<PublicProfile>(`/users/${username}/`),

  // Бекенд повертає поле `following` (а не `is_following`, як у PublicProfile). Виправлено невідповідність.
  follow: (username: string) =>
    api.post<{ following: boolean; followers_count: number }>(`/users/${username}/follow/`),

  // Вподобані роботи користувача
  getLikedShots: (username: string, params?: { limit?: number; offset?: number }) =>
    api.get<PaginatedResponse<Shot>>(`/users/${username}/liked/`, { params }),

  // Списки підписників / підписок
  getFollowers: (username: string) => api.get<FollowUser[]>(`/users/${username}/followers/`),

  getFollowing: (username: string) => api.get<FollowUser[]>(`/users/${username}/following/`),
}
