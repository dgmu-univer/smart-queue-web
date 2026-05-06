export type UserRole = 'SUPPLIER' | 'STORE';

export interface User {
  fio: string
  username: string
  email: string
  role: 'ADMIN' | 'OPERATOR'
}
