import { http, HttpResponse } from 'msw'

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api'

// ─── In-memory mock database ──────────────────────────────────────────────────

let mockUser = {
  id: 1,
  email: 'designer@example.com',
  username: 'kyiv_creator',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80',
  bio: 'UI/UX Designer & Illustrator from Kyiv',
  website: 'https://portfolio.com',
  twitter: 'https://twitter.com/kyiv_creator',
  instagram: 'https://instagram.com/kyiv_creator',
  linkedin: 'https://linkedin.com/in/kyiv_creator',
  shots_count: 12,
  followers_count: 48,
  following_count: 23,
}

// Track registered users for mock validation
const registeredUsers: Array<{ email: string; username: string; password: string }> = [
  { email: 'designer@example.com', username: 'kyiv_creator', password: 'PassWord123!' },
]

export const authHandlers = [
  //POST /auth/register/
  http.post(`${BASE_URL}/auth/register/`, async ({ request }) => {
    const body = (await request.json()) as {
      email?: string
      username?: string
      password?: string
      password2?: string
    }

    if (!body.email || !body.username || !body.password || !body.password2) {
      return HttpResponse.json(
        { detail: 'Не всі обов\'язкові поля заповнено.' },
        { status: 400 }
      )
    }

    if (body.password !== body.password2) {
      return HttpResponse.json(
        { password: ['Паролі не співпадають.'] },
        { status: 400 }
      )
    }

    const emailExists = registeredUsers.some((u) => u.email === body.email)
    if (emailExists) {
      return HttpResponse.json(
        { email: ['Користувач з таким email вже існує.'] },
        { status: 400 }
      )
    }

    const usernameExists = registeredUsers.some((u) => u.username === body.username)
    if (usernameExists) {
      return HttpResponse.json(
        { username: ['Користувач з таким іменем вже існує.'] },
        { status: 400 }
      )
    }

    registeredUsers.push({
      email: body.email,
      username: body.username,
      password: body.password,
    })

    // Update mockUser for the first registered user
    mockUser.email = body.email
    mockUser.username = body.username

    return HttpResponse.json(
      { id: mockUser.id, email: body.email, username: body.username },
      { status: 201 }
    )
  }),

  //POST /auth/login/
  http.post(`${BASE_URL}/auth/login/`, async ({ request }) => {
    const body = (await request.json()) as { email?: string; password?: string }

    const user = registeredUsers.find(
      (u) => u.email === body.email && u.password === body.password
    )

    if (!user) {
      return HttpResponse.json(
        { detail: 'Невірні облікові дані.' },
        { status: 401 }
      )
    }

    return HttpResponse.json(
      {
        access: 'mock-access-token-jwt-12345',
        refresh: 'mock-refresh-token-jwt-67890',
      },
      { status: 200 }
    )
  }),

  //POST /auth/token/refresh/
  http.post(`${BASE_URL}/auth/token/refresh/`, async ({ request }) => {
    const body = (await request.json()) as { refresh?: string }

    if (!body.refresh) {
      return HttpResponse.json(
        { detail: 'Refresh token не надано.' },
        { status: 400 }
      )
    }

    return HttpResponse.json(
      { access: `new-mock-access-token-jwt-${Math.random().toString(36).substring(2, 9)}` },
      { status: 200 }
    )
  }),

  //POST /auth/google/
  http.post(`${BASE_URL}/auth/google/`, async ({ request }) => {
    const body = (await request.json()) as { token?: string }

    if (!body.token) {
      return HttpResponse.json(
        { detail: 'Token is required' },
        { status: 400 }
      )
    }

    // Simulate Google OAuth: always succeeds with mock token
    const isNew = !registeredUsers.some((u) => u.email === 'google@example.com')
    if (isNew) {
      registeredUsers.push({
        email: 'google@example.com',
        username: 'google_user',
        password: '',
      })
      mockUser.email = 'google@example.com'
      mockUser.username = 'google_user'
      mockUser.avatar = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80'
    }

    return HttpResponse.json(
      {
        access: 'google-mock-access-token',
        refresh: 'google-mock-refresh-token',
        created: isNew,
      },
      { status: 200 }
    )
  }),

  //GET /auth/profile/
  http.get(`${BASE_URL}/auth/profile/`, ({ request }) => {
    const authHeader = request.headers.get('Authorization')

    if (!authHeader?.startsWith('Bearer ')) {
      return HttpResponse.json(
        { detail: 'Облікові дані не надано.' },
        { status: 401 }
      )
    }

    return HttpResponse.json(mockUser, { status: 200 })
  }),

  //PATCH /auth/profile/
  http.patch(`${BASE_URL}/auth/profile/`, async ({ request }) => {
    const authHeader = request.headers.get('Authorization')

    if (!authHeader?.startsWith('Bearer ')) {
      return HttpResponse.json(
        { detail: 'Облікові дані не надано.' },
        { status: 401 }
      )
    }

    const contentType = request.headers.get('Content-Type') || ''

    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData()

      const avatarFile = formData.get('avatar') as File | null
      if (avatarFile && avatarFile.size > 0) {
        mockUser.avatar = URL.createObjectURL(avatarFile)
      }

      for (const [key, value] of formData.entries()) {
        if (key !== 'avatar' && key in mockUser) {
          ;(mockUser as Record<string, unknown>)[key] = value as string
        }
      }
    } else {
      const body = (await request.json()) as Partial<typeof mockUser>
      mockUser = { ...mockUser, ...body }
    }

    return HttpResponse.json(mockUser, { status: 200 })
  }),
]
