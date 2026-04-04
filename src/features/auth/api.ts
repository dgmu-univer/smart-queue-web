import { api } from '@/lib/api'
import type {
  SendOtpResponse,
  RegisterResponse,
  VerifyOtpResponse,
  LogoutResponse,
} from './types'
import type { UserRole } from './types'

export const authApi = {
  sendOtp: (phone: string) =>
    api<SendOtpResponse>('/auth/send-otp', {
      method: 'POST',
      body: JSON.stringify({ phone }),
    }),

  register: (phone: string, role: UserRole) =>
    api<RegisterResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ phone, role }),
    }),

  verifyOtp: (phone: string, code: number) =>
    api<VerifyOtpResponse>('/auth/verify-otp', {
      method: 'POST',
      body: JSON.stringify({ phone, code }),
    }),

  logout: () =>
    api<LogoutResponse>('/auth/logout', {
      method: 'POST',
    }),
}
