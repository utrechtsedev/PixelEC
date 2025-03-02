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
    
    // Form model
    let formData = { ...product };
    
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
        // Converteer prijs naar getal
        const submissionData = {
          ...formData,
          base_price: parseFloat(formData.base_price)
        };
        
        // Nieuwe of bestaande product?
        const isNew = !product.product_id;
        const url = isNew ? '/api/products' : `/api/products/${product.product_id}`;
        const method = isNew ? 'POST' : 'PUT';
        
        const response = await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(submissionData)
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Er is een fout opgetreden bij het opslaan van het product');
        }
        
        formSuccess = true;
        
        // Als het een nieuw product is, ververs de pagina naar de edit pagina
        if (isNew) {
          const newProduct = await response.json();
          window.location = `/dashboard/products/edit/${newProduct.product_id}`;
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
        <span>Product succesvol opgeslagen!</span>
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
          <span class="label-text">Productnaam*</span>
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
          <span class="label-text">SKU (Artikelnummer)*</span>
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
          <span class="label-text">Basisprijs (€)*</span>
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
          <option value="physical">Fysiek product</option>
          <option value="digital">Digitaal product</option>
          <option value="service">Dienst</option>
        </select>
      </div>
      
      <!-- Zichtbaarheid -->
      <div class="form-control">
        <label class="label" for="visible">
          <span class="label-text">Zichtbaarheid</span>
        </label>
        <select id="visible" class="select select-bordered w-full" bind:value={formData.visible}>
          <option value="visible">Zichtbaar</option>
          <option value="invisible">Onzichtbaar</option>
          <option value="unlisted">Niet in lijst</option>
        </select>
      </div>
      
      <!-- Categorie -->
      <div class="form-control">
        <label class="label" for="category_id">
          <span class="label-text">Categorie</span>
        </label>
        <select id="category_id" class="select select-bordered w-full" bind:value={formData.category_id}>
          <option value={null}>-- Selecteer categorie --</option>
          {#each categories as category}
            <option value={category.category_id}>{category.name}</option>
          {/each}
        </select>
      </div>
      
      <!-- Merk -->
      <div class="form-control">
        <label class="label" for="brand_id">
          <span class="label-text">Merk</span>
        </label>
        <select id="brand_id" class="select select-bordered w-full" bind:value={formData.brand_id}>
          <option value={null}>-- Selecteer merk --</option>
          {#each brands as brand}
            <option value={brand.brand_id}>{brand.name}</option>
          {/each}
        </select>
      </div>
    </div>
    
    <!-- Beschrijving -->
    <div class="form-control">
      <label class="label" for="description">
        <span class="label-text">Beschrijving</span>
      </label>
      <textarea 
        id="description" 
        class="textarea textarea-bordered h-32" 
        bind:value={formData.description}
      ></textarea>
    </div>
    
    <div class="flex justify-end space-x-3 mt-6">
      <a href="/dashboard/products" class="btn btn-ghost">Annuleren</a>
      <button type="submit" class="btn btn-primary" disabled={formSubmitting}>
        {#if formSubmitting}
          <span class="loading loading-spinner loading-xs"></span>
        {/if}
        Opslaan
      </button>
    </div>
  </form>