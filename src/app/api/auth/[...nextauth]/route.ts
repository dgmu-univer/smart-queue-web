// src/app/api/auth/[...nextauth]/route.ts
// NextAuth.js v4.24.13 Configuration for Next.js v16.0.1

import NextAuth from 'next-auth';
import type { NextAuthOptions } from 'next-auth';
import type { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';

// В продакшене используем внутренний адрес бэкенда напрямую,
// чтобы избежать петли: Next.js → Nginx → Next.js → backend
const API_URL = process.env.API_URL ?? 'http://127.0.0.1:4000';
/**
 * NextAuth configuration
 * Compatible with Next.js v16.0.1
 */
export const authOptions: NextAuthOptions = {
  // Secret for JWT encryption and CSRF protection
  secret: process.env.NEXTAUTH_SECRET,
  // Use JWT strategy for session management (FR-036, FR-040)
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days (FR-040)
  },

  // JWT configuration
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  // Authentication providers
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        username: { label: 'Логин', type: 'text' },
        password: { label: 'Пароль', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials.password) {
          throw new Error('Username and password are required');
        }

        try {
          // Запрос идёт напрямую на бэкенд (не через nginx),
          // чтобы избежать таймаута из-за петли через публичный URL
          const response = await fetch(`${API_URL}/api/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              username: credentials.username,
              password: credentials.password,
            }),
          });

          if (!response.ok) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const body = await response.json().catch(() => ({}));
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/restrict-template-expressions
            throw new Error(body.message ?? `Login failed: ${response.status}`);
          }

          // Извлекаем SESSION куку из заголовка set-cookie
          const setCookieHeader = response.headers.get('set-cookie');
          const sessionCookie = setCookieHeader
            ?.split(',')
            .find(c => c.trim().startsWith('SESSION='))
            ?.split(';')[0]
            ?.split('=')[1];

          if (!sessionCookie) {
            throw new Error('No SESSION cookie received from backend');
          }

          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          const user = await response.clone().json().catch(() => ({}));

          return {
            id: credentials.username,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
            fio: user.fio ?? credentials.username,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
            role: user.role ?? 'OPERATOR',
            serverCookie: `SESSION=${sessionCookie}`,
          };
        } catch (error) {
          console.error('❌ Authorization error:', error);
          throw error;
        }
      },
    }),
  ],

  // Callbacks for session and JWT customization
  callbacks: {
    // Redirect callback: Handle post-login redirects
    // Note: This callback doesn't have access to user data, so role-based redirects
    // are handled in the proxy.ts after authentication
    redirect({ url, baseUrl }) {
      // If URL is provided and is a relative path
      if (url.startsWith('/')) {
        return `${baseUrl}${url}`;
      } else if (url && new URL(url).origin === baseUrl) {
        // If URL is provided and on same origin
        return url;
      }

      // Default: redirect to /dashboard (proxy will handle role-based redirects)
      return `${baseUrl}/dashboard`;
    },
    jwt({ token, user, trigger, session }) {
      // Передаем куку из объекта user в JWT токен NextAuth
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (user) {
        token.serverCookie = user.serverCookie;
        token.fio = user.fio;
        token.role = user.role;
      }
      // Update session (for session updates)
      if (trigger === 'update' && session) {
        return { ...token, ...session } as JWT;
      }

      return token;
    },
    session({ session, token }) {
      session.serverCookie = token.serverCookie;
      session.fio = token.fio;
      session.role = token.role;
      return session;
    },
  },

  // Custom pages
  pages: {
    signIn: '/login',
    signOut: '/login',
    error: '/login', // Error code passed in query string as ?error=
    verifyRequest: '/auth/verify-email',
    newUser: '/dashboard', // New users will be directed here on sign in
  },

  // Events for logging and analytics
  events: {
    // async signIn() {
    //   // Audit log handled in authorize callback
    // },
    // async signOut({ token }: any) {

    // },
  },

  debug: process.env.NODE_ENV === 'development',
};

// Export NextAuth handler
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
