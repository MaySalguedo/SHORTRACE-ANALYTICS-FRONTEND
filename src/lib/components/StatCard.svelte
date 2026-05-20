<script lang="ts">
  export let title: string;
  export let value: number | string;
</script>

<div
  class="flex flex-col items-start justify-center rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-md"
>
  <h3 class="text-sm font-semibold tracking-wider text-gray-500 uppercase">
    {title}
  </h3>
  <p class="mt-2 text-4xl font-extrabold text-blue-600">
    {value}
  </p>
</div>
