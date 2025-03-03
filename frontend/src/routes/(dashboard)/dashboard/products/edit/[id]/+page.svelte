<!-- /frontend/src/routes/(dashboard)/dashboard/products/edit/[id]/+page.svelte -->
<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import ProductForm from '$lib/components/ProductForm.svelte';
  import VariantsList from '$lib/components/VariantsList.svelte';
  import DeleteConfirmModal from '$lib/components/DeleteConfirmModal.svelte';
  import ProductImagesManager from '$lib/components/ProductImagesManager.svelte';
  
  export let data;
  
  // Debug logging
  console.log("Received data:", data);
  
  let product = null;
  let isLoading = true;
  let error = null;
  let showDeleteModal = false;
  let activeTab = 'details';
  
  // Helper functie om het totale aantal afbeeldingen te tellen
  function countTotalImages(product) {
    if (!product) return 0;
    
    // Tel productafbeeldingen
    const productImagesCount = product.ProductImages?.length || 0;
    
    // Tel variant afbeeldingen
    let variantImagesCount = 0;
    if (product.ProductVariants && product.ProductVariants.length > 0) {
      for (const variant of product.ProductVariants) {
        variantImagesCount += variant.VariantImages?.length || 0;
      }
    }
    
    return productImagesCount + variantImagesCount;
  }
  
  // Laad product bij initialisatie
  onMount(async () => {
    try {
      // Gebruik het correcte endpoint zonder "public"
      const res = await fetch(`/api/products/${data.id}`);
      if (!res.ok) throw new Error(`Product could not be found: ${res.statusText}`);
      product = await res.json();
      console.log("Loaded product:", product);
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
      // Hier gebruiken we de interne product_id voor het verwijderen
      const res = await fetch(`/api/admin/products`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: product.product_id })
      });
      
      if (!res.ok) throw new Error(`Product could not be deleted: ${res.statusText}`);
      
      showDeleteModal = false;
      goto('/dashboard/products', { replaceState: true });
    } catch (err) {
      console.error('Error deleting product:', err);
      error = err.message;
    }
  };
  
  // Tabs switchen met expliciete logging
  function setActiveTab(tab) {
    console.log(`Changing tab from ${activeTab} to ${tab}`);
    activeTab = tab;
  }
  
  // Functie om product te herladen na afbeeldingswijzigingen
  const refreshProduct = async () => {
    try {
      const res = await fetch(`/api/products/${data.id}`);
      if (!res.ok) throw new Error(`Product could not be found: ${res.statusText}`);
      product = await res.json();
    } catch (err) {
      console.error('Error refreshing product:', err);
    }
  };
</script>

<div class="p-4">
  <a href="/dashboard/products" class="flex items-center gap-2 mb-4">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m5 12l6-6m-6 6l6 6m-6-6h14" />
    </svg>
    <p class="text-2xl">Return to products</p>
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
      <h1 class="text-3xl font-bold">Edit Product: {product.name}</h1>
      <button class="btn btn-error" on:click={() => showDeleteModal = true}>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
        Delete Product
      </button>
    </div>
    
    <!-- Vereenvoudigde tabs implementatie -->
    <div class="tabs tabs-boxed mb-6">
      <!-- Details tab -->
      <a 
        class="tab {activeTab === 'details' ? 'tab-active' : ''}" 
        href="javascript:void(0)" 
        on:click|preventDefault={() => setActiveTab('details')}
      >
        Product details
      </a>
      
      <!-- Variants tab -->
      <a 
        class="tab {activeTab === 'variants' ? 'tab-active' : ''}" 
        href="javascript:void(0)" 
        on:click|preventDefault={() => setActiveTab('variants')}
      >
        Variants ({product.ProductVariants?.length || 0})
      </a>
      
      <!-- Images tab  -->
      <a 
        class="tab {activeTab === 'images' ? 'tab-active' : ''}" 
        href="javascript:void(0)" 
        on:click|preventDefault={() => setActiveTab('images')}
      >
        Images ({countTotalImages(product)})
      </a>
    </div>
    
    {#if activeTab === 'details'}
      <div class="bg-base-200 p-6 rounded-lg">
        <ProductForm {product} />
      </div>
    {:else if activeTab === 'variants'}
      <div class="bg-base-200 p-6 rounded-lg">
        <VariantsList 
          productId={product.public_id} 
          product_id={product.product_id} 
          variants={product.ProductVariants || []} 
        />
      </div>
    {:else if activeTab === 'images'}
      <ProductImagesManager 
        {product} 
        onRefresh={refreshProduct}
      />
    {/if}
  {/if}
  
  {#if showDeleteModal}
    <DeleteConfirmModal 
      title="Delete product" 
      message="Are you sure you want to delete this product? This cannot be undone"
      onCancel={() => showDeleteModal = false}
      onConfirm={handleDelete}
    />
  {/if}
</div>