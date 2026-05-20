import { httpClient } from '@api/http.client';
import type { MetricSummary } from '@models/metric.model';
import type { DateRange } from '@models/date-range.model';

export class MetricsService {
  public async getMetrics(code: string, range: DateRange): Promise<MetricSummary> {
    const response = await httpClient.get<MetricSummary>(`/stats/${code}`, {
      params: {
        start_date: range.startDate,
        end_date: range.endDate
      }
    });

    return response.data;
  }
}

export const metricsService = new MetricsService();
