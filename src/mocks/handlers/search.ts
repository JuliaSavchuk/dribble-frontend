import { http, HttpResponse } from 'msw'
import { mockShots } from './shots'

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api'

const mockUsersDirectory = [
  {
    id: 1,
    username: 'kyiv_creator',
    avatar:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80',
    bio: 'UI/UX Designer & Illustrator from Kyiv',
  },
  {
    id: 2,
    username: 'lviv_designer',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80',
    bio: 'Creative Director & Brand Designer',
  },
]

export const searchHandlers = [
  // GET /search/?q=&type=&limit=&offset=
  http.get(`${BASE_URL}/search/`, ({ request }) => {
    const url = new URL(request.url)
    const q = (url.searchParams.get('q') || '').toLowerCase().trim()
    const type = url.searchParams.get('type')

    const shotsResults = q
      ? mockShots.filter(
          (s) => s.title.toLowerCase().includes(q) || s.tags.some((t) => t.includes(q))
        )
      : []

    const usersResults = q
      ? mockUsersDirectory.filter(
          (u) => u.username.toLowerCase().includes(q) || u.bio.toLowerCase().includes(q)
        )
      : []

    const response: Record<string, unknown> = {}

    if (!type || type === 'shots') {
      response.shots = { count: shotsResults.length, results: shotsResults }
    }
    if (!type || type === 'users') {
      response.users = { count: usersResults.length, results: usersResults }
    }

    return HttpResponse.json(response, { status: 200 })
  }),
]
