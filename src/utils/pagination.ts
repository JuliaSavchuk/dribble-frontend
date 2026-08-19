import type { PaginatedResponse } from '../types'

export function normalizePaginated<T>(
  data: PaginatedResponse<T> | T[] | undefined | null
): PaginatedResponse<T> {
  if (Array.isArray(data)) {
    return { count: data.length, next: null, previous: null, results: data }
  }
  if (data && Array.isArray(data.results)) {
    return data
  }
  return { count: 0, next: null, previous: null, results: [] }
}
