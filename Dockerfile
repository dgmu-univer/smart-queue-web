# syntax=docker.io/docker/dockerfile:1

# ── Базовый образ ─────────────────────────────────────────────────────
FROM node:22-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app

# ── Зависимости ──────────────────────────────────────────────────────
FROM base AS deps
WORKDIR /app
RUN npm install -g pnpm@latest
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# ── Сборка ───────────────────────────────────────────────────────────
FROM base AS builder
WORKDIR /app
RUN npm install -g pnpm@latest
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

# t3-oss/env-nextjs валидирует эти переменные при сборке
ARG NEXT_PUBLIC_SITE_URL=https://x-opt.ru
ARG NEXT_PUBLIC_API_URL=https://x-opt.ru/api
ARG NEXT_PUBLIC_GITHUB_URL=https://github.com/optprice
ARG NEXT_PUBLIC_GA_ID=

ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_GITHUB_URL=$NEXT_PUBLIC_GITHUB_URL
ENV NEXT_PUBLIC_GA_ID=$NEXT_PUBLIC_GA_ID

RUN pnpm run build

# ── Продакшен ────────────────────────────────────────────────────────
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# t3-oss/env-nextjs также валидирует переменные при запуске
ARG NEXT_PUBLIC_SITE_URL=https://x-opt.ru
ARG NEXT_PUBLIC_API_URL=https://x-opt.ru/api
ARG NEXT_PUBLIC_GITHUB_URL=https://github.com/optprice
ARG NEXT_PUBLIC_GA_ID=

ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_GITHUB_URL=$NEXT_PUBLIC_GITHUB_URL
ENV NEXT_PUBLIC_GA_ID=$NEXT_PUBLIC_GA_ID

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Публичные ресурсы
COPY --from=builder /app/public ./public

# Standalone-сборка (сервер + минимальный набор node_modules)
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

HEALTHCHECK --interval=10s --timeout=5s --start-period=30s --retries=5 \
  CMD wget --no-verbose --tries=1 --spider http://127.0.0.1:3000/ || exit 1

CMD ["node", "server.js"]
