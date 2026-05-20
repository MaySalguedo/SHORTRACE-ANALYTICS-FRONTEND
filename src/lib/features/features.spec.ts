/**
 * @vitest-environment jsdom
 */
import { render, screen, fireEvent } from '@testing-library/svelte';
import { describe, it, expect, vi } from 'vitest';
import Dashboard from './Dashboard.svelte';
import { metricsService } from '@core/services/metrics.service';

vi.mock('chart.js/auto', () => {
  const ChartMock = vi.fn().mockImplementation(function () {
    return {
      update: vi.fn(),
      destroy: vi.fn(),
      data: { labels: [], datasets: [{ data: [] }] }
    };
  });
  return { default: ChartMock };
});

describe('src/features/analytics', () => {
  describe('Dashboard.svelte', () => {
    it('should fetch and display metrics when Query button is clicked', async () => {
      const mockMetrics = {
        code: 'test',
        totalClicks: 150,
        clicksByDate: { '2026-05-01': 150 }
      };
      const spy = vi.spyOn(metricsService, 'getMetrics').mockResolvedValue(mockMetrics);

      render(Dashboard);

      const codeInput = screen.getByLabelText(/short link code/i);
      const queryBtn = screen.getByText(/query/i);

      await fireEvent.input(codeInput, { target: { value: 'test-code' } });
      await fireEvent.click(queryBtn);

      expect(spy).toHaveBeenCalled();

      const totalClicks = await screen.findByText('150');
      expect(totalClicks).toBeDefined();
    });
  });
});
