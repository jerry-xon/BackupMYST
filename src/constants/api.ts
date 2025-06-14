import axios from 'axios';
import { getItem } from './helper';

const api = axios.create({
  baseURL: 'https://myst-backend-na0j.onrender.com/api/v1', // Replace with your API base URL
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  async (config: any) => {
    if (config?.isAuthenticate === false) {
      if (config.headers && config.headers.Authorization) {
        delete config.headers.Authorization;
      }
      return config;
    }
    const res = await getItem<any>('USER');
    if (res?.token) {
      config.headers.Authorization = `Bearer ${res.token}`;
    } else if (config.headers && config.headers.Authorization) {
      delete config.headers.Authorization;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
  
