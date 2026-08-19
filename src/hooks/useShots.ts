import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router'
import { shotsApi, type GetShotsParams } from '../api/shots'
import type { PaginatedResponse, Shot } from '../types'
import { patchShotEverywhere } from '../utils/shotCache'

//useFeedQuery 
export const useFeedQuery = (
  filters: Omit<GetShotsParams, 'limit' | 'offset'>,
  options?: { enabled?: boolean }
) => {
  return useInfiniteQuery({
    queryKey: ['feed', filters],
    queryFn: async ({ pageParam }) => {
      const response = await shotsApi.getShots({
        offset: pageParam,
        limit: 12,
        ...filters,
      })
      return response.data
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage: PaginatedResponse<Shot>) => {
      if (!lastPage.next) return undefined
      try {
        const url = new URL(lastPage.next)
        const offset = url.searchParams.get('offset')
        return offset ? parseInt(offset, 10) : undefined
      } catch {
        return undefined
      }
    },
    enabled: options?.enabled ?? true,
  })
}

// usePopularShotsQuery — окремий запит для колажу популярних робіт на
// головній сторінці (hero-блок)
export const usePopularShotsQuery = (limit = 24) => {
  return useQuery({
    queryKey: ['popularShots', limit],
    queryFn: async () => {
      const response = await shotsApi.getShots({ limit, offset: 0 })
      return response.data
    },
    staleTime: 60_000,
  })
}

// usePopularTagsQuery — топ-N тегів за частотою вживання серед останніх
// робіт
export const usePopularTagsQuery = (topN = 6, sampleSize = 100) => {
  return useQuery({
    queryKey: ['popularTags', topN, sampleSize],
    queryFn: async () => {
      const response = await shotsApi.getShots({ limit: sampleSize, offset: 0 })
      const counts = new Map<string, number>()
      response.data.results.forEach((shot) =>
        shot.tags.forEach((tag) => counts.set(tag, (counts.get(tag) ?? 0) + 1))
      )
      return Array.from(counts.entries())
        .sort(([tagA, countA], [tagB, countB]) => countB - countA || tagA.localeCompare(tagB))
        .slice(0, topN)
        .map(([tag]) => tag)
    },
    staleTime: 5 * 60_000,
  })
}

// useAuthorTagsQuery — унікальні теги, реально вжиті на роботах конкретного
// автора.
export const useAuthorTagsQuery = (authorId: number | undefined) => {
  return useQuery({
    queryKey: ['authorTags', authorId],
    queryFn: async () => {
      const response = await shotsApi.getShots({ author: authorId, limit: 100, offset: 0 })
      const tags = new Set<string>()
      response.data.results.forEach((shot) => shot.tags.forEach((tag) => tags.add(tag)))
      return Array.from(tags).sort((a, b) => a.localeCompare(b))
    },
    enabled: !!authorId,
    staleTime: 60_000,
  })
}

//useShotQuery
export const useShotQuery = (id: string | number) => {
  return useQuery({
    queryKey: ['shot', id],
    queryFn: async () => {
      const response = await shotsApi.getShot(id)
      return response.data
    },
    enabled: !!id,
  })
}

//useCreateShotMutation
export const useCreateShotMutation = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: shotsApi.createShot,
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ['feed'] })
      queryClient.invalidateQueries({ queryKey: ['popularShots'] })
      queryClient.invalidateQueries({ queryKey: ['popularTags'] })
      queryClient.invalidateQueries({ queryKey: ['authorTags'] })
      navigate(`/shot/${data.id}`)
    },
  })
}

//useDeleteShotMutation
export const useDeleteShotMutation = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (id: string | number) => shotsApi.deleteShot(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feed'] })
      navigate('/feed')
    },
  })
}

// useLikeShotMutation / useSaveShotMutation
export const useLikeShotMutation = (id: string | number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => shotsApi.likeShot(id),
    // currentShot — стан лічильника ДО кліку (передається з компонента,
    // напр. likeMutation.mutate({ is_liked: shot.is_liked, likes_count: shot.likes_count })).
    onSuccess: ({ data }, currentShot?: Pick<Shot, 'is_liked' | 'likes_count'>) => {
      const likes_count = currentShot
        ? Math.max(0, currentShot.likes_count + (data.liked ? 1 : -1))
        : data.likes_count
      patchShotEverywhere(queryClient, id, { is_liked: data.liked, likes_count })
      // /api/users/:username/liked/ на бекенді не кешується, тож фоновий
      // рефетч тут безпечний і підчищає крайові випадки з пагінацією.
      queryClient.invalidateQueries({ queryKey: ['likedShots'] })
    },
  })
}

export const useSaveShotMutation = (id: string | number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => shotsApi.saveShot(id),
    onSuccess: ({ data }) => {
      patchShotEverywhere(queryClient, id, { is_saved: data.saved })
    },
  })
}