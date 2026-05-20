import axios, { type AxiosError } from 'axios';
import { showErrorToast } from '@core/stores/toast.store';

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000
});

httpClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    showErrorToast(error);
    return Promise.reject(error);
  }
);
