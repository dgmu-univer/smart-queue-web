namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test'

    NEXT_PUBLIC_API_URL: string
    NEXT_PUBLIC_SITE_URL: string

    NEXTAUTH_SECRET: string
    NEXTAUTH_URL: string

    EXTERNAL_API_HOST: string
  }
}
