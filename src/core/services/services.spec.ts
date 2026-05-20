import { describe, it, expect, vi } from 'vitest';
import { metricsService } from './metrics.service';
import { httpClient } from '@api/http.client';
import type { MetricSummary } from '@models/metric.model';

vi.mock('@api/http.client', () => ({
  httpClient: {
    get: vi.fn()
  }
}));

describe('MetricsService', () => {
  it('should call the correct endpoint with the provided parameters', async () => {
    const code = 'test-code';
    const range = { startDate: '2026-05-01', endDate: '2026-05-31' };
    const mockResponse: { data: MetricSummary } = {
      data: {
        code: 'test-code',
        totalClicks: 10,
        clicksByDate: { '2026-05-01': 10 }
      }
    };

    (httpClient.get as any).mockResolvedValue(mockResponse);

    const result = await metricsService.getMetrics(code, range);

    expect(httpClient.get).toHaveBeenCalledWith(`/stats/${code}`, {
      params: {
        start_date: range.startDate,
        end_date: range.endDate
      }
    });

    expect(result).toEqual(mockResponse.data);
  });
});
