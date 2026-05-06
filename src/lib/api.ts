import ky from 'ky';
import { BACKEND_URL } from '../../next.config';

const api = ky.extend({
  baseUrl: BACKEND_URL,
  prefix: '/api',
});

export default api;
