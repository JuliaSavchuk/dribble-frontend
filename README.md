# Voxel — Dribbble Clone (Frontend)

Фронтенд вебзастосунку **Voxel** — клона Dribbble з реальним REST API бекенду.  
Застосунок реалізований на React + TypeScript, використовує TanStack Query для роботи з серверним станом, Zustand для клієнтського стану та Axios для API-запитів.

> **Важливо:** основний режим роботи застосунку — **реальний бекенд**. Mock Service Worker залишений як опційний інструмент для локальної розробки та не використовується у звичайному режимі.

## Стек технологій

| Технологія | Версія |
|---|---|
| React | ^19.2.6 |
| TypeScript | ~6.0.2 |
| Vite | ^8.0.12 |
| Tailwind CSS | 4.3 |
| React Router | ^7.17.0 |
| TanStack Query | ^5.101.0 |
| Zustand | ^5.0.14 |
| Axios | ^1.17.0 |
| Lucide React | ^1.23.0 |
| MSW | ^2.14.6 (опційно) |

## Основні можливості

### Авторизація та акаунт

- реєстрація та вхід через email + password;
- авторизація через Google API;
- JWT access/refresh tokens;
- автоматичне оновлення access token після `401`;
- захищені маршрути та маршрути тільки для неавторизованих користувачів;
- отримання та редагування профілю;
- завантаження аватара через `multipart/form-data`;
- відновлення пароля;
- зміна пароля;
- налаштування профілю, соціальних мереж, компанії, виплат, команд, сповіщень та privacy/security.

### Роботи (Shots)

- стрічка робіт із пагінацією / infinite scroll;
- перегляд детальної сторінки роботи;
- завантаження нової роботи;
- редагування та видалення власної роботи;
- лайки;
- збереження робіт;
- фільтрація за тегами та автором;
- популярні роботи та популярні теги;
- профілі авторів і їхні роботи.

### Коментарі

- отримання коментарів із серверною пагінацією;
- додавання коментаря авторизованим користувачем;
- видалення власного коментаря;
- автоматичне оновлення пов'язаних даних після mutations.

Вкладені відповіді на коментарі наразі не реалізовані.

### Пошук

Глобальний пошук працює через реальний API та підтримує пошук:

- робіт (`shots`);
- користувачів (`users`);
- із пагінацією через `limit` / `offset`.

### UI та UX

- адаптивна верстка;
- lazy loading сторінок через React Router;
- loading/skeleton стани;
- обробка помилок через `ErrorBoundary`;
- 404 сторінка;
- українська та англійська локалізації;
- query-кешування та контроль актуальності даних через TanStack Query.

## Робота з API

Усі основні операції виконуються через Axios-клієнт з єдиною точкою конфігурації API.

Клієнт:

- автоматично додає `Authorization: Bearer <token>`;
- підтримує `multipart/form-data` для завантаження файлів;
- автоматично оновлює access token через refresh token;
- у разі невдалого refresh виконує logout та перенаправлення на `/login`.

Основні API-групи:

- `/auth/` — авторизація та профіль;
- `/shots/` — роботи;
- `/shots/:id/comments/` — коментарі;
- `/search/` — глобальний пошук;
- `/users/:username/` — публічні профілі та social-функції.

## Конфігурація

Створіть `.env` у корені проєкту:

```env
VITE_API_BASE_URL=http://localhost:8000/api
VITE_USE_MOCKS=false
```

`VITE_USE_MOCKS=false` — рекомендований режим для роботи з реальним бекендом.

MSW може бути увімкнений лише для локальної розробки:

```env
VITE_USE_MOCKS=true
```

У цьому режимі mock worker запускається тільки у development build.

## Швидкий старт

### 1. Встановити залежності

```bash
npm install
```

### 2. Налаштувати `.env`

```env
VITE_API_BASE_URL=http://localhost:8000/api
VITE_USE_MOCKS=false
```

### 3. Запустити frontend

```bash
npm run dev
```

Після запуску застосунок буде доступний за адресою:

```text
http://localhost:5173
```

Для роботи функціоналу з даними бекенд API має бути запущений та доступний за `VITE_API_BASE_URL`.

## Маршрути

### Публічні

| Маршрут | Призначення |
|---|---|
| `/` | Головна сторінка |
| `/feed` | Стрічка робіт |
| `/shot/:id` | Детальна сторінка роботи |
| `/users/:username` | Публічний профіль користувача |
| `/search` | Глобальний пошук |
| `/login` | Вхід |
| `/register` | Реєстрація |
| `/recovery` | Відновлення пароля |

### Захищені

| Маршрут | Призначення |
|---|---|
| `/profile` | Особистий профіль |
| `/upload` | Публікація роботи |
| `/settings/general` | Загальні налаштування |
| `/settings/profile` | Редагування профілю |
| `/settings/password` | Зміна пароля |
| `/settings/social-profiles` | Соціальні профілі |
| `/settings/company` | Налаштування компанії |
| `/settings/payouts` | Виплати |
| `/settings/teams` | Команди |
| `/settings/notifications` | Сповіщення |
| `/settings/privacy-security` | Privacy & Security |

`/settings` автоматично перенаправляє на `/settings/general`.

## Структура проєкту

```text
src/
├── api/                  # Axios client та typed API endpoints
│   ├── index.ts
│   ├── shots.ts
│   ├── comments.ts
│   ├── search.ts
│   └── users.ts
├── components/
│   ├── auth/             # Компоненти авторизації
│   ├── layout/           # Layout та навігація
│   ├── routing/          # Protected/Guest route guards
│   └── ui/               # Повторно використовувані UI-компоненти
├── constants/            # Константи
├── hooks/                # React Query hooks та mutations
├── i18n/                 # Українська та англійська локалізації
├── mocks/                # Опційні MSW handlers
├── pages/                # Сторінки застосунку
├── store/                # Zustand stores
├── types/                # TypeScript типи
├── utils/                # Утиліти та робота з кешем
├── App.tsx
├── main.tsx
├── router.tsx
└── index.css
```

## Стан та кешування

Для серверного стану використовується **TanStack Query**:

- кешування GET-запитів;
- pagination та infinite queries;
- loading/error/success стани;
- invalidation після mutations;
- оновлення пов'язаних кешів після like/save/comment/delete операцій.

Для глобального клієнтського стану використовується **Zustand**, зокрема для авторизації та локалі.

## Команди

```bash
npm run dev       # development server
npm run build     # TypeScript check + production build
npm run preview   # перегляд production build
npm run lint      # ESLint
```

## Production build

```bash
npm run build
npm run preview
```

Перед production build потрібно переконатися, що `VITE_API_BASE_URL` вказує на потрібний backend API та що mocks вимкнені:

```env
VITE_USE_MOCKS=false
```

## Архітектура взаємодії з бекендом

```text
React components
       ↓
React hooks
       ↓
TanStack Query
       ↓
Typed API layer
       ↓
Axios instance
       ↓
REST API
       ↓
Backend / Database
```

Компоненти не виконують HTTP-запити напряму: робота з API винесена в `src/api`, а керування серверним станом — у React Query hooks.

## Поточний статус

Проєкт працює як frontend-клієнт для **реального бекенду**. Авторизація, робота з профілем, shots, лайками, збереженнями, пошуком та коментарями інтегровані через API.

MSW збережений у проєкті як допоміжний dev-інструмент, але не є джерелом даних у стандартному режимі.

---

**Voxel — Dribbble clone frontend**
