import { useQuery } from '@tanstack/react-query'
import { searchApi } from '../api/search'
import { normalizePaginated } from '../utils/pagination'
import type { SearchResponse } from '../types'

export const useSearchQuery = (q: string) => {
  return useQuery({
    queryKey: ['search', q],
    queryFn: async (): Promise<SearchResponse> => {
      const response = await searchApi.search({ q, limit: 20 })
      return {
        shots: normalizePaginated(response.data.shots),
        users: normalizePaginated(response.data.users),
      }
    },
    enabled: q.trim().length > 0,
  })
}
