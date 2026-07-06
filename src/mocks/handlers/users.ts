import { http, HttpResponse } from 'msw'
import type { PublicProfile } from '../../types'

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api'

const mockPublicProfiles: Record<string, PublicProfile> = {
  '1': {
    id: 1,
    username: 'kyiv_creator',
    avatar:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80',
    bio: 'UI/UX Designer & Illustrator from Kyiv',
    website: 'https://portfolio.com',
    shots_count: 2,
    followers_count: 48,
    following_count: 23,
    is_following: false,
  },
  '2': {
    id: 2,
    username: 'lviv_designer',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80',
    bio: 'Creative Director & Brand Designer',
    website: 'https://lvivdesigner.com',
    shots_count: 1,
    followers_count: 102,
    following_count: 34,
    is_following: false,
  },
}

export const usersHandlers = [
  // GET /users/:id/ — публічний профіль
  http.get(`${BASE_URL}/users/:id/`, ({ params }) => {
    const id = params.id as string
    const profile = mockPublicProfiles[id]
    if (!profile) {
      return HttpResponse.json({ detail: 'Користувача не знайдено.' }, { status: 404 })
    }
    return HttpResponse.json(profile, { status: 200 })
  }),

  // POST /users/:id/follow/ — toggle підписки
  http.post(`${BASE_URL}/users/:id/follow/`, ({ params, request }) => {
    const authHeader = request.headers.get('Authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return HttpResponse.json({ detail: 'Облікові дані не надано.' }, { status: 401 })
    }
    const id = params.id as string
    const profile = mockPublicProfiles[id]
    if (!profile) {
      return HttpResponse.json({ detail: 'Користувача не знайдено.' }, { status: 404 })
    }
    profile.is_following = !profile.is_following
    profile.followers_count += profile.is_following ? 1 : -1
    return HttpResponse.json(
      { is_following: profile.is_following, followers_count: profile.followers_count },
      { status: 200 }
    )
  }),
]
