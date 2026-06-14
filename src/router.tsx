import { createBrowserRouter, redirect } from 'react-router'
import { Layout } from './components/layout/Layout'
import { useAuthStore } from './store/authStore'

// Guards

const authLoader = () => {
  const token = useAuthStore.getState().accessToken
  if (!token) throw redirect('/login')
  return null
}

const guestLoader = () => {
  const token = useAuthStore.getState().accessToken
  if (token) throw redirect('/profile')
  return null
}

// Router

export const router = createBrowserRouter([
  // Root redirect
  {
    path: '/',
    loader: () => {
      const token = useAuthStore.getState().accessToken
      throw redirect(token ? '/profile' : '/login')
    },
  },

  // Guest-only routes
  {
    path: '/login',
    loader: guestLoader,
    lazy: () => import('./pages/auth/LoginPage').then((m) => ({ Component: m.LoginPage })),
  },
  {
    path: '/register',
    loader: guestLoader,
    lazy: () => import('./pages/auth/RegisterPage').then((m) => ({ Component: m.RegisterPage })),
  },

  // Protected routes
  {
    Component: Layout,
    children: [
      {
        path: '/profile',
        loader: authLoader,
        lazy: () =>
          import('./pages/ProfilePage').then((m) => ({ Component: m.ProfilePage })),
      },
    ],
  },

  // 404
  {
    path: '*',
    lazy: () =>
      import('./pages/NotFoundPage').then((m) => ({ Component: m.NotFoundPage })),
  },
])