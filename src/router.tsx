import { createBrowserRouter, redirect, Navigate, Outlet } from 'react-router'
import { Layout } from './components/layout/Layout'
import { useAuthStore } from './store/authStore'

// ─── Route guards ─────────────────────────────────────────────────────────────
//
// Проблема з loader(): React Router викликає loader() синхронно, ще до того як
// Zustand встигає відновити стан з localStorage (persist middleware асинхронний).
// При першому рендері useAuthStore.getState().accessToken завжди null →
// автентифікований юзер безпідставно редиректиться на /login.
//
// Рішення: перевірка стану у компонентах, де Zustand вже гідрований.

// Захищений маршрут — редиректить на /login якщо немає токена
const ProtectedRoute = () => {
  const token = useAuthStore((state) => state.accessToken)
  if (!token) return <Navigate to="/login" replace />
  return <Outlet />
}

// Гостьовий маршрут — редиректить на /profile якщо юзер вже залогінений
const GuestRoute = () => {
  const token = useAuthStore((state) => state.accessToken)
  if (token) return <Navigate to="/profile" replace />
  return <Outlet />
}

// ─── Router ───────────────────────────────────────────────────────────────────

export const router = createBrowserRouter([
  // Root redirect
  {
    path: '/',
    loader: () => {
      // Тут loader безпечний: ми лише читаємо синхронний стан для першого
      // переходу. Якщо store ще не гідрований — юзер потрапить на /login,
      // де GuestRoute перевірить стан повторно після гідрації.
      const token = useAuthStore.getState().accessToken
      throw redirect(token ? '/profile' : '/login')
    },
  },

  // Guest-only routes
  {
    Component: GuestRoute,
    children: [
      {
        path: '/login',
        lazy: () => import('./pages/auth/LoginPage').then((m) => ({ Component: m.LoginPage })),
      },
      {
        path: '/register',
        lazy: () => import('./pages/auth/RegisterPage').then((m) => ({ Component: m.RegisterPage })),
      },
    ],
  },

  // Protected routes
  {
    Component: ProtectedRoute,
    children: [
      {
        Component: Layout,
        children: [
          {
            path: '/profile',
            lazy: () =>
              import('./pages/ProfilePage').then((m) => ({ Component: m.ProfilePage })),
          },
        ],
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