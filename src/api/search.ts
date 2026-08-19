import { api } from './index'
import type { RawSearchResponse } from '../types'

export interface SearchParams {
  q: string
  type?: 'shots' | 'users'
  limit?: number
  offset?: number
}

export const searchApi = {
  search: (params: SearchParams) => api.get<RawSearchResponse>('/search/', { params }),
}
