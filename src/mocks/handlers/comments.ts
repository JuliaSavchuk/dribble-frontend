import { http, HttpResponse } from 'msw'
import type { Comment } from '../../types'

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api'

// In-memory коментарі, згруповані за id Shot
const mockComments: Record<string, Comment[]> = {
  '103': [
    {
      id: 1,
      text: 'Дуже круте рішення, особливо кольорова палітра!',
      author: {
        id: 2,
        username: 'lviv_designer',
        avatar:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80',
      },
      created_at: '2026-06-08T11:00:00Z',
    },
  ],
}

let nextCommentId = 1000

export const commentsHandlers = [
  // GET /shots/:id/comments/
  http.get(`${BASE_URL}/shots/:id/comments/`, ({ params }) => {
    const id = params.id as string
    const results = mockComments[id] || []
    return HttpResponse.json(
      { count: results.length, next: null, previous: null, results },
      { status: 200 }
    )
  }),

  // POST /shots/:id/comments/
  http.post(`${BASE_URL}/shots/:id/comments/`, async ({ params, request }) => {
    const authHeader = request.headers.get('Authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return HttpResponse.json({ detail: 'Облікові дані не надано.' }, { status: 401 })
    }

    const id = params.id as string
    const body = (await request.json()) as { text?: string }

    if (!body.text?.trim()) {
      return HttpResponse.json({ text: ['Текст коментаря обовʼязковий.'] }, { status: 400 })
    }

    const newComment: Comment = {
      id: nextCommentId++,
      text: body.text.trim(),
      author: {
        id: 1,
        username: 'kyiv_creator',
        avatar:
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80',
      },
      created_at: new Date().toISOString(),
    }

    if (!mockComments[id]) mockComments[id] = []
    mockComments[id].push(newComment)

    return HttpResponse.json(newComment, { status: 201 })
  }),
]
