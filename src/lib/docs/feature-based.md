

```
/dev/null/final.txt#L1-35
frontend/
├── app/                          ← только маршруты
│   ├── (auth)/login/page.tsx
│   ├── (dashboard)/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── profile/page.tsx
│   ├── api/[...path]/route.ts    ← proxy
│   ├── layout.tsx
│   └── globals.css
│
├── features/                     ← вся бизнес-логика
│   ├── auth/
│   │   ├── api.ts                ← authApi.sendOtp/register/verifyOtp/logout
│   │   ├── types.ts              ← User, UserRole, все интерфейсы
│   │   └── components/
│   │       ├── auth-form.tsx
│   │       ├── phone-step.tsx
│   │       ├── role-step.tsx
│   │       └── otp-step.tsx
│   └── user/
│       ├── api.ts                ← getMe() для Server Components
│       ├── hooks/
│       │   └── use-current-user.ts
│       └── components/
│           ├── dashboard-nav.tsx
│           └── logout-button.tsx
│
├── components/ui/                ← только shared UI-примитивы
├── lib/                          ← инфраструктура (api, server-api, utils)
├── hooks/use-toast.ts            ← UI-хук, не привязан к фиче
└── proxy.ts
```

Ключевые улучшения:
- `app/` — только маршруты, ноль бизнес-логики
- Все API-вызовы сгруппированы в `features/*/api.ts` — легко тестировать и находить
- `features/auth/types.ts` — единый источник правды для типов
- `app/(dashboard)/layout.tsx` стал на 15 строк короче — просто вызывает `getMe()