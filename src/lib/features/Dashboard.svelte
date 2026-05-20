<script lang="ts">
  import { onMount } from 'svelte';
  import { SvelteDate } from 'svelte/reactivity';
  import { metricsService } from '@core/services/metrics.service';
  import type { MetricSummary } from '@core/models/metric.model';
  import type { DateRange } from '@core/models/date-range.model';
  import StatCard from '@lib/components/StatCard.svelte';
  import LineChart from '@lib/components/LineChart.svelte';

  const formatDate = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };

  const today = new SvelteDate();
  const sixMonthsAgo = new SvelteDate(today.getTime() - 6 * 30 * 24 * 60 * 60 * 1000);

  let code = '';
  let dateRange: DateRange = {
    startDate: formatDate(sixMonthsAgo),
    endDate: formatDate(today)
  };

  let metrics: MetricSummary | null = null;
  let isLoading = false;

  const fetchMetrics = async () => {
    if (!code || !dateRange.startDate || !dateRange.endDate) return;

    isLoading = true;
    metrics = null;

    try {
      metrics = await metricsService.getMetrics(code, dateRange);
    } finally {
      isLoading = false;
    }
  };

  onMount(() => {
    fetchMetrics();
  });
</script>

<div class="mx-auto max-w-6xl space-y-6">
  <div class="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
    <div class="flex flex-col items-end gap-4 md:flex-row">
      <div class="flex-1">
        <label for="code" class="mb-1 block text-sm font-medium text-gray-700"
          >Short Link Code</label
        >
        <input
          id="code"
          type="text"
          bind:value={code}
          class="w-full rounded-lg border border-gray-300 px-4 py-2 transition-all outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          placeholder="your code here"
        />
      </div>

      <div>
        <label for="start" class="mb-1 block text-sm font-medium text-gray-700">From</label>
        <input
          id="start"
          type="date"
          bind:value={dateRange.startDate}
          class="w-full rounded-lg border border-gray-300 px-4 py-2 transition-all outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label for="end" class="mb-1 block text-sm font-medium text-gray-700">To</label>
        <input
          id="end"
          type="date"
          bind:value={dateRange.endDate}
          class="w-full rounded-lg border border-gray-300 px-4 py-2 transition-all outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        on:click={fetchMetrics}
        disabled={isLoading || !code}
        class="flex min-w-[120px] items-center justify-center rounded-lg bg-blue-600 px-6 py-2 font-semibold text-white shadow-md transition-all hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {#if isLoading}
          <svg
            class="h-5 w-5 animate-spin text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            ><circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle><path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path></svg
          >
        {:else}
          Query
        {/if}
      </button>
    </div>
  </div>

  {#if metrics && !isLoading}
    <div class="grid grid-cols-1 gap-6 md:grid-cols-4">
      <div class="flex flex-col gap-6 md:col-span-1">
        <StatCard title="Total Clicks" value={metrics.totalClicks} />

        <StatCard title="Active Days" value={Object.keys(metrics.clicksByDate).length} />
      </div>

      <div
        class="flex min-h-[300px] items-center justify-center rounded-xl border border-gray-100 bg-white p-6 shadow-sm md:col-span-3"
      >
        <div
          class="flex min-h-[300px] w-full items-center justify-center rounded-xl border border-gray-100 bg-white p-6 shadow-sm md:col-span-3"
        >
          <LineChart chartData={metrics.clicksByDate} />
        </div>
      </div>
    </div>
  {/if}

  {#if !metrics && !isLoading}
    <div
      class="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white p-12 text-center"
    >
      <svg
        class="mb-4 h-16 w-16 text-gray-300"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        ><path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        ></path></svg
      >
      <h3 class="text-lg font-medium text-gray-900">Ready for analysis</h3>
      <p class="mt-1 max-w-sm text-gray-500">
        Enter a code and a date range to view the performance of your shortened link.
      </p>
    </div>
  {/if}
</div>
