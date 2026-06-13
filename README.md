# Dribbble Clone — Frontend (Фаза 1)

React + TypeScript + Tailwind CSS v4 + Zustand + TanStack Query v5 + React Router v7

## Стек

| Технологія | Версія |
|---|---|
| React | ^19 |
| TypeScript | ~5.8 |
| Tailwind CSS | ^4.3 |
| React Router | ^7.17 |
| TanStack Query | ^5 |
| Zustand | ^5 |
| Axios | ^1.9 |
| MSW | ^2 |

## Швидкий старт

```bash
# 1. Встановити залежності
npm install

# 2. Ініціалізувати MSW service worker у папці public/
npx msw init public/ --save

# 3. Запустити сервер розробки
npm run dev
```

Відкрийте http://localhost:5173

## Демо-акаунт

```
Email:    designer@example.com
Password: PassWord123!
```

## Конфігурація (.env)

```env
VITE_API_BASE_URL=http://localhost:8000/api
VITE_USE_MOCKS=true   # true = MSW mock, false = реальний бекенд
```

## Структура проєкту

```
src/
├── api/
│   └── index.ts          # Axios клієнт з interceptors
├── components/
│   ├── layout/
│   │   ├── Layout.tsx    # Основний layout з Navbar
│   │   └── Navbar.tsx    # Навігаційна панель
│   └── ui/
│       ├── Alert.tsx     # Компонент сповіщень
│       ├── Button.tsx    # Кнопка (primary/secondary/ghost/danger)
│       ├── Input.tsx     # Поле вводу з label та error
│       └── Spinner.tsx   # Індикатор завантаження
├── hooks/
│   └── useAuth.ts        # useLogin, useRegister, useProfile, useUpdateProfile
├── mocks/
│   ├── browser.ts        # MSW worker setup
│   └── handlers/
│       └── auth.ts       # Хендлери авторизації
├── pages/
│   ├── LoginPage.tsx     # Сторінка входу
│   ├── RegisterPage.tsx  # Сторінка реєстрації
│   ├── ProfilePage.tsx   # Профіль користувача
│   └── NotFoundPage.tsx  # 404 сторінка
├── store/
│   └── authStore.ts      # Zustand store з persist
├── types/
│   └── index.ts          # TypeScript типи
├── utils/
│   └── cn.ts             # Утиліта для класів Tailwind
├── main.tsx              # Точка входу
├── router.tsx            # React Router v7
└── index.css             # Tailwind v4 + теми
```

## Маршрути

| Шлях | Опис | Доступ |
|---|---|---|
| `/` | Редирект на `/login` або `/profile` | Публічний |
| `/login` | Сторінка входу | Тільки гості |
| `/register` | Сторінка реєстрації | Тільки гості |
| `/profile` | Профіль користувача | Тільки авторизовані |

## Перемикання на реальний бекенд

Змініть `.env`:
```env
VITE_USE_MOCKS=false
VITE_API_BASE_URL=http://localhost:8000/api
```

## Команди

```bash
npm run dev      # Сервер розробки
npm run build    # Production build
npm run preview  # Перегляд production build
npm run lint     # ESLint перевірка
```
