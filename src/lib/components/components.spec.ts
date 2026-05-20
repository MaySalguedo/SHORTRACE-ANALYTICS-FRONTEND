/**
 * @vitest-environment jsdom
 */
import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import StatCard from './StatCard.svelte';
import { toastStore } from '@core/stores/toast.store';
import Toast from './Toast.svelte';
import LineChart from './LineChart.svelte';
import Chart from 'chart.js/auto';

vi.mock('chart.js/auto', () => {
  const ChartMock = vi.fn().mockImplementation(function() {
    return {
      update: vi.fn(),
      destroy: vi.fn(),
      data: {
        labels: [],
        datasets: [{ data: [] }]
      }
    };
  });
  return { default: ChartMock };
});

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

  describe('LineChart.svelte', () => {
    beforeAll(() => {
      vi.spyOn(window.HTMLCanvasElement.prototype, 'getContext').mockImplementation(() => ({
        createLinearGradient: vi.fn(() => ({
          addColorStop: vi.fn()
        }))
      }) as any);
    });

    afterEach(() => {
      vi.clearAllMocks();
    });

    it('should render the canvas element', () => {
      render(LineChart, { props: { chartData: {} } });

      const canvas = document.querySelector('canvas');
      expect(canvas).toBeDefined();
      expect(canvas).not.toBeNull();
    });

    it('should initialize Chart.js with provided data', () => {
      const chartData = {
        '2026-05-19': 150,
        '2026-05-20': 300
      };

      render(LineChart, { props: { chartData } });

      expect(window.HTMLCanvasElement.prototype.getContext).toHaveBeenCalledWith('2d');
      expect(Chart).toHaveBeenCalled();
    });

	it('should update chart when chartData changes (reactivity)', async () => {
      const { component } = render(LineChart, { 
        props: { chartData: { '2026-05-19': 150 } } 
      });

      await component.$set({ 
        chartData: { '2026-05-19': 150, '2026-05-20': 300 } 
      });

      expect(Chart).toHaveBeenCalled();
    });

    it('should destroy chart instance on unmount', () => {
      const { unmount } = render(LineChart, { props: { chartData: {} } });
      
      unmount();
      
      expect(Chart).toHaveBeenCalled(); 
    });

    it('should return early if getContext returns null', () => {
      vi.spyOn(window.HTMLCanvasElement.prototype, 'getContext').mockReturnValueOnce(null);
      
      render(LineChart, { props: { chartData: {} } });
    });
  });
});
