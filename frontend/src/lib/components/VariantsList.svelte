<script>
    import { onMount } from 'svelte';
    import VariantForm from './VariantForm.svelte';
    
    export let productId;
    export let variants = [];
    
    let isAddingVariant = false;
    let editingVariantId = null;
    let showDeleteModal = false;
    let variantToDelete = null;
    
    // Functie om een variant toe te voegen
    const addVariant = () => {
      isAddingVariant = true;
      editingVariantId = null;
    };
    
    // Functie om een variant te bewerken
    const editVariant = (variantId) => {
      editingVariantId = variantId;
      isAddingVariant = false;
    };
    
    // Functie om het bewerken te annuleren
    const cancelEdit = () => {
      isAddingVariant = false;
      editingVariantId = null;
    };
    
    // Functie om te bevestigen dat een variant is opgeslagen
    const handleVariantSaved = async (event) => {
      const savedVariant = event.detail;
      
      // Ververs de lijst met varianten
      try {
        const res = await fetch(`/api/products/${productId}`);
        if (res.ok) {
          const product = await res.json();
          variants = product.ProductVariants || [];
        }
      } catch (error) {
        console.error('Error refreshing variants:', error);
      }
      
      // Reset de bewerkingsmodus
      isAddingVariant = false;
      editingVariantId = null;
    };
    
    // Functie om een variant te verwijderen
    const confirmDeleteVariant = (variant) => {
      variantToDelete = variant;
      showDeleteModal = true;
    };
    
    const deleteVariant = async () => {
      if (!variantToDelete) return;
      
      try {
        const res = await fetch(`/api/variants/${variantToDelete.variant_id}`, {
          method: 'DELETE'
        });
        
        if (!res.ok) throw new Error('Variant kon niet worden verwijderd');
        
        // Variant uit de lijst verwijderen
        variants = variants.filter(v => v.variant_id !== variantToDelete.variant_id);
        
        // Reset
        showDeleteModal = false;
        variantToDelete = null;
      } catch (error) {
        console.error('Error deleting variant:', error);
        alert(`Fout bij het verwijderen: ${error.message}`);
      }
    };
    
    // Helper functie om prijs te formatteren
    const formatPrice = (price) => {
      if (!price && price !== 0) return "N/A";
      return new Intl.NumberFormat('nl-NL', {
        style: 'currency',
        currency: 'EUR'
      }).format(price);
    };
  </script>
  
  <div>
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold">Productvarianten</h2>
      <button class="btn btn-primary" on:click={addVariant} disabled={isAddingVariant || editingVariantId !== null}>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Variant toevoegen
      </button>
    </div>
    
    {#if isAddingVariant}
      <div class="bg-base-100 p-4 rounded-lg mb-6 border border-base-300">
        <h3 class="text-xl font-semibold mb-4">Nieuwe variant</h3>
        <VariantForm 
          {productId} 
          on:save={handleVariantSaved}
          on:cancel={cancelEdit}
        />
      </div>
    {/if}
    
    {#if editingVariantId}
      <div class="bg-base-100 p-4 rounded-lg mb-6 border border-base-300">
        <h3 class="text-xl font-semibold mb-4">Variant bewerken</h3>
        <VariantForm 
          {productId} 
          variant={variants.find(v => v.variant_id === editingVariantId)}
          on:save={handleVariantSaved}
          on:cancel={cancelEdit}
        />
      </div>
    {/if}
    
    {#if variants.length === 0}
      <div class="text-center p-8 bg-base-100 rounded-lg border border-base-300">
        <p class="text-lg text-base-content/70">Geen varianten gevonden voor dit product.</p>
        <p class="mt-2">Klik op 'Variant toevoegen' om de eerste variant aan te maken.</p>
      </div>
    {:else}
      <div class="overflow-x-auto">
        <table class="table w-full">
          <thead>
            <tr>
              <th>SKU</th>
              <th>Kleur</th>
              <th>Maat</th>
              <th>Gewicht</th>
              <th>Prijs</th>
              <th>Voorraad</th>
              <th>Acties</th>
            </tr>
          </thead>
          <tbody>
            {#each variants as variant (variant.variant_id)}
              <tr class="hover">
                <td>{variant.sku}</td>
                <td>
                  {#if variant.color}
                    <div class="flex items-center gap-2">
                      <div class="w-4 h-4 rounded-full" style="background-color: {variant.color}"></div>
                      {variant.color}
                    </div>
                  {:else}
                    -
                  {/if}
                </td>
                <td>{variant.size || '-'}</td>
                <td>{variant.weight || '-'}</td>
                <td>{formatPrice(variant.price_override)}</td>
                <td>{variant.inventory_quantity || 0}</td>
                <td class="flex gap-2">
                  <button 
                    class="btn btn-sm btn-ghost" 
                    on:click={() => editVariant(variant.variant_id)}
                    disabled={isAddingVariant || editingVariantId !== null}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                  <button 
                    class="btn btn-sm btn-ghost text-error" 
                    on:click={() => confirmDeleteVariant(variant)}
                    disabled={isAddingVariant || editingVariantId !== null}
                  >
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
    
    <!-- Delete confirmation modal -->
    {#if showDeleteModal}
      <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div class="bg-base-100 p-6 rounded-lg max-w-md w-full">
          <h3 class="text-lg font-bold mb-4">Variant verwijderen</h3>
          <p class="mb-6">
            Weet je zeker dat je de variant "{variantToDelete?.sku}" wilt verwijderen?
            Dit kan niet ongedaan worden gemaakt.
          </p>
          <div class="flex justify-end gap-3">
            <button class="btn btn-ghost" on:click={() => { showDeleteModal = false; variantToDelete = null; }}>
              Annuleren
            </button>
            <button class="btn btn-error" on:click={deleteVariant}>
              Verwijderen
            </button>
          </div>
        </div>
      </div>
    {/if}
  </div>