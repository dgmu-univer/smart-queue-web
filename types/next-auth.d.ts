// types/next-auth.d.ts
// NextAuth.js Type Augmentation (Per Official Documentation)
// Location: types/next-auth.d.ts (NOT root)
// Reference: https://next-auth.js.org/getting-started/typescript

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth, { DefaultSession } from 'next-auth';
import { JWT as DefaultJWT } from 'next-auth/jwt';

type Role = 'ADMIN' | 'OPERATOR';

declare module 'next-auth' {
  /**
   * Returned by `getServerSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    fio: string
    role: string
    serverCookie: string // Extends default properties (email, name, image)
  }

  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface User {
    fio: string
    role: string
    serverCookie: string
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT extends DefaultJWT {
    fio: string
    role: string
    serverCookie: string
  }
}
