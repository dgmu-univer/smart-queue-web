import ky from 'ky';
// import { BACKEND_URL } from '../../next.config';

const api = ky.extend({
  baseUrl: 'http://backend:8080',
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
