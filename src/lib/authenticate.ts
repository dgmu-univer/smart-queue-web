export interface BackendLoginResponse {
  fio: string
  username: string
  role: 'ADMIN' | 'OPERATOR'
}

export async function authenticate(
  username: string,
  password: string,
) {
  const response = await fetch(
    `${process.env.EXTERNAL_API_HOST}/backend/api/login`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    },
  );

  if (!response.ok) {
    throw new Error('Invalid credentials');
  }

  const user = (await response.json()) as BackendLoginResponse;

  /**
   * Extract ALL backend cookies
   */
  const rawSetCookie
    = response.headers.getSetCookie();

  if (rawSetCookie.length === 0) {
    throw new Error(
      'No backend cookies received',
    );
  }

  /**
   * SESSION=...
   * JSESSIONID=...
   */
  const backendCookies = rawSetCookie
    .map(cookie => cookie.split(';')[0])
    .join('; ');

  return {
    user,
    backendCookies,
  };
}
