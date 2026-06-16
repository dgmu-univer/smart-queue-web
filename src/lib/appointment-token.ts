// lib/appointment-token.ts

import crypto from 'crypto';

const SECRET = 'k13kjalRfk7ic3rXIOocw69x7VeNpz1uDJnhFzv/VKo=';

export function createAppointmentToken(id: number) {
  const expires = Date.now() + 15 * 60 * 1000; // 15 минут

  const payload = `${id.toString()}.${expires.toString()}`;

  const signature = crypto
    .createHmac('sha256', SECRET)
    .update(payload)
    .digest('hex');

  return `${payload}.${signature}`;
}

export function verifyAppointmentToken(token: string) {
  const [id, expires, signature] = token.split('.');

  if (!id || !expires || !signature) {
    throw new Error('Invalid token');
  }

  if (Date.now() > Number(expires)) {
    throw new Error('Token expired');
  }

  const payload = `${id}.${expires}`;

  const expected = crypto
    .createHmac('sha256', SECRET)
    .update(payload)
    .digest('hex');

  if (expected !== signature) {
    throw new Error('Invalid signature');
  }

  return Number(id);
}
