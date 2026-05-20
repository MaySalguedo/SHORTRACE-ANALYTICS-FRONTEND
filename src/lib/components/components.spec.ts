/**
 * @vitest-environment jsdom
 */
import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import StatCard from './StatCard.svelte';
import { toastStore } from '@core/stores/toast.store';
import Toast from './Toast.svelte';

describe('src/lib/components', () => {
  
  describe('StatCard.svelte', () => {
    it('should render the title and value correctly', () => {
      const props = {
        title: 'Total Clicks',
        value: 1250
      };

      render(StatCard, { props });

      expect(screen.getByText(/total clicks/i)).toBeDefined();
      
      expect(screen.getByText('1250')).toBeDefined();
    });

    it('should handle string values (e.g. percentages)', () => {
      render(StatCard, { props: { title: 'Conversion', value: '45%' } });
      expect(screen.getByText('45%')).toBeDefined();
    });
  });

describe('Toast.svelte', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });
  it('should display the error message when store is visible', () => {

    toastStore.set({
      visible: true,
      errorDetails: {
        message: 'Error de prueba',
        timestamp: '2026-05-19 22:00:00'
      }
    });

    render(Toast);

    expect(screen.getByText('Error de prueba')).toBeDefined();
  });

  it('should render HTTP status and URL when provided', () => {
    toastStore.set({
      visible: true,
      errorDetails: {
        message: 'API Error',
        status: 404,
        statusText: 'Not Found',
        url: '/api/test',
        timestamp: '2026-05-19 22:00:00'
      }
    });

    render(Toast);

    expect(screen.getByText(/HTTP 404/i)).toBeDefined();
    expect(screen.getByText(/Not Found/i)).toBeDefined();
    expect(screen.getByText('/api/test')).toBeDefined();
  });

  it('should render "Connection Error" when no status is provided', async () => {
    toastStore.set({
      visible: true,
      errorDetails: {
        message: 'No status error',
        timestamp: '2026-05-19 22:00:00'
      }
    } as any);

    render(Toast);

    expect(screen.getByText('Connection Error')).toBeDefined();
  });

  it('should handle state transition to null', () => {
    toastStore.set({ visible: false, errorDetails: null });
    render(Toast);
    expect(screen.queryByText('Error de prueba')).toBeNull();
  });
});
});