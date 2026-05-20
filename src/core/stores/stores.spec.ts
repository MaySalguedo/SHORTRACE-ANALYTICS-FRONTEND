import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { toastStore, showErrorToast } from './toast.store';
import { get } from 'svelte/store';

describe('Toast Store', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    toastStore.set({ visible: false, errorDetails: null });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should update the store and show the toast when showErrorToast is called', () => {
    const mockError = { 
	  message: 'Test error',
	  isAxiosError: false 
	} as Error;
    
    showErrorToast(mockError);

    const state = get(toastStore);
    expect(state.visible).toBe(true);
    expect(state.errorDetails?.message).toBe('Test error');
    expect(state.errorDetails).toHaveProperty('timestamp');
  });

  it('should clear the toast after the default duration', () => {
    showErrorToast(new Error('Auto-dismiss test'));

    vi.runAllTimers();

    const state = get(toastStore);
    expect(state.visible).toBe(false);
    expect(state.errorDetails).toBeNull();
  });

  it('should handle standard Error objects (non-Axios) correctly', () => {
    const standardError = new Error('Generic error');
    
    showErrorToast(standardError);

    const state = get(toastStore);
    expect(state.errorDetails?.message).toBe('Generic error');
    expect(state.errorDetails?.status).toBeUndefined(); // No debería tener status
  });

  it('should extract the message from axios response data if available', () => {
    const axiosMockError = {
      isAxiosError: true,
      response: {
        status: 400,
        data: { message: 'Custom API Error' }
      },
      message: 'Network Error'
    } as any;

    showErrorToast(axiosMockError);

    const state = get(toastStore);
    expect(state.errorDetails?.message).toBe('Custom API Error');
  });

  it('should handle axios error without config url', () => {
    const axiosMockError = {
      isAxiosError: true,
      response: { status: 500 },
      message: 'Network Error',
      config: {} // Config existe pero no tiene url
    } as any;

    showErrorToast(axiosMockError);

    const state = get(toastStore);
    expect(state.errorDetails?.url).toBeUndefined();
  });
});