<script>
  export let data;
  import ProductsTable from '$lib/components/productsTable.svelte';
</script>

<div class="p-4">
  <a href="/dashboard" class="flex items-center gap-2 mb-4">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m5 12l6-6m-6 6l6 6m-6-6h14" />
    </svg>
    <p class="text-2xl">Dashboard</p>
  </a>
  
  {#if !data.success}
    <div class="alert alert-error">
      <p>Er is een fout opgetreden: {data.error}</p>
    </div>
  {:else}
    <ProductsTable products={data.products} />
  {/if}
</div>