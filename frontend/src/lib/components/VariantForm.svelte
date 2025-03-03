<!-- /components/VariantForm.svelte -->
<script>
  import { createEventDispatcher } from 'svelte';
  
  export let productId;
  export let variant = null;
  
  const dispatch = createEventDispatcher();
  
  // Debug info
  console.log('VariantForm productId:', productId);
  console.log('VariantForm variant data:', variant);
  
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
  
  // Attribuut gerelateerde state
  let attributes = variant?.ProductAttributes || [];
  let showAttributeModal = false;
  let deleteConfirmation = null;
  
  // Default waarden voor een nieuw attribuut
  let attributeFormData = {
    variant_id: variant?.variant_id || '',
    key: '',
    value: '',
    display_order: '',
    is_filterable: false,
    attribute_type: 'feature'
  };
  
  let attributeFormSubmitting = false;
  let attributeFormError = null;
  
  $: isKeyDisabled = attributeFormData.attribute_type === 'specification' || attributeFormData.attribute_type === 'feature';
  
  // Update de key op basis van het type als het disabled is
  $: if (isKeyDisabled) {
    attributeFormData.key = attributeFormData.attribute_type.charAt(0).toUpperCase() + attributeFormData.attribute_type.slice(1);
  }
  
  const handleSubmit = async () => {
    formSubmitting = true;
    formError = null;
    
    try {
      const isNew = !variant;
      // Beide endpoints zijn nu hetzelfde, maar de method verschilt
      const url = `/api/admin/products/variants`;
      const method = isNew ? 'POST' : 'PUT';
      
      // Converteer numerieke waarden
      const submissionData = {
        ...formData,
        product_id: productId,
        price_override: formData.price_override ? parseFloat(formData.price_override) : null,
        inventory_quantity: parseInt(formData.inventory_quantity, 10)
      };
      
      // Als we een bestaande variant bijwerken, voeg de id toe zoals de API verwacht
      if (!isNew && variant) {
        submissionData.id = variant.variant_id;
      }
      
      console.log(`${method} request to ${url}:`, submissionData);
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(submissionData)
      });
      
      // Verbeterde foutafhandeling
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
      
      const savedVariant = await response.json();
      console.log('Saved variant:', savedVariant);
      
      // Update variant_id en variant referentie voor attributen
      if (isNew) {
        variant = savedVariant;
        attributeFormData.variant_id = savedVariant.variant_id;
      }
      
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
  
  // Attribute handlers
  const openAddAttributeModal = (event) => {
    // Voorkom dat het event doorbubbles
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    
    // Reset form data voor een nieuw attribuut
    attributeFormData = {
      variant_id: variant?.variant_id || '',
      key: '',
      value: '',
      display_order: '0',
      is_filterable: false,
      attribute_type: 'feature'
    };
    
    attributeFormError = null;
    showAttributeModal = true;
  };
  
  const openEditAttributeModal = (attribute, event) => {
    // Voorkom dat het event doorbubbles
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    
    // Vul form data in met bestaand attribuut
    attributeFormData = {
      id: attribute.attribute_id,
      variant_id: attribute.variant_id,
      key: attribute.key,
      value: attribute.value,
      display_order: attribute.display_order,
      is_filterable: attribute.is_filterable,
      attribute_type: attribute.attribute_type
    };
    
    attributeFormError = null;
    showAttributeModal = true;
  };
  
  const closeAttributeModal = () => {
    showAttributeModal = false;
  };
  
  const handleSubmitAttribute = async () => {
    attributeFormSubmitting = true;
    attributeFormError = null;
    
    try {
      const isNew = !attributeFormData.id;
      const url = `/api/admin/attributes`;
      const method = isNew ? 'POST' : 'PUT';
      
      console.log(`${method} request to ${url}:`, attributeFormData);
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(attributeFormData)
      });
      
      // Foutafhandeling
      if (!response.ok) {
        let errorMessage = `Server error: ${response.status} ${response.statusText}`;
        
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorData.message || errorMessage;
        } catch (e) {
          const errorText = await response.text();
          errorMessage = errorText || errorMessage;
        }
        
        throw new Error(errorMessage);
      }
      
      const savedAttribute = await response.json();
      console.log('Saved attribute:', savedAttribute);
      
      // Update de attributenlijst
      if (isNew) {
        attributes = [...attributes, savedAttribute];
      } else {
        const index = attributes.findIndex(a => a.attribute_id === savedAttribute.attribute_id);
        if (index >= 0) {
          attributes[index] = savedAttribute;
          attributes = [...attributes]; // Svelte reactivity trigger
        }
      }
      
      showAttributeModal = false;
    } catch (error) {
      console.error('Error submitting attribute:', error);
      attributeFormError = error.message;
    } finally {
      attributeFormSubmitting = false;
    }
  };
  
  const confirmDelete = (attribute, event) => {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    deleteConfirmation = attribute;
  };
  
  const cancelDelete = () => {
    deleteConfirmation = null;
  };
  
  const deleteAttribute = async (attribute) => {
  try {
    const response = await fetch('/api/admin/attributes', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: attribute.attribute_id })
    });
    
    if (!response.ok) {
      throw new Error(`Fout bij verwijderen: ${response.status} ${response.statusText}`);
    }
    
    // Update lokale attributes array
    attributes = attributes.filter(a => a.attribute_id !== attribute.attribute_id);
    
    // Update ook de ProductAttributes van het variant object
    if (variant && variant.ProductAttributes) {
      variant.ProductAttributes = variant.ProductAttributes.filter(
        a => a.attribute_id !== attribute.attribute_id
      );
    }
    
    deleteConfirmation = null;
  } catch (error) {
    console.error('Error deleting attribute:', error);
    alert(`Fout bij verwijderen: ${error.message}`);
  }
};
  
  // Hulpfunctie om attribuuttypes gebruiksvriendelijk weer te geven
  const formatAttributeType = (type) => {
    const types = {
      'specification': 'Specificatie',
      'feature': 'Feature',
      'attribute': 'Attribuut',
      'custom': 'Custom'
    };
    return types[type] || type;
  };
  $: {
  if (variant && variant.ProductAttributes) {
    attributes = variant.ProductAttributes;
    console.log('Attributes updated from variant:', attributes);
  }
}
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
    
    <!-- Prijs override -->
    <div class="form-control">
      <label class="label" for="price_override">
        <span class="label-text">Price override ($)</span>
        <span class="label-text-alt">Leave empty for base price</span>
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
        <span class="label-text">Stock*</span>
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
        <span class="label-text">Color</span>
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
          placeholder="ex. Red or #FF0000" 
        />
      </div>
    </div>
    
    <!-- Maat -->
    <div class="form-control">
      <label class="label" for="size">
        <span class="label-text">Size</span>
      </label>
      <input 
        type="text" 
        id="size" 
        class="input input-bordered w-full" 
        bind:value={formData.size} 
        placeholder="ex. S, M, L, XL" 
      />
    </div>
    
    <!-- Gewicht -->
    <div class="form-control">
      <label class="label" for="weight">
        <span class="label-text">Weight</span>
      </label>
      <input 
        type="text" 
        id="weight" 
        class="input input-bordered w-full" 
        bind:value={formData.weight} 
        placeholder="ex. 500g, 1kg" 
      />
    </div>
  </div>
  
  <!-- Knoppen voor variant -->
  <div class="flex justify-end space-x-3 mt-6">
    <button type="button" class="btn btn-ghost" on:click={cancel}>
      Cancel
    </button>
    <button type="submit" class="btn btn-primary" disabled={formSubmitting}>
      {#if formSubmitting}
        <span class="loading loading-spinner loading-xs"></span>
      {/if}
      {variant ? 'Update' : 'Save'}
    </button>
  </div>
  
  <!-- Attributen sectie -->
  <div class="divider mt-8"></div>
  
  <!-- Attributenlijst -->
  <div class="space-y-4">
    <div class="flex justify-between items-center">
      <h3 class="text-lg font-medium">Attributes</h3>
      <button 
        type="button"
        class="btn btn-sm btn-primary" 
        on:click={openAddAttributeModal}
        disabled={!variant?.variant_id}
        title={!variant?.variant_id ? 'Sla de variant eerst op om attributen toe te voegen' : ''}
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
        </svg>
        Add an attribute
      </button>
    </div>
    
    {#if attributes.length === 0}
      <div class="text-center p-4 bg-base-200 rounded-lg">
        <p class="text-base-content opacity-70">No custom attributes for this variant</p>
      </div>
    {:else}
      <div class="overflow-x-auto">
        <table class="table table-zebra w-full">
          <thead>
            <tr>
              <th>Type</th>
              <th>Key</th>
              <th>Value</th>
              <th>Order</th>
              <th>Filterable</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {#each attributes as attribute}
              <tr>
                <td>{formatAttributeType(attribute.attribute_type)}</td>
                <td>{attribute.key}</td>
                <td>{attribute.value}</td>
                <td>{attribute.display_order}</td>
                <td>
                  {#if attribute.is_filterable}
                    <span class="badge badge-success">Ja</span>
                  {:else}
                    <span class="badge badge-ghost">Nee</span>
                  {/if}
                </td>
                <td class="flex gap-2">
                  <button type="button" class="btn btn-xs btn-ghost" on:click={(event) => openEditAttributeModal(attribute, event)}>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button type="button" class="btn btn-xs btn-ghost text-error" on:click={(event) => confirmDelete(attribute, event)}>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {/if}
  </div>
</form>

<!-- Attribuut Modal -->
{#if showAttributeModal}
<div class="modal modal-open">
  <div class="modal-box">
    <h3 class="font-bold text-lg mb-4">
      {attributeFormData.id ? 'Bewerk Attribuut' : 'Nieuw Attribuut Toevoegen'}
    </h3>
    
    <form on:submit|preventDefault={handleSubmitAttribute} class="space-y-4">
      {#if attributeFormError}
        <div class="alert alert-error">
          <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{attributeFormError}</span>
        </div>
      {/if}
      
      <!-- Attribuut type -->
      <div class="form-control">
        <label class="label" for="attribute_type">
          <span class="label-text">Type*</span>
        </label>
        <select 
          id="attribute_type" 
          class="select select-bordered w-full" 
          bind:value={attributeFormData.attribute_type} 
          required
        >
          <option value="specification">Specification</option>
          <option value="feature">Feature</option>
          <option value="attribute">Custom Attribute</option>
        </select>
      </div>
      
      <!-- Key -->
      <div class="form-control">
        <label class="label" for="key">
          <span class="label-text">Key*</span>
        </label>
        <input 
          type="text" 
          id="key" 
          class="input input-bordered w-full" 
          bind:value={attributeFormData.key} 
          disabled={isKeyDisabled}
          required 
        />
        {#if isKeyDisabled}
          <label class="label">
            <span class="label-text-alt">Automatically filled because of chosen type</span>
          </label>
        {/if}
      </div>
      
      <!-- Value -->
      <div class="form-control">
        <label class="label" for="value">
          <span class="label-text">Value*</span>
        </label>
        <textarea 
          id="value" 
          class="textarea textarea-bordered w-full" 
          bind:value={attributeFormData.value} 
          rows="3"
          required
        ></textarea>
      </div>
      
      <!-- Display order -->
      <div class="form-control">
        <label class="label" for="display_order">
          <span class="label-text">Display order</span>
        </label>
        <input 
          type="text" 
          id="display_order" 
          class="input input-bordered w-full" 
          bind:value={attributeFormData.display_order} 
          min="0" 
          step="1" 
        />
      </div>
      
      <!-- Is filterable -->
      <div class="form-control">
        <label class="label cursor-pointer justify-start gap-2">
          <input 
            type="checkbox" 
            class="checkbox" 
            bind:checked={attributeFormData.is_filterable} 
          />
          <span class="label-text">Filterable in storefront</span>
        </label>
      </div>
      
      <div class="modal-action">
        <button type="button" class="btn btn-ghost" on:click={closeAttributeModal}>
          Cancel
        </button>
        <button type="submit" class="btn btn-primary" disabled={attributeFormSubmitting}>
          {#if attributeFormSubmitting}
            <span class="loading loading-spinner loading-xs"></span>
          {/if}
          Save
        </button>
      </div>
    </form>
  </div>
</div>
{/if}

<!-- Delete bevestiging modal -->
{#if deleteConfirmation}
<div class="modal modal-open">
  <div class="modal-box">
    <h3 class="font-bold text-lg">Confirm deletion</h3>
    <p class="py-4">
      Are you sure you want to delete attribute: <span class="font-semibold">{deleteConfirmation.key}: {deleteConfirmation.value}</span>
    </p>
    <div class="modal-action">
      <button type="button" class="btn btn-ghost" on:click={cancelDelete}>Cancel</button>
      <button type="button" class="btn btn-error" on:click={() => deleteAttribute(deleteConfirmation)}>Delete</button>
    </div>
  </div>
</div>
{/if}