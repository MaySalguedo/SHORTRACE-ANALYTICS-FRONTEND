<script lang="ts">
  import { fly } from 'svelte/transition';
  import { toastStore } from '@core/stores/toast.store';
</script>

{#if $toastStore.visible && $toastStore.errorDetails}
  <div
    class="fixed right-6 bottom-6 z-50 w-full max-w-md"
    transition:fly={{ y: 50, duration: 300 }}
  >
    <div
      class="relative flex items-start gap-4 rounded-r-xl border-l-4 border-red-500 bg-white p-4 shadow-xl"
    >
      <div class="mt-1 flex-shrink-0 rounded-full bg-red-50 p-2 text-red-500">
        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2.5"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
      </div>

      <div class="min-w-0 flex-1 pb-1">
        <div class="mb-2 flex items-center justify-between pr-6">
          <div>
            {#if $toastStore.errorDetails.status}
              <span
                class="inline-flex items-center gap-1.5 rounded-md bg-red-100 px-2 py-0.5 text-xs font-bold text-red-700"
              >
                HTTP {$toastStore.errorDetails.status}
                <span class="font-normal opacity-75">{$toastStore.errorDetails.statusText}</span>
              </span>
            {:else}
              <span
                class="inline-flex items-center rounded-md bg-orange-100 px-2 py-0.5 text-xs font-bold text-orange-700"
              >
                Connection Error
              </span>
            {/if}
          </div>

          <span class="font-mono text-[10px] tracking-wider text-gray-400">
            {$toastStore.errorDetails.timestamp}
          </span>
        </div>

        <p class="pr-2 text-sm leading-tight font-semibold text-gray-900">
          {$toastStore.errorDetails.message}
        </p>

        {#if $toastStore.errorDetails.url}
          <div
            class="mt-2 truncate rounded border border-gray-100 bg-gray-50 p-1.5 font-mono text-xs text-gray-500"
          >
            {$toastStore.errorDetails.url}
          </div>
        {/if}
      </div>

      <button
        aria-label="Close Notification"
        class="absolute top-3 right-3 rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
        on:click={() => toastStore.set({ visible: false, errorDetails: null })}
      >
        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </button>
    </div>
  </div>
{/if}
