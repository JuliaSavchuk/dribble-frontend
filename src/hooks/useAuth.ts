import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router'
import { authApi, api } from '../api'
import { useAuthStore } from '../store/authStore'
import type { User } from '../types'

// useLogin

export const useLogin = () => {
  const setAuth = useAuthStore((state) => state.setAuth)
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      const { data: tokens } = await authApi.login(credentials)

      // Fetch profile with the new token directly (not via store yet)
      const { data: profile } = await api.get('/auth/profile/', {
        headers: { Authorization: `Bearer ${tokens.access}` },
      })

      return { tokens, profile }
    },
    onSuccess: ({ tokens, profile }) => {
      setAuth(profile as User, tokens.access, tokens.refresh)
      navigate('/profile')
    },
  })
}

// useRegister
// Sends a single POST /api/auth/register/ request with all required fields.
// On success, redirects to /login so the user can sign in with their new credentials.

export const useRegister = () => {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async (data: {
      email: string
      username: string
      password: string
      password2: string
    }) => {
      const { data: result } = await authApi.register(data)
      return result
    },
    onSuccess: () => {
      navigate('/login')
    },
  })
}

// useGoogleLogin

export const useGoogleLogin = () => {
  const setAuth = useAuthStore((state) => state.setAuth)
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async (token: string) => {
      const { data: oauthData } = await authApi.googleLogin(token)

      // Fetch profile passing the new token directly — store not updated yet
      const { data: profile } = await api.get('/auth/profile/', {
        headers: { Authorization: `Bearer ${oauthData.access}` },
      })

      return { oauthData, profile }
    },
    onSuccess: ({ oauthData, profile }) => {
      setAuth(profile as User, oauthData.access, oauthData.refresh)
      navigate('/profile')
    },
  })
}

// useProfile

export const useProfile = () => {
  const user = useAuthStore((state) => state.user)

  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data } = await authApi.getProfile()
      return data as User
    },
    // Use store user as initial data to prevent flash
    initialData: user ?? undefined,
    staleTime: 1000 * 60 * 5,
  })
}

// useUpdateProfile

export const useUpdateProfile = () => {
  const updateUser = useAuthStore((state) => state.updateUser)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: {
      bio?: string
      website?: string
      twitter?: string
      instagram?: string
      linkedin?: string
      avatar?: File | null
    }) => {
      const { avatar, ...rest } = payload

      // Always use FormData so the server can handle both text and file
      const formData = new FormData()
      Object.entries(rest).forEach(([key, value]) => {
        if (value !== undefined) formData.append(key, value)
      })
      if (avatar) {
        formData.append('avatar', avatar)
      }

      const { data } = await authApi.updateProfile(formData)
      return data as User
    },
    onSuccess: (data) => {
      updateUser(data)
      queryClient.setQueryData(['profile'], data)
    },
  })
}