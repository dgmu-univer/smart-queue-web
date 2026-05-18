import NextAuth from 'next-auth';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { authenticate } from '@/lib/authenticate';

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: 'jwt',
    maxAge: 60000,
  },

  providers: [
    CredentialsProvider({
      name: 'Credentials',

      credentials: {
        username: {},
        password: {},
      },

      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        const result = await authenticate(
          credentials.username,
          credentials.password,
        );

        return {
          id: result.user.username,
          fio: result.user.fio,
          username: result.user.username,
          role: result.user.role,
          backendCookies:
            result.backendCookies,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (user) {
        token.user = {
          id: user.id,
          fio: user.fio,
          username: user.username,
          role: user.role,
        };
        token.backendCookies = user.backendCookies;
      }

      return token;
    },

    session({ session, token }) {
      session.user = {
        id: token.user.id,
        fio: token.user.fio,
        username: token.user.username,
        role: token.user.role,
      };

      return session;
    },
  },

  pages: {
    signIn: '/login',
  },
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
