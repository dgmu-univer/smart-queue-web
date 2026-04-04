Что создано

### Структура проекта (`frontend/`)

**Маршруты (`app/`)**

- `(auth)/login/page.tsx` — страница входа/регистрации
- `(dashboard)/layout.tsx` — защищённый layout с Server-side проверкой сессии через `GET /user/me`
- `(dashboard)/page.tsx` — главная дашборда с карточками статистики
- `(dashboard)/profile/page.tsx` — страница профиля пользователя
- `layout.tsx` — Root layout с `QueryProvider` и `Toaster`

**Компоненты (`components/`)**

- `auth/auth-form.tsx` — оркестратор трёхшаговой формы (phone → role → otp)
- `auth/phone-step.tsx` — ввод телефона с маской `+7 (___) ___-__-__`
- `auth/role-step.tsx` — выбор роли через карточки (Поставщик/Магазин)
- `auth/otp-step.tsx` — 4 отдельных input с автофокусом, вставкой из буфера, таймером 60 сек
- `dashboard/dashboard-nav.tsx` — хедер с логотипом, бейджем роли, кнопкой выхода
- `providers/query-provider.tsx` — TanStack Query + DevTools
- `ui/` — Button, Input, Label, Card, Badge, Toast/Toaster (shadcn-стиль)

**Утилиты**

- `lib/api.ts` — единый fetch-клиент с `credentials: 'include'` и типизированным `ApiError`
- `lib/utils.ts` — `cn()` хелпер (clsx + tailwind-merge)
- `types/auth.ts` — все TypeScript типы из промпта
- `hooks/use-current-user.ts` — хук через TanStack Query с умным `retry` (не retry при 401)
- `hooks/use-toast.ts` — система уведомлений

**Middleware (`middleware.ts`)**

- Проверяет `GET /user/me` на каждый запрос к защищённым маршрутам
- Перенаправляет незавторизованных на `/login?from=<путь>`
- Перенаправляет авторизованных с `/login` на главную
