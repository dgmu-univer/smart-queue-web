/* eslint-disable @stylistic/quotes */
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const CSP_DIRECTIVES = {
  // Теперь значения обернуты в дополнительные одинарные кавычки
  'default-src': ["'self'"],

  // Добавил 'unsafe-eval' — он часто нужен Next.js в режиме разработки
  'script-src': ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
  'connect-src': ["'self'", "https://price05.ru"],
  'style-src': ["'self'", "'unsafe-inline'"],

  'img-src': ["'self'", "data:", "blob:", "https://cdn.shadcnstudio.com"],

  'frame-ancestors': ["'none'"],

  'form-action': ["'self'"],

  'upgrade-insecure-requests': [],
};

/**
 * Строит строку Content Security Policy (CSP) на основе конфигурации.
 */
function buildCSP(): string {
  return Object.entries(CSP_DIRECTIVES)
    .map(([key, values]) => {
      if (values.length === 0) {
        return key; // Directives like 'upgrade-insecure-requests' have no values
      }
      return `${key} ${values.join(' ')}`;
    })
    .join('; ');
}

/**
 * Заголовки безопасности, применяемые ко всем ответам
 */
const SECURITY_HEADERS = {
  // Content-Security-Policy (CSP): Защита от XSS, кликджекинга и других инъекционных атак
  'Content-Security-Policy': buildCSP(),

  // Strict-Transport-Security: Принудительное использование HTTPS в течение 1 года (31,536,000 секунд)
  // Настроено в vercel.json, но также продублировано здесь для деплоев вне Vercel
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',

  // X-Frame-Options: Уже настроено в next.config.ts (DENY)
  // Удалено отсюда во избежание конфликта заголовков

  // X-Content-Type-Options: Запрет браузеру угадывать MIME-тип файла (защита от подмены типов)
  'X-Content-Type-Options': 'nosniff',

  // Referrer-Policy: Ограничение передачи информации о реферере (только при переходе внутри домена)
  'Referrer-Policy': 'strict-origin-when-cross-origin',

  // Permissions-Policy: Ограничение доступа к функциям браузера для защиты приватности абитуриентов
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',

  // X-DNS-Prefetch-Control: Управление предварительным разрешением имен DNS
  'X-DNS-Prefetch-Control': 'off',

  // Удаление заголовка X-Powered-By, чтобы скрыть информацию о сервере
  // (Next.js удаляет его по умолчанию, но мы делаем это для дополнительной страховки)
};

export function applySecurityProtections(): NextResponse {
  // 3. Security Headers: Apply to all responses
  const response = NextResponse.next();

  // Apply all security headers
  Object.entries(SECURITY_HEADERS).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  // Remove X-Powered-By header if present (extra safety)
  response.headers.delete('X-Powered-By');

  return response;
}

export async function proxy(req: NextRequest) {
  console.log('[PROXY] Module loaded');
  const { pathname } = req.nextUrl;

  // Import RBAC helpers lazily to keep edge bundle small
  const { isPublicRoute } = await import('./lib/auth/permissions');

  // 1) Allow public routes
  if (isPublicRoute(pathname)) {
    console.log('[PROXY] Public route allowed', pathname);
    return applySecurityProtections();
  }

  // 2) Get JWT token (NextAuth)
  const token = (await getToken({ req, secret: process.env.NEXTAUTH_SECRET }));
  console.log('[Token] ', token);
  if (!token) {
    console.warn('[PROXY] Unauthenticated access blocked → /login', pathname);
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return applySecurityProtections();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/workspace',
    '/workspace/:path*',
    '/pages',
    '/pages/:path*',
    '/api/:path*',
  ],
};
