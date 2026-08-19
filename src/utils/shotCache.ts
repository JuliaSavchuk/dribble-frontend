import type { InfiniteData, QueryClient } from '@tanstack/react-query'
import type { PaginatedResponse, SearchResponse, Shot } from '../types'

type ShotPatch = Partial<Pick<Shot, 'is_liked' | 'is_saved' | 'likes_count'>>

const sameShot = (shot: Shot, id: string | number) => String(shot.id) === String(id)

const patchPage = <T extends { results: Shot[] }>(page: T, id: string | number, patch: ShotPatch): T => {
  let changed = false
  const results = page.results.map((shot) => {
    if (!sameShot(shot, id)) return shot
    changed = true
    return { ...shot, ...patch }
  })
  return changed ? { ...page, results } : page
}

const removeFromPage = (page: PaginatedResponse<Shot>, id: string | number): PaginatedResponse<Shot> => {
  const results = page.results.filter((shot) => !sameShot(shot, id))
  if (results.length === page.results.length) return page
  return { ...page, results, count: Math.max(0, page.count - 1) }
}

export const patchShotEverywhere = (
  queryClient: QueryClient,
  id: string | number,
  patch: ShotPatch
) => {
  queryClient.setQueryData<Shot | undefined>(['shot', id], (prev) =>
    prev ? { ...prev, ...patch } : prev
  )

  queryClient.setQueriesData<PaginatedResponse<Shot>>({ queryKey: ['popularShots'] }, (data) => {
    if (!data) return data
    return patchPage(data, id, patch)
  })

  queryClient.setQueriesData<InfiniteData<PaginatedResponse<Shot>>>(
    { queryKey: ['feed'] },
    (data) => {
      if (!data) return data
      return { ...data, pages: data.pages.map((page) => patchPage(page, id, patch)) }
    }
  )

  queryClient.setQueriesData<SearchResponse>({ queryKey: ['search'] }, (data) => {
    if (!data) return data
    return { ...data, shots: patchPage(data.shots, id, patch) }
  })

  queryClient.setQueriesData<InfiniteData<PaginatedResponse<Shot>>>(
    { queryKey: ['likedShots'] },
    (data) => {
      if (!data) return data
      const pages = data.pages.map((page) =>
        patch.is_liked === false ? removeFromPage(page, id) : patchPage(page, id, patch)
      )
      return { ...data, pages }
    }
  )
}