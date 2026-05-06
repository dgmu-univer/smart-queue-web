import 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    serverCookie?: string
    fio?: string
    role?: 'ADMIN' | 'OPERATOR'
    user: {
      id: string
      email?: string | null
      name?: string | null
      image?: string | null
    }
  }

  interface User {
    id: string
    fio?: string
    role?: 'ADMIN' | 'OPERATOR'
    serverCookie?: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    serverCookie?: string
    fio?: string
    role?: 'ADMIN' | 'OPERATOR'
  }
}
