import { api } from './index'
import type { RawSearchResponse } from '../types'

export interface SearchParams {
  q: string
  type?: 'shots' | 'users'
  limit?: number
  offset?: number
}

// Search API: GET /api/search/?q=
// apps/shots/views.py: SearchView повертає `shots`/`users` простими масивами
// (не пагіновано) — нормалізація до SearchResponse відбувається у useSearchQuery.
export const searchApi = {
  search: (params: SearchParams) => api.get<RawSearchResponse>('/search/', { params }),
}
