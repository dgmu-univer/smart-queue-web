import { JWT as DefaultJWT } from 'next-auth/jwt';

export interface ApplicationUser {
  fio: string
  username: string
  role: ApplicationUserRole
}

export type ApplicationUserRole = 'ADMIN' | 'OPERATOR';

declare module 'next-auth' {
  interface Session {
    user: ApplicationUser & {
      id: string // временно пихаем username
    }
  }

  interface User extends ApplicationUser {
    id: string // временно пихаем username
    backendCookies: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    user: ApplicationUser & {
      id: string // временно пихаем username
    }
    backendCookies: string
  }
}
