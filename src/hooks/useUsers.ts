import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { usersApi } from '../api/users'
import type { PublicProfile } from '../types'

export const usePublicProfileQuery = (id: string | number) => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: async () => {
      const response = await usersApi.getPublicProfile(id)
      return response.data
    },
    enabled: !!id,
  })
}

export const useFollowMutation = (id: string | number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => usersApi.follow(id),
    onSuccess: ({ data }) => {
      queryClient.setQueryData<PublicProfile | undefined>(['user', id], (prev) =>
        prev ? { ...prev, is_following: data.is_following, followers_count: data.followers_count } : prev
      )
    },
  })
}
