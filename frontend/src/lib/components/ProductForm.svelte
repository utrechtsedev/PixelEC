<script>
  import { onMount } from 'svelte';
  
  export let product = {
    name: '',
    description: '',
    base_price: '',
    sku: '',
    type: 'physical',
    visible: 'visible',
    category_id: null,
    brand_id: null
  };
  
  let categories = [];
  let brands = [];
  let formSubmitting = false;
  let formError = null;
  let formSuccess = false;
  
  // Form model - maak een kopie van het product met alle properties
  let formData = { ...product };
  
  // Debug logging
  console.log('Initial product data:', product);
  
  onMount(async () => {
    // Laad categorieën
    try {
      const categoryRes = await fetch('/api/categories');
      if (categoryRes.ok) {
        categories = await categoryRes.json();
      }
    } catch (error) {
      console.error('Error loading categories:', error);
    }
    
    // Laad merken
    try {
      const brandRes = await fetch('/api/brands');
      if (brandRes.ok) {
        brands = await brandRes.json();
      }
    } catch (error) {
      console.error('Error loading brands:', error);
    }
  });
  
  // Form submission
  const handleSubmit = async () => {
    formSubmitting = true;
    formError = null;
    formSuccess = false;
    
    try {
      // Belangrijk: controller verwacht 'id', niet 'product_id'
      const submissionData = {
        ...formData,
        // Gebruik 'id' in plaats van 'product_id'
        id: product.product_id,
        // Converteer prijs naar getal
        base_price: parseFloat(formData.base_price)
      };
      
      console.log('Submitting data:', submissionData);
      
      // Bepaal of het een nieuw of bestaand product is
      const isNew = !product.product_id;
      
      // URL is altijd hetzelfde, de methode verandert
      const url = '/api/admin/products';
      const method = isNew ? 'POST' : 'PUT';
      
      console.log('API request:', method, url);
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(submissionData)
      });
      
      // Eerste check op response status
      if (!response.ok) {
        let errorMessage = `Server error: ${response.status} ${response.statusText}`;
        
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorData.message || errorMessage;
        } catch (e) {
          // Als het geen JSON is, probeer tekst te lezen
          const errorText = await response.text();
          errorMessage = errorText || errorMessage;
        }
        
        throw new Error(errorMessage);
      }
      
      // Lees de response als JSON
      const responseData = await response.json();
      console.log('API response data:', responseData);
      
      formSuccess = true;
      
      // Als het een nieuw product is, ververs de pagina naar de edit pagina
      if (isNew && responseData) {
        const redirectId = responseData.public_id || responseData.product_id;
        window.location = `/dashboard/products/edit/${redirectId}`;
      }
    } catch (error) {
      console.error('Error submitting product:', error);
      formError = error.message;
    } finally {
      formSubmitting = false;
    }
  };
</script>

<form on:submit|preventDefault={handleSubmit} class="space-y-6">
  {#if formSuccess}
    <div class="alert alert-success">
      <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>Product succesfully saved!</span>
    </div>
  {/if}
  
  {#if formError}
    <div class="alert alert-error">
      <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>{formError}</span>
    </div>
  {/if}
  
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <!-- Naam -->
    <div class="form-control">
      <label class="label" for="name">
        <span class="label-text">Product name*</span>
      </label>
      <input 
        type="text" 
        id="name" 
        class="input input-bordered w-full" 
        bind:value={formData.name} 
        required 
      />
    </div>
    
    <!-- SKU -->
    <div class="form-control">
      <label class="label" for="sku">
        <span class="label-text">SKU (Item number)*</span>
      </label>
      <input 
        type="text" 
        id="sku" 
        class="input input-bordered w-full" 
        bind:value={formData.sku} 
        required 
      />
    </div>
    
    <!-- Prijs -->
    <div class="form-control">
      <label class="label" for="base_price">
        <span class="label-text">Base price ($)*</span>
      </label>
      <input 
        type="number" 
        id="base_price" 
        class="input input-bordered w-full" 
        bind:value={formData.base_price} 
        min="0" 
        step="0.01" 
        required 
      />
    </div>
    
    <!-- Type -->
    <div class="form-control">
      <label class="label" for="type">
        <span class="label-text">Type</span>
      </label>
      <select id="type" class="select select-bordered w-full" bind:value={formData.type}>
        <option value="physical">Phisical product</option>
        <option value="digital">Digital product</option>
        <option value="service">Service</option>
      </select>
    </div>
    
    <!-- Zichtbaarheid -->
    <div class="form-control">
      <label class="label" for="visible">
        <span class="label-text">Visibility</span>
      </label>
      <select id="visible" class="select select-bordered w-full" bind:value={formData.visible}>
        <option value="visible">Visible</option>
        <option value="invisible">Invisible</option>
        <option value="unlisted">Unlisted</option>
      </select>
    </div>
    
    <!-- Categorie -->
    <div class="form-control">
      <label class="label" for="category_id">
        <span class="label-text">Category</span>
      </label>
      <select id="category_id" class="select select-bordered w-full" bind:value={formData.category_id}>
        <option value={null}>-- Select category --</option>
        {#each categories as category}
          <option value={category.category_id}>{category.name}</option>
        {/each}
      </select>
    </div>
    
    <!-- Merk -->
    <div class="form-control">
      <label class="label" for="brand_id">
        <span class="label-text">Brand</span>
      </label>
      <select id="brand_id" class="select select-bordered w-full" bind:value={formData.brand_id}>
        <option value={null}>-- Select brand --</option>
        {#each brands as brand}
          <option value={brand.brand_id}>{brand.name}</option>
        {/each}
      </select>
    </div>
  </div>
  
  <!-- Beschrijving -->
  <div class="form-control">
    <label class="label" for="description">
      <span class="label-text">Product description</span>
    </label>
    <textarea 
      id="description" 
      class="textarea textarea-bordered h-32" 
      bind:value={formData.description}
    ></textarea>
  </div>
  
  <div class="flex justify-end space-x-3 mt-6">
    <a href="/dashboard/products" class="btn btn-ghost">Cancel</a>
    <button type="submit" class="btn btn-primary" disabled={formSubmitting}>
      {#if formSubmitting}
        <span class="loading loading-spinner loading-xs"></span>
      {/if}
      Save
    </button>
  </div>
</form>