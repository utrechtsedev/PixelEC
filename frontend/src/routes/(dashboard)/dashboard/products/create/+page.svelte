<script>
    import ProductForm from '$lib/components/ProductForm.svelte';
  </script>
  
  <div class="p-4">
    <a href="/dashboard/products" class="flex items-center gap-2 mb-4">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m5 12l6-6m-6 6l6 6m-6-6h14" />
      </svg>
      <p class="text-2xl">Terug naar Producten</p>
    </a>
    
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold">Nieuw product toevoegen</h1>
    </div>
    
    <div class="bg-base-200 p-6 rounded-lg">
      <ProductForm />
    </div>
  </div>