/* eslint-disable @typescript-eslint/no-unnecessary-condition */
// src/app/api/auth/[...nextauth]/route.ts
// NextAuth.js v4.24.13 Configuration for Next.js v16.0.1
// Implements T022 - JWT strategy with credentials provider

import NextAuth from 'next-auth';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

/**
 * NextAuth configuration
 * Compatible with Next.js v16.0.1
 */
export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 2 часа в секундах, если на бэкенде так же
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
        // 1. Делаем запрос к вашему API
        const res = await fetch('https://price05.ru/api/login', {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { 'Content-Type': 'application/json' },
        });

        if (res.ok) {
          // 2. Достаем куку из заголовка set-cookie
          const setCookie = res.headers.get('set-cookie');

          // Вытаскиваем само значение SESSION
          const sessionCookie = setCookie?.split(';').find(c => c.trim().startsWith('SESSION='));

          // 3. Возвращаем объект пользователя + куку (чтобы передать её в jwt callback)
          return {
            id: '1', // NextAuth требует id
            name: credentials?.username,
            serverCookie: sessionCookie,
          };
        }
        return null;
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
    jwt({ token, user }) {
      // Передаем куку из объекта user в JWT токен NextAuth
      if (user) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        token.serverCookie = user.serverCookie;
      }
      return token;
    },
    session({ session, token }) {
      // При желании прокидываем в сессию на фронт
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      session.serverCookie = token.serverCookie;
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

  // Enable debug in development
  debug: process.env.NODE_ENV === 'development',
};

// Export NextAuth handler
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
