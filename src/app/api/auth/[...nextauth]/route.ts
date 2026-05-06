/* eslint-disable @typescript-eslint/no-unnecessary-condition */
// src/app/api/auth/[...nextauth]/route.ts
// NextAuth.js v4.24.13 Configuration for Next.js v16.0.1
// Implements T022 - JWT strategy with credentials provider

import api from '@/lib/api';
import NextAuth from 'next-auth';
import type { NextAuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';
import { BACKEND_URL } from '../../../../../next.config';

interface User {
  fio: string
  role: 'ADMIN' | 'OPERATOR'
  serverCookie: string
}
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
        console.log('AAAAAAAA', BACKEND_URL)
        console.log('NEXTAUTH_URL', process.env.NEXTAUTH_URL)
        // 1. Делаем запрос к вашему API
        const res = await api.post<User>('/api/login', {
          json: {
            username: credentials?.username,
            password: credentials?.password,
          },
        });

        if (res.ok) {
          // 2. Достаем куку из заголовка set-cookie
          const setCookie = res.headers.get('set-cookie');

          // Вытаскиваем само значение SESSION
          const sessionCookie = setCookie?.split(';').find(c => c.trim().startsWith('SESSION='));

          const user = await res.json();
          // 3. Возвращаем объект пользователя + куку (чтобы передать её в jwt callback)
          return {
            id: '',
            fio: user.fio,
            role: user.role,
            serverCookie: sessionCookie ?? '',
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
    jwt({ token, user, trigger, session }) {
      // Передаем куку из объекта user в JWT токен NextAuth
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

  debug: true,
  logger: {
    debug(code, metadata) {
      console.log('🔍 NextAuth Debug:', code, metadata);
    },
    error(code, metadata) {
      console.error('❌ NextAuth Error:', code, metadata);
    },
  },
};

// Export NextAuth handler
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
