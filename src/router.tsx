import { createBrowserRouter, redirect } from 'react-router'
import { Layout } from './components/layout/Layout'
import { useAuthStore } from './store/authStore'

//Guards

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

//Router

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
    lazy: () => import('./pages/auth/RegisterEmailPage').then((m) => ({ Component: m.RegisterEmailPage })),
  },
  {
    path: '/register/confirm',
    loader: guestLoader,
    lazy: () => import('./pages/auth/ConfirmCodePage').then((m) => ({ Component: m.ConfirmCodePage })),
  },
  {
    path: '/register/password',
    loader: guestLoader,
    lazy: () => import('./pages/auth/CreatePasswordPage').then((m) => ({ Component: m.CreatePasswordPage })),
  },
  {
    path: '/register/profile',
    loader: guestLoader,
    lazy: () => import('./pages/auth/ProfileSetupPage').then((m) => ({ Component: m.ProfileSetupPage })),
  },
  {
    path: '/recovery',
    loader: guestLoader,
    lazy: () => import('./pages/auth/RecoveryPage').then((m) => ({ Component: m.RecoveryPage })),
  },
  {
    path: '/recovery/new-password',
    loader: guestLoader,
    lazy: () => import('./pages/auth/NewPasswordPage').then((m) => ({ Component: m.NewPasswordPage })),
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
