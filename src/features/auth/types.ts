export type UserRole = 'SUPPLIER' | 'STORE';

export interface User {
  id: number
  phone: string
  role: UserRole
  profileIsComplete: boolean
  createdAt: string
  updatedAt: string
}

export type SendOtpStatus = 'OTP_SENT' | 'NEEDS_REGISTRATION';

export interface SendOtpResponse {
  status: SendOtpStatus
}

export interface RegisterResponse {
  status: 'OTP_SENT'
}

export interface VerifyOtpResponse {
  status: 'SUCCESS'
  user: User
}

export interface LogoutResponse {
  status: 'LOGGED_OUT'
}

export interface ApiError {
  statusCode: number
  message: string
}
