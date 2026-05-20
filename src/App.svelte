<script lang="ts">
  import Toast from '@lib/components/Toast.svelte';
  import Dashboard from '@lib/features/Dashboard.svelte';
</script>

<main class="min-h-screen bg-gray-50 p-4 font-sans text-gray-900 md:p-8">
  <header class="mx-auto mb-8 max-w-6xl">
    <h1 class="text-3xl font-extrabold tracking-tight text-gray-900">
      SHORTRACE <span class="text-blue-600">Analytics</span>
    </h1>
    <p class="mt-1 text-gray-500">Watch the traffic of your URLs on realtime.</p>
  </header>

  <Dashboard />
</main>

<Toast />
