import axios from 'axios'
import { useAuthStore } from '../store/authStore'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

//Request interceptor: attach token

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

//Response interceptor: handle 401 & token refresh

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as typeof error.config & { _retry?: boolean }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      const refresh = useAuthStore.getState().refreshToken

      if (refresh) {
        try {
          // Refresh without triggering the interceptor again
          const { data } = await axios.post(
            `${api.defaults.baseURL}/auth/token/refresh/`,
            { refresh }
          )
          useAuthStore.getState().setAuth(
            useAuthStore.getState().user!,
            data.access,
            refresh
          )
          originalRequest.headers.Authorization = `Bearer ${data.access}`
          return api(originalRequest)
        } catch (refreshError) {
          useAuthStore.getState().logout()
          window.location.href = '/login'
          return Promise.reject(refreshError)
        }
      } else {
        useAuthStore.getState().logout()
        window.location.href = '/login'
      }
    }

    return Promise.reject(error)
  }
)

//Typed API helpers

export const authApi = {
  register: (data: { email: string; username: string; password: string; password2: string }) =>
    api.post('/auth/register/', data),

  login: (data: { email: string; password: string }) =>
    api.post('/auth/login/', data),

  refreshToken: (refresh: string) =>
    api.post('/auth/token/refresh/', { refresh }),

  googleLogin: (token: string) =>
    api.post('/auth/google/', { token }),

  getProfile: () =>
    api.get('/auth/profile/'),

  updateProfile: (data: FormData | Record<string, unknown>) =>
    api.patch('/auth/profile/', data, {
      headers: data instanceof FormData
        ? { 'Content-Type': 'multipart/form-data' }
        : { 'Content-Type': 'application/json' },
    }),
}
