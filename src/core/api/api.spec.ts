import { describe, it, expect, vi } from 'vitest';
import { httpClient } from './http.client';
import { showErrorToast } from '@core/stores/toast.store';

vi.mock('@core/stores/toast.store', () => ({
  showErrorToast: vi.fn()
}));

describe('HTTP Client Configuration', () => {
  it('should be configured with the correct base URL from environment variables', () => {
    expect(httpClient.defaults.baseURL).toBe(import.meta.env.VITE_API_URL);
  });

  it('should have the default Content-Type header set to application/json', () => {
    expect(httpClient.defaults.headers['Content-Type']).toBe('application/json');
  });

  it('should trigger showErrorToast when a response error occurs', async () => {
    const mockError = {
      isAxiosError: true,
      response: { status: 500, statusText: 'Internal Server Error' }
    };

    const rejectInterceptor = httpClient.interceptors.response.handlers[0].rejected;

    try {
      await rejectInterceptor(mockError);
    } catch {
      expect(showErrorToast).toHaveBeenCalledWith(mockError);
    }
  });

  it('should return the response object on success', () => {
    const mockResponse = { data: { success: true } };

    const successInterceptor = httpClient.interceptors.response.handlers[0].fulfilled;

    const result = successInterceptor(mockResponse);

    expect(result).toEqual(mockResponse);
  });
});
