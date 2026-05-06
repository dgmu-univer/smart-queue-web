import ky from 'ky';
import { BACKEND_URL } from '../../next.config';

const api = ky.extend({
  baseUrl: BACKEND_URL,
  prefix: '/api',
  hooks: {
    beforeRequest: [
      ({ request }) => {
        request.headers.set('Authorization', 'token initial-token');
      },
    ],
  },
});

export default api;
