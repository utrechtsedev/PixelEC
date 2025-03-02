<script>
    import { createEventDispatcher } from 'svelte';
    
    export let productId;
    export let variant = null;
    
    const dispatch = createEventDispatcher();
    
    // Default waarden voor een nieuwe variant of gebruik bestaande waarden
    let formData = {
      sku: variant?.sku || '',
      price_override: variant?.price_override || '',
      inventory_quantity: variant?.inventory_quantity || 0,
      size: variant?.size || '',
      weight: variant?.weight || '',
      color: variant?.color || '',
      // Voeg hier attributen toe indien nodig
    };
    
    let formSubmitting = false;
    let formError = null;
    
    const handleSubmit = async () => {
      formSubmitting = true;
      formError = null;
      
      try {
        const isNew = !variant;
        const url = isNew 
          ? `/api/products/${productId}/variants` 
          : `/api/variants/${variant.variant_id}`;
        const method = isNew ? 'POST' : 'PUT';
        
        // Converteer numerieke waarden
        const submissionData = {
          ...formData,
          product_id: productId,
          price_override: formData.price_override ? parseFloat(formData.price_override) : null,
          inventory_quantity: parseInt(formData.inventory_quantity, 10)
        };
        
        const response = await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(submissionData)
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Er is een fout opgetreden bij het opslaan van de variant');
        }
        
        const savedVariant = await response.json();
        dispatch('save', savedVariant);
      } catch (error) {
        console.error('Error submitting variant:', error);
        formError = error.message;
      } finally {
        formSubmitting = false;
      }
    };
    
    const cancel = () => {
      dispatch('cancel');
    };
  </script>
  
  <form on:submit|preventDefault={handleSubmit} class="space-y-4">
    {#if formError}
      <div class="alert alert-error">
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{formError}</span>
      </div>
    {/if}
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
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
      
      <!-- Prijs override -->
      <div class="form-control">
        <label class="label" for="price_override">
          <span class="label-text">Prijs override (€)</span>
          <span class="label-text-alt">Laat leeg voor basisprijs</span>
        </label>
        <input 
          type="number" 
          id="price_override" 
          class="input input-bordered w-full" 
          bind:value={formData.price_override} 
          min="0" 
          step="0.01" 
        />
      </div>
      
      <!-- Voorraad -->
      <div class="form-control">
        <label class="label" for="inventory_quantity">
          <span class="label-text">Voorraad*</span>
        </label>
        <input 
          type="number" 
          id="inventory_quantity" 
          class="input input-bordered w-full" 
          bind:value={formData.inventory_quantity} 
          min="0" 
          step="1" 
          required 
        />
      </div>
      
      <!-- Kleur -->
      <div class="form-control">
        <label class="label" for="color">
          <span class="label-text">Kleur</span>
        </label>
        <div class="flex gap-2">
          <input 
            type="color" 
            id="color_picker" 
            class="input h-10 w-10 p-1" 
            bind:value={formData.color} 
          />
          <input 
            type="text" 
            id="color" 
            class="input input-bordered flex-1" 
            bind:value={formData.color} 
            placeholder="bv. Rood of #FF0000" 
          />
        </div>
      </div>
      
      <!-- Maat -->
      <div class="form-control">
        <label class="label" for="size">
          <span class="label-text">Maat</span>
        </label>
        <input 
          type="text" 
          id="size" 
          class="input input-bordered w-full" 
          bind:value={formData.size} 
          placeholder="bv. S, M, L, XL" 
        />
      </div>
      
      <!-- Gewicht -->
      <div class="form-control">
        <label class="label" for="weight">
          <span class="label-text">Gewicht</span>
        </label>
        <input 
          type="text" 
          id="weight" 
          class="input input-bordered w-full" 
          bind:value={formData.weight} 
          placeholder="bv. 500g, 1kg" 
        />
      </div>
    </div>
    
    <!-- Hier zou je extra attributen kunnen toevoegen in de toekomst -->
    
    <div class="flex justify-end space-x-3 mt-6">
      <button type="button" class="btn btn-ghost" on:click={cancel}>
        Annuleren
      </button>
      <button type="submit" class="btn btn-primary" disabled={formSubmitting}>
        {#if formSubmitting}
          <span class="loading loading-spinner loading-xs"></span>
        {/if}
        {variant ? 'Bijwerken' : 'Toevoegen'}
      </button>
    </div>
  </form>