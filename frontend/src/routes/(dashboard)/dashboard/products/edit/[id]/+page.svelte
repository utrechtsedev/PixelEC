<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import ProductForm from '$lib/components/ProductForm.svelte';
    import VariantsList from '$lib/components/VariantsList.svelte';
    import DeleteConfirmModal from '$lib/components/DeleteConfirmModal.svelte';
    
    export let data;
    
    let product = null;
    let isLoading = true;
    let error = null;
    let showDeleteModal = false;
    let activeTab = 'details';
    
    // Laad product bij initialisatie
    onMount(async () => {
      try {
        const res = await fetch(`/api/products/${data.id}`);
        if (!res.ok) throw new Error(`Product kon niet worden opgehaald: ${res.statusText}`);
        product = await res.json();
        isLoading = false;
      } catch (err) {
        console.error('Error loading product:', err);
        error = err.message;
        isLoading = false;
      }
    });
    
    // Product verwijderen
    const handleDelete = async () => {
      try {
        const res = await fetch(`/api/products/${data.id}`, {
          method: 'DELETE'
        });
        
        if (!res.ok) throw new Error(`Product kon niet worden verwijderd: ${res.statusText}`);
        
        showDeleteModal = false;
        goto('/dashboard/products', { replaceState: true });
      } catch (err) {
        console.error('Error deleting product:', err);
        error = err.message;
      }
    };
    
    // Tabs switchen
    const setActiveTab = (tab) => {
      activeTab = tab;
    };
  </script>
  
  <div class="p-4">
    <a href="/dashboard/products" class="flex items-center gap-2 mb-4">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m5 12l6-6m-6 6l6 6m-6-6h14" />
      </svg>
      <p class="text-2xl">Terug naar Producten</p>
    </a>
    
    {#if isLoading}
      <div class="flex justify-center p-8">
        <span class="loading loading-spinner loading-lg"></span>
      </div>
    {:else if error}
      <div class="alert alert-error">
        <p>{error}</p>
      </div>
    {:else if product}
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold">Product bewerken: {product.name}</h1>
        <button class="btn btn-error" on:click={() => showDeleteModal = true}>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Verwijderen
        </button>
      </div>
      
      <div class="tabs tabs-boxed mb-6">
        <button class="tab {activeTab === 'details' ? 'tab-active' : ''}" on:click={() => setActiveTab('details')}>
          Productdetails
        </button>
        <button class="tab {activeTab === 'variants' ? 'tab-active' : ''}" on:click={() => setActiveTab('variants')}>
          Varianten ({product.ProductVariants?.length || 0})
        </button>
        <button class="tab {activeTab === 'images' ? 'tab-active' : ''}" on:click={() => setActiveTab('images')}>
          Afbeeldingen ({product.ProductImages?.length || 0})
        </button>
      </div>
      
      {#if activeTab === 'details'}
        <div class="bg-base-200 p-6 rounded-lg">
          <ProductForm {product} />
        </div>
      {:else if activeTab === 'variants'}
        <div class="bg-base-200 p-6 rounded-lg">
          <VariantsList productId={product.product_id} variants={product.ProductVariants || []} />
        </div>
      {:else if activeTab === 'images'}
        <div class="bg-base-200 p-6 rounded-lg">
          <p class="text-lg mb-4">Afbeeldingenbeheer komt binnenkort beschikbaar</p>
          <!-- Hier zou je een component kunnen toevoegen voor afbeeldingenbeheer -->
        </div>
      {/if}
    {/if}
    
    {#if showDeleteModal}
      <DeleteConfirmModal 
        title="Product verwijderen" 
        message="Weet je zeker dat je dit product wilt verwijderen? Dit kan niet ongedaan worden gemaakt en alle varianten worden ook verwijderd."
        onCancel={() => showDeleteModal = false}
        onConfirm={handleDelete}
      />
    {/if}
  </div>