import { describe, it, expect } from 'vitest';
import type { MetricSummary } from './metric.model';
import type { DateRange } from './date-range.model';

describe('Models Structure', () => {
  it('should validate DateRange structure', () => {
    const dateRange: DateRange = {
      startDate: '2026-01-01',
      endDate: '2026-05-31'
    };

    expect(dateRange).toHaveProperty('startDate');
    expect(dateRange).toHaveProperty('endDate');
    expect(dateRange.startDate).toBeTypeOf('string');
  });

  it('should validate MetricSummary structure', () => {
    const metricSummary: MetricSummary = {
      code: 'google',
      totalClicks: 150,
      clicksByDate: {
        '2026-05-01': 5,
        '2026-05-02': 10
      }
    };

    expect(metricSummary).toHaveProperty('code');
    expect(metricSummary.totalClicks).toBeGreaterThanOrEqual(0);
    expect(typeof metricSummary.clicksByDate).toBe('object');
    expect(Object.keys(metricSummary.clicksByDate)).toContain('2026-05-01');
  });
});