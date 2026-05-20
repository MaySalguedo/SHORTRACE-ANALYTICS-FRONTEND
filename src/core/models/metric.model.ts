export interface MetricSummary {
  code: string;
  totalClicks: number;
  clicksByDate: Record<string, number>;
}
