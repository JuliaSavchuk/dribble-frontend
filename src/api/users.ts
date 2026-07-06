import { api } from './index'
import type { PublicProfile } from '../types'

// Social/Users API (Фаза 0)
export const usersApi = {
  getPublicProfile: (id: string | number) => api.get<PublicProfile>(`/users/${id}/`),

  follow: (id: string | number) =>
    api.post<{ is_following: boolean; followers_count: number }>(`/users/${id}/follow/`),
}
