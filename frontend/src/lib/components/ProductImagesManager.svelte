<!-- lib/components/ProductImagesManager.svelte -->
<script>
  import { onMount } from 'svelte';
  
  // Props
  export let product = null;
  export let onRefresh = () => {}; // Callback for when images are updated
  
  // State variables
  let uploadingImage = false;
  let updatingOrder = false; // Nieuwe state voor sorteren
  let error = null;
  let success = null;
  let selectedFile = null;
  let fileInput;
  let previewUrl = null;
  let showEnlargedImage = false;
  let enlargedImageUrl = '';
  let uploadVariantId = null; // For tracking which variant we're uploading to
  let formData = {
    alt_text: '',
    is_primary: false
  };
  
  // Reset form after upload
  const resetForm = () => {
    formData = {
      alt_text: '',
      is_primary: false
    };
    selectedFile = null;
    previewUrl = null;
    uploadVariantId = null;
  };

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    selectedFile = file;
    formData.alt_text = file.name.split('.')[0]; // Set alt text to filename by default
    
    // Create preview URL
    previewUrl = URL.createObjectURL(file);
  };

  // Upload image
  const uploadImage = async () => {
    if (!selectedFile) {
      error = "Selecteer eerst een bestand";
      return;
    }
    
    uploadingImage = true;
    error = null;
    success = null;
    
    try {
      const imageFormData = new FormData();
      // Stuur het bestand als 'image' zoals de controller verwacht
      imageFormData.append('image', selectedFile);
      
      // Add other form data
      imageFormData.append('alt_text', formData.alt_text);
      imageFormData.append('is_primary', formData.is_primary);
      
      // Append product_id or variant_id depending on selected option
      if (uploadVariantId) {
        imageFormData.append('variant_id', uploadVariantId);
      } else {
        imageFormData.append('product_id', product.product_id);
      }
      
      console.log('Uploading image to product or variant:', uploadVariantId ? 'Variant ID: ' + uploadVariantId : 'Product ID: ' + product.product_id);
      
      // Je controller is verbonden aan /images en gebruikt multer.single('image')
      const response = await fetch('/api/admin/products/images', {
        method: 'POST',
        body: imageFormData
      });
      
      console.log('Upload response status:', response.status, response.statusText);
      
      if (!response.ok) {
        // Probeer eerst als JSON te parsen, maar val terug op de statusText als dat mislukt
        try {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Kon afbeelding niet uploaden');
        } catch (jsonError) {
          throw new Error('Kon afbeelding niet uploaden: ' + response.statusText);
        }
      }
      
      // Probeer het resultaat als JSON te parsen, maar zorg voor fallback als dat mislukt
      try {
        const result = await response.json();
        console.log('Upload result:', result);
      } catch (err) {
        console.log('Respons was geen JSON, maar upload lijkt geslaagd');
      }
      
      success = 'Afbeelding succesvol geüpload';
      
      // Reset the form
      resetForm();
      fileInput.value = '';
      
      // Refresh product data to get updated images
      onRefresh();
    } catch (err) {
      console.error('Error uploading image:', err);
      error = err.message;
    } finally {
      uploadingImage = false;
    }
  };
  
  // Update image - needed for changing sort order
  const updateImage = async (imageId, updates) => {
    error = null;
    
    try {
      console.log('Updating image:', imageId, updates);
      
      const response = await fetch('/api/admin/products/images', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          id: imageId,
          ...updates
        })
      });
      
      console.log('Update response status:', response.status, response.statusText);
      
      if (!response.ok) {
        throw new Error('Kon afbeelding niet bijwerken');
      }
      
      // Return success
      return true;
    } catch (err) {
      console.error('Error updating image:', err);
      error = err.message;
      return false;
    }
  };
  
  // Normalize sort orders - ensure they are sequential starting from 0
  const normalizeSortOrders = async (images) => {
    if (!images || images.length === 0) return;
    
    // Sort images by current sort_order
    const sortedImages = [...images].sort((a, b) => a.sort_order - b.sort_order);
    
    // Keep track of whether all updates succeeded
    let allSucceeded = true;
    
    // Update sort_order to be sequential from 0
    for (let i = 0; i < sortedImages.length; i++) {
      const image = sortedImages[i];
      if (image.sort_order !== i) {
        console.log(`Normalizing image ${image.image_id} sort_order from ${image.sort_order} to ${i}`);
        const success = await updateImage(image.image_id, { sort_order: i });
        if (!success) {
          allSucceeded = false;
        } else {
          // Update local state for UI to reflect change
          image.sort_order = i;
        }
      }
    }
    
    return allSucceeded;
  };
  
  // Move image in sort order
  const moveImage = async (image, direction, imageSet) => {
    if (updatingOrder) return; // Prevent multiple clicks during update
    updatingOrder = true;
    error = null;
    success = null;
    
    try {
      // First normalize all sort_orders to ensure they are sequential
      await normalizeSortOrders(imageSet);
      
      // Get all images from the same context (product or variant)
      const allImages = [...imageSet].sort((a, b) => a.sort_order - b.sort_order);
      
      // Find current image index by sort_order
      const currentIndex = allImages.findIndex(img => img.image_id === image.image_id);
      
      if (currentIndex === -1) {
        throw new Error('Afbeelding niet gevonden');
      }
      
      let targetIndex;
      if (direction === 'left' && currentIndex > 0) {
        // Move left (lower sort order)
        targetIndex = currentIndex - 1;
      } else if (direction === 'right' && currentIndex < allImages.length - 1) {
        // Move right (higher sort order)
        targetIndex = currentIndex + 1;
      } else {
        // Can't move further
        updatingOrder = false;
        return;
      }
      
      // Swap sort_order with target image
      const targetImage = allImages[targetIndex];
      
      console.log(`Moving image ${image.image_id} from position ${currentIndex} (sort_order ${image.sort_order}) to position ${targetIndex} (sort_order ${targetImage.sort_order})`);
      
      // Update target image first
      const targetSuccess = await updateImage(targetImage.image_id, { sort_order: image.sort_order });
      if (!targetSuccess) {
        throw new Error('Kon volgorde niet bijwerken');
      }
      
      // Update current image
      const currentSuccess = await updateImage(image.image_id, { sort_order: targetImage.sort_order });
      if (!currentSuccess) {
        // Try to revert the first change
        await updateImage(targetImage.image_id, { sort_order: targetImage.sort_order });
        throw new Error('Kon volgorde niet bijwerken');
      }
      
      // Update local data for immediate UI feedback
      const tempOrder = image.sort_order;
      image.sort_order = targetImage.sort_order;
      targetImage.sort_order = tempOrder;
      
      success = 'Volgorde succesvol bijgewerkt';
      
      // Only refresh data from server if needed
      await onRefresh();
    } catch (err) {
      console.error('Error moving image:', err);
      error = err.message;
    } finally {
      updatingOrder = false;
    }
  };
  
  // Delete image
  const deleteImage = async (imageId) => {
    if (!confirm('Weet je zeker dat je deze afbeelding wilt verwijderen?')) {
      return;
    }
    
    error = null;
    success = null;
    
    try {
      console.log('Deleting image with ID:', imageId);
      
      const response = await fetch('/api/admin/products/images', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: imageId })
      });
      
      console.log('Delete response status:', response.status, response.statusText);
      
      if (!response.ok) {
        throw new Error('Kon afbeelding niet verwijderen');
      }
      
      success = 'Afbeelding succesvol verwijderd';
      
      // Refresh product data
      onRefresh();
    } catch (err) {
      console.error('Error deleting image:', err);
      error = err.message;
    }
  };
  
  // Show enlarged image
  const showImage = (url) => {
    enlargedImageUrl = url;
    showEnlargedImage = true;
  };
  
  // Close enlarged image
  const closeEnlargedImage = () => {
    showEnlargedImage = false;
  };
  
  // Set as primary image
  // Set as primary image
// Set as primary image
const setPrimaryImage = async (image, isProduct = true) => {
  if (image.is_primary) return; // Already primary
  
  error = null;
  success = null;
  
  try {
    // Update the image to be primary
    const updateSuccess = await updateImage(image.image_id, { is_primary: true });
    if (updateSuccess) {
      // Update local state for immediate UI feedback
      // Find all images in the same group and set is_primary to false
      const imageSet = isProduct ? product.ProductImages : 
        product.ProductVariants.find(v => v.variant_id === image.variant_id)?.VariantImages;
      
      if (imageSet) {
        for (let img of imageSet) {
          img.is_primary = img.image_id === image.image_id;
        }
      }
      
      // Set success message correctly
      success = 'Hoofdafbeelding succesvol ingesteld';
      
      // Also refresh from server to ensure data consistency
      setTimeout(() => onRefresh(), 500);
    }
  } catch (err) {
    error = err.message;
  }
};
  
  // When the component is mounted, ensure sort orders are normalized
  onMount(async () => {
    if (product) {
      // Normalize product images sort order
      if (product.ProductImages && product.ProductImages.length > 1) {
        await normalizeSortOrders(product.ProductImages);
      }
      
      // Normalize variant images sort order
      if (product.ProductVariants) {
        for (const variant of product.ProductVariants) {
          if (variant.VariantImages && variant.VariantImages.length > 1) {
            await normalizeSortOrders(variant.VariantImages);
          }
        }
      }
    }
  });
</script>

<div class="bg-base-200 p-6 rounded-lg">
  <h2 class="text-2xl font-bold mb-4">Productafbeeldingen</h2>
  
  <!-- Upload form -->
  <div class="card bg-base-100 shadow-md mb-6">
    <div class="card-body">
      <h3 class="card-title">Nieuwe afbeelding uploaden</h3>
      
      {#if error}
        <div class="alert alert-error mt-2 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>{error}</span>
        </div>
      {/if}
      
      {#if success}
        <div class="alert alert-success mt-2 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{success}</span>
        </div>
      {/if}
      
      <div class="form-control w-full mb-4">
        <label class="label">
          <span class="label-text font-medium">Toevoegen aan</span>
        </label>
        <select 
          class="select select-bordered w-full"
          bind:value={uploadVariantId}
        >
          <option value={null}>Hoofdproduct</option>
          {#if product.ProductVariants && product.ProductVariants.length > 0}
            <optgroup label="Varianten">
              {#each product.ProductVariants as variant}
                <option value={variant.variant_id}>
                  {variant.sku} - {variant.size ? `Maat: ${variant.size}` : ''} 
                  {variant.color ? `Kleur: ${variant.color}` : ''}
                </option>
              {/each}
            </optgroup>
          {/if}
        </select>
      </div>
      
      <div class="form-control w-full mb-4">
        <label class="label">
          <span class="label-text font-medium">Afbeelding</span>
        </label>
        <input 
          type="file" 
          bind:this={fileInput}
          on:change={handleFileChange} 
          accept="image/*"
          class="file-input file-input-bordered w-full" 
        />
      </div>
      
      {#if previewUrl}
        <div class="mb-4">
          <p class="font-medium mb-2">Voorbeeld:</p>
          <img src={previewUrl} alt="Preview" class="max-h-40 rounded-md shadow-sm" />
        </div>
      {/if}
      
      <div class="form-control w-full mb-4">
        <label class="label">
          <span class="label-text font-medium">Alt tekst</span>
        </label>
        <input 
          type="text" 
          bind:value={formData.alt_text} 
          placeholder="Beschrijving van de afbeelding"
          class="input input-bordered w-full" 
        />
      </div>
      
      <div class="form-control w-full mb-4">
        <label class="label cursor-pointer justify-start gap-4">
          <input 
            type="checkbox" 
            bind:checked={formData.is_primary} 
            class="checkbox" 
          />
          <span class="label-text">Gebruiken als hoofdafbeelding</span>
        </label>
      </div>
      
      <div class="card-actions justify-end">
        <button 
          class="btn btn-primary" 
          on:click={uploadImage} 
          disabled={uploadingImage || !selectedFile}
        >
          {#if uploadingImage}
            <span class="loading loading-spinner loading-sm"></span>
          {/if}
          Uploaden
        </button>
      </div>
    </div>
  </div>
  
  <!-- Product Images -->
  <div class="card bg-base-100 shadow-md mb-6">
    <div class="card-body">
      <h3 class="card-title">Productafbeeldingen</h3>
      
      <div class="mt-2 mb-3 text-sm text-base-content/70">
        <p>Gebruik de pijltjes om de volgorde van de afbeeldingen aan te passen.</p>
      </div>
      
      {#if !product.ProductImages || product.ProductImages.length === 0}
        <div class="p-4 text-center text-base-content/60">
          Geen afbeeldingen voor dit product
        </div>
      {:else}
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {#each [...product.ProductImages].sort((a, b) => a.sort_order - b.sort_order) as image, index}
            <div class="card bg-base-200 shadow-sm">
              <figure class="pt-4 px-4">
                <img 
                  src={image.url} 
                  alt={image.alt_text} 
                  class="rounded-md h-40 object-contain cursor-pointer" 
                  on:click={() => showImage(image.url)}
                />
              </figure>
              <div class="card-body p-4">
                {#if image.is_primary}
                  <div class="badge badge-primary mb-2">Hoofdafbeelding</div>
                {/if}
                <p class="text-sm truncate" title={image.alt_text}>{image.alt_text}</p>
                
                <div class="flex items-center justify-between gap-2 mt-3 mb-1">
                  <!-- Positie verplaats knoppen -->
                  <div class="flex gap-1">
                    <button 
                      class="btn btn-xs btn-circle" 
                      disabled={index === 0 || updatingOrder}
                      on:click={() => moveImage(image, 'left', product.ProductImages)}
                      title="Naar links verplaatsen"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button 
                      class="btn btn-xs btn-circle" 
                      disabled={index === product.ProductImages.length - 1 || updatingOrder}
                      on:click={() => moveImage(image, 'right', product.ProductImages)}
                      title="Naar rechts verplaatsen"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                  
                  <!-- Order info (for debugging) -->
                  <div class="badge badge-outline">#{image.sort_order+1}</div>
                  
                  <!-- Acties -->
                  <div class="flex gap-1">
                    {#if !image.is_primary}
                      <button 
                        class="btn btn-xs btn-outline btn-primary"
                        on:click={() => setPrimaryImage(image, true)}
                        title="Als hoofdafbeelding instellen"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                      </button>
                    {/if}
                    <button 
                      class="btn btn-xs btn-error"
                      on:click={() => deleteImage(image.image_id)}
                      title="Verwijderen"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  </div>
  
  <!-- Variant Images -->
  {#if product.ProductVariants && product.ProductVariants.length > 0}
    {#each product.ProductVariants as variant}
      {#if variant.VariantImages && variant.VariantImages.length > 0}
        <div class="card bg-base-100 shadow-md mb-6">
          <div class="card-body">
            <h3 class="card-title">
              Afbeeldingen voor variant: {variant.sku}
              {#if variant.size} - Maat: {variant.size}{/if}
              {#if variant.color} - Kleur: {variant.color}{/if}
            </h3>
            
            <div class="mt-2 mb-3 text-sm text-base-content/70">
              <p>Gebruik de pijltjes om de volgorde van de afbeeldingen aan te passen.</p>
            </div>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {#each [...variant.VariantImages].sort((a, b) => a.sort_order - b.sort_order) as image, index}
                <div class="card bg-base-200 shadow-sm">
                  <figure class="pt-4 px-4">
                    <img 
                      src={image.url} 
                      alt={image.alt_text} 
                      class="rounded-md h-40 object-contain cursor-pointer" 
                      on:click={() => showImage(image.url)}
                    />
                  </figure>
                  <div class="card-body p-4">
                    {#if image.is_primary}
                      <div class="badge badge-primary mb-2">Hoofdafbeelding</div>
                    {/if}
                    <p class="text-sm truncate" title={image.alt_text}>{image.alt_text}</p>
                    
                    <div class="flex items-center justify-between gap-2 mt-3 mb-1">
                      <!-- Positie verplaats knoppen -->
                      <div class="flex gap-1">
                        <button 
                          class="btn btn-xs btn-circle" 
                          disabled={index === 0 || updatingOrder}
                          on:click={() => moveImage(image, 'left', variant.VariantImages)}
                          title="Naar links verplaatsen"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <button 
                          class="btn btn-xs btn-circle" 
                          disabled={index === variant.VariantImages.length - 1 || updatingOrder}
                          on:click={() => moveImage(image, 'right', variant.VariantImages)}
                          title="Naar rechts verplaatsen"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                      
                      <!-- Order info (for debugging) -->
                      <div class="badge badge-outline">#{image.sort_order+1}</div>
                      
                      <!-- Acties -->
                      <div class="flex gap-1">
                        {#if !image.is_primary}
                          <button 
                            class="btn btn-xs btn-outline btn-primary"
                            on:click={() => setPrimaryImage(image, false)}
                            title="Als hoofdafbeelding instellen"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                            </svg>
                          </button>
                        {/if}
                        <button 
                          class="btn btn-xs btn-error"
                          on:click={() => deleteImage(image.image_id)}
                          title="Verwijderen"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              {/each}
            </div>
          </div>
        </div>
      {/if}
    {/each}
  {/if}
  
  <!-- Enlarged image modal -->
  {#if showEnlargedImage}
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-4" on:click={closeEnlargedImage}>
      <div class="relative max-w-4xl max-h-full">
        <button 
          class="absolute top-2 right-2 btn btn-sm btn-circle bg-base-100"
          on:click|stopPropagation={closeEnlargedImage}
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <img 
          src={enlargedImageUrl} 
          alt="Uitvergrote afbeelding" 
          class="max-h-screen max-w-full rounded-lg shadow-xl"
          on:click|stopPropagation={() => {}}
        />
      </div>
    </div>
  {/if}
  
  {#if updatingOrder}
    <div class="fixed bottom-4 right-4 bg-primary text-white p-2 rounded-lg shadow-lg">
      <span class="flex items-center">
        <span class="loading loading-spinner loading-sm mr-2"></span>
        Volgorde bijwerken...
      </span>
    </div>
  {/if}
</div>