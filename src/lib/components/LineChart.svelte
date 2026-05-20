<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import Chart from 'chart.js/auto';

  export let chartData: Record<string, number> = {};

  let canvas: HTMLCanvasElement;
  let chartInstance: Chart;

  $: {
    if (chartInstance && chartData) {
      const labels = Object.keys(chartData).sort();
      chartInstance.data.labels = labels;
      chartInstance.data.datasets[0].data = labels.map((date) => chartData[date]);
      chartInstance.update();
    }
  }

  onMount(() => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(37, 99, 235, 0.4)');
    gradient.addColorStop(1, 'rgba(37, 99, 235, 0.0)');

    const labels = Object.keys(chartData).sort();
    const data = labels.map((date) => chartData[date]);

    chartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Clics',
            data,
            borderColor: '#2563eb',
            backgroundColor: gradient,
            borderWidth: 3,
            pointBackgroundColor: '#ffffff',
            pointBorderColor: '#2563eb',
            pointBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 7,
            pointHoverBackgroundColor: '#2563eb',
            pointHoverBorderColor: '#ffffff',
            pointHoverBorderWidth: 2,
            tension: 0.4,
            fill: true
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: 'rgba(17, 24, 39, 0.95)',
            titleColor: '#d1d5db',
            bodyColor: '#ffffff',
            titleFont: { size: 12, family: "'Inter', sans-serif" },
            bodyFont: { size: 14, weight: 'bold', family: "'Inter', sans-serif" },
            padding: 12,
            cornerRadius: 8,
            displayColors: false,
            callbacks: {
              label: (context) => `${context.parsed.y} clics`
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            border: { display: false },
            grid: {
              color: '#f3f4f6',
              tickLength: 0
            },
            ticks: {
              precision: 0,
              color: '#9ca3af',
              font: { size: 12, family: "'Inter', sans-serif" },
              padding: 10
            }
          },
          x: {
            grid: { display: false },
            ticks: {
              color: '#9ca3af',
              font: { size: 12, family: "'Inter', sans-serif" },
              maxTicksLimit: 7,
              maxRotation: 0
            }
          }
        }
      }
    });
  });

  onDestroy(() => {
    if (chartInstance) chartInstance.destroy();
  });
</script>

<div class="relative h-full min-h-[320px] w-full">
  <canvas bind:this={canvas}></canvas>
</div>
