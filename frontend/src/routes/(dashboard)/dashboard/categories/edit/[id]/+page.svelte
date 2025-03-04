<script>
    // todo: there is a weird refresh bug when uploading and directly deleting an image. page must be reloaded before selectedImage is populated. FIX THIS!
    import { onMount } from "svelte";
    import { page } from "$app/state";
    import { goto } from '$app/navigation';

    export let data;

    let editorRef;
    let content = "";
    let edittingCategory = {};
    let categoryImages = []; // Your images array
    let selectedImage = null;
    let modal;
    let categories = data?.data || [];
    let parentCategoryId = null;
    
    // New image form variables
    let altText = "";
    let isPrimary = false;

    // Editor functies
    const format = (command, value = null) => {
        document.execCommand(command, false, value);
        editorRef.focus();
    };

    const clearFormatting = () => {
        document.execCommand('removeFormat');
        document.execCommand('formatBlock', false, '<div>');
        document.execCommand('formatBlock', false, '<p>');
    };

    // Function to sort images by sort_order
    const sortImagesByOrder = (images) => {
        return [...images].sort((a, b) => a.sort_order - b.sort_order);
    };

    onMount(async () => {
        // Fetch category data (which includes images)
        try {
            const response = await fetch(`/api/categories/${page.params.id}`);
            if (!response.ok) throw new Error('Failed to fetch category data');
            
            const categoryData = await response.json();
            edittingCategory = categoryData;
            
            if (!edittingCategory) {
                await goto('/dashboard/categories');
                return;
            }
            
            // Extract images from the category data and sort them
            categoryImages = sortImagesByOrder(edittingCategory.CategoryImages || []);
            
            content = edittingCategory.description || '';
            parentCategoryId = edittingCategory.parent_id;
            editorRef.innerHTML = content;
            
            console.log('Category data:', edittingCategory);
            console.log('Category images:', categoryImages);
        } catch (error) {
            console.error('Error fetching category data:', error);
            alert('Error loading category data');
        }
    });
    
    const saveDetails = async () => {
        try {
            const response = await fetch(`/api/admin/categories`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: edittingCategory.category_id,
                    name: edittingCategory.name,
                    description: content,
                    parent_id: parentCategoryId
                })
            });

            if (!response.ok) throw await response.json();
            alert('Successvol opgeslagen!');
        } catch (error) {
            alert(error.message || 'Opslaan mislukt');
        }
    };

    // Updated to work with your controller
    const uploadImage = async () => {
        try {
            const fileInput = document.querySelector('#imageUpload');
            if (!fileInput.files.length) return alert('First select an image to upload');

            const formData = new FormData();
            // Add the image file
            formData.append('image', fileInput.files[0]);
            
            // Add required category ID
            formData.append('category_id', edittingCategory.category_id);
            
            // Add optional fields
            formData.append('alt_text', altText);
            formData.append('is_primary', isPrimary);
            formData.append('sort_order', 0); // Default to 0 for new images

            const response = await fetch(`/api/admin/categories/images`, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Upload failed');
            }

            const result = await response.json();
            
            // Add the new image to the array and sort
            if (result.image) {
                categoryImages = sortImagesByOrder([...categoryImages, result.image]);
            }
            
            // Optionally refresh the whole category to ensure data is in sync
            const categoryResponse = await fetch(`/api/categories/${edittingCategory.public_id}`);
            if (categoryResponse.ok) {
                const updatedCategory = await categoryResponse.json();
                categoryImages = sortImagesByOrder(updatedCategory.CategoryImages || []);
            }
            
            // Reset form
            fileInput.value = '';
            altText = '';
            isPrimary = false;
            
            alert('Image uploaded successfully');
        } catch (error) {
            alert(error.message || 'Upload mislukt');
        }
    };
    
    // Delete image function
    const deleteImage = async (imageId) => {
        try {
            const response = await fetch(`/api/admin/categories/images`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: imageId })
            });

            if (!response.ok) {
                throw new Error('Verwijderen mislukt');
            }
            
            // Remove the deleted image from the array
            categoryImages = sortImagesByOrder(categoryImages.filter(img => img.image_id !== imageId));
            
            // Optionally refresh the category data to ensure sync
            try {
                const categoryResponse = await fetch(`/api/categories/${edittingCategory.public_id}`);
                if (categoryResponse.ok) {
                    const updatedCategory = await categoryResponse.json();
                    categoryImages = sortImagesByOrder(updatedCategory.CategoryImages || []);
                }
            } catch (refreshError) {
                console.error('Error refreshing category data:', refreshError);
            }
            
            modal.close();
        } catch (error) {
            console.error('Delete error:', error);
            alert('Fout bij verwijderen');
        }
    };
    
    // Edit image function - corrected to use the right endpoint
    const editImage = async () => {
        if (!selectedImage) return;
        
        try {
            const response = await fetch(`/api/admin/categories/images`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    image_id: selectedImage.image_id,
                    alt_text: selectedImage.alt_text,
                    is_primary: selectedImage.is_primary,
                    sort_order: selectedImage.sort_order
                })
            });

            if (!response.ok) {
                throw new Error('Update mislukt');
            }

            const result = await response.json();
            
            // Update the image in the array and resort
            categoryImages = sortImagesByOrder(
                categoryImages.map(img => 
                    img.image_id === result.image.image_id ? result.image : img
                )
            );
            
            modal.close();
            alert('Image updated successfully');
        } catch (error) {
            alert(error.message || 'Update mislukt');
        }
    };
    
    // New function to update sort order
    const updateSortOrder = async (image, increment) => {
        const newSortOrder = image.sort_order + (increment ? 1 : -1);
        
        try {
            const response = await fetch(`/api/admin/categories/images`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    image_id: image.image_id,
                    alt_text: image.alt_text,
                    is_primary: image.is_primary,
                    sort_order: newSortOrder
                })
            });

            if (!response.ok) {
                throw new Error('Update sort order failed');
            }

            const result = await response.json();
            
            // Update the image in the array and resort
            categoryImages = sortImagesByOrder(
                categoryImages.map(img => 
                    img.image_id === result.image.image_id ? result.image : img
                )
            );
            
        } catch (error) {
            alert(error.message || 'Update sort order failed');
        }
    };
    
    // New function to set an image as primary
    const setAsPrimary = async (image) => {
        try {
            const response = await fetch(`/api/admin/categories/images`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    image_id: image.image_id,
                    alt_text: image.alt_text, 
                    is_primary: true,
                    sort_order: image.sort_order
                })
            });

            if (!response.ok) {
                throw new Error('Set as primary failed');
            }

            const result = await response.json();
            
            // Update all images to reflect the change in primary status
            const categoryResponse = await fetch(`/api/categories/${edittingCategory.public_id}`);
            if (categoryResponse.ok) {
                const updatedCategory = await categoryResponse.json();
                categoryImages = sortImagesByOrder(updatedCategory.CategoryImages || []);
            }
            
        } catch (error) {
            alert(error.message || 'Set as primary failed');
        }
    };
</script>

<a href="/dashboard/categories" class="flex items-center gap-2">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...$$props}>
        <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m5 12l6-6m-6 6l6 6m-6-6h14" />
    </svg>
    <p class="text-2xl">Categories</p>
</a>

<div class="flex flex-col md:flex-row gap-4 mt-5">
    <!-- Linkerkolom -->
    <div class="bg-base-200 p-4 rounded-lg w-full md:w-8/12 border border-base-300">
        <h3 class="text-xl font-bold mb-2">Title:</h3>
        <input
            bind:value={edittingCategory.name}
            class="input input-bordered w-full"
            placeholder="Ex. Summercollection, Bike accessoires"
        />

        <h3 class="text-xl font-bold mt-4 mb-2">Description:</h3>

        <div class="border border-base-300 rounded-lg">
            <!-- Toolbar -->
            <div class="flex flex-wrap gap-1 p-2 bg-base-300 border-b border-base-300">
                {#each ['h1', 'h2', 'h3'] as heading}
                    <button
                        on:click={() => format('formatBlock', `<${heading}>`)}
                        class="btn btn-xs btn-primary"
                    >
                        {heading.toUpperCase()}
                    </button>
                {/each}

                <div class="divider divider-horizontal mx-1"></div>

                {#each ['bold', 'italic', 'underline', 'strikeThrough'] as cmd}
                    <button on:click={() => format(cmd)} class="btn btn-xs">
                        {#if cmd === 'bold'}<strong>B</strong>
                        {:else if cmd === 'italic'}<em>I</em>
                        {:else if cmd === 'underline'}<u>U</u>
                        {:else}<s>S</s>{/if}
                    </button>
                {/each}

                <div class="divider divider-horizontal mx-1"></div>

                {#each [{ symbol: '←', cmd: 'justifyLeft' }, { symbol: '↔', cmd: 'justifyCenter' }, { symbol: '→', cmd: 'justifyRight' }] as align}
                    <button on:click={() => format(align.cmd)} class="btn btn-xs">
                        {align.symbol}
                    </button>
                {/each}

                <button on:click={clearFormatting} class="btn btn-xs btn-error ml-2">
                    Clear
                </button>
            </div>

            <!-- Editor --> 
            <div
                bind:this={editorRef}
                contenteditable
                on:input={(e) => content = e.target.innerHTML}
                class="p-4 min-h-[200px] prose focus:outline-none bg-base-100 overflow-scroll"
            ></div>
        </div>
    </div>

    <!-- Rechterkolom -->
    <div class="bg-base-200 p-4 rounded-lg w-full md:w-4/12 border border-base-300 h-full">
        <div class="flex flex-col h-full justify-between">
            <div class="space-y-4">
                <div>
                    <label class="font-bold block mb-2">Main Category:</label>
                    <select class="select select-bordered w-full" bind:value={parentCategoryId}>
                        <option value={null}>None</option>
                        {#each categories.filter(c => !c.parent_id && c.category_id !== edittingCategory.category_id) as category}
                            <option value={category.category_id}>{category.name}</option>
                        {/each}
                    </select>
                </div>
    
                <div>
                    <label class="font-bold block mb-2">Upload Image:</label>
                    
                    <!-- Image upload form -->
                    <input
                        id="imageUpload"
                        type="file"
                        class="file-input file-input-bordered w-full"
                        accept="image/*"
                    />
                    
                    <!-- Additional image fields -->
                    <div class="mt-2">
                        <label class="block mb-1">Alt Text:</label>
                        <input 
                            type="text" 
                            bind:value={altText} 
                            class="input input-bordered w-full"
                            placeholder="Image description"
                        />
                    </div>
                    
                    <div class="mt-2 flex items-center">
                        <label class="block mr-2">Primary Image:</label>
                        <input 
                            type="checkbox" 
                            bind:checked={isPrimary} 
                            class="checkbox" 
                        />
                    </div>
                    
                    <button
                        on:click={uploadImage}
                        class="btn btn-primary w-full mt-2"
                    >
                        Upload Image
                    </button>
                </div>
            </div>
    
            <button
                on:click={saveDetails}
                class="btn btn-success w-full mt-4"
            >
                Save
            </button>
        </div>
    </div>
</div>

{#if Array.isArray(categoryImages) && categoryImages.length > 0}
    <div class="bg-base-200 p-4 rounded-lg mt-4 border border-base-300">
        <h3 class="font-bold mb-3">Uploaded images:</h3>
        <div class="flex flex-wrap gap-4">
            {#each categoryImages as image}
                <div class="relative group bg-base-100 p-2 rounded-lg shadow">
                    <button on:click={() => {
                        selectedImage = {...image};
                        modal.showModal();
                    }}>
                        <img
                            src={image.url}
                            alt={image.alt_text || "Category image"}
                            class="h-32 w-32 object-cover rounded-lg"
                        />
                        {#if image.is_primary}
                            <div class="absolute top-0 right-0 bg-success text-white px-2 py-1 text-xs rounded-bl">
                                Primary
                            </div>
                        {/if}
                    </button>
                    
                    <!-- Image controls -->
                    <div class="flex justify-between mt-2">
                        <!-- Sort order controls -->
                        <div class="flex items-center gap-2">
                            <button 
                                on:click={() => updateSortOrder(image, false)}
                                class="btn btn-xs btn-circle"
                                disabled={image.sort_order <= 0}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"></path><path d="M19 12H5"></path></svg>
                            </button>
                            <span class="text-xs">{image.sort_order}</span>
                            <button 
                                on:click={() => updateSortOrder(image, true)}
                                class="btn btn-xs btn-circle"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                            </button>
                        </div>
                        
                        <!-- Primary button -->
                        {#if !image.is_primary}
                            <button 
                                on:click={() => setAsPrimary(image)}
                                class="btn btn-xs btn-success"
                                title="Set as primary image"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 2-5.6 5.6a8 8 0 1 0 11.2 0L12 2z"></path></svg>
                            </button>
                        {/if}
                    </div>
                </div>
            {/each}
        </div>
    </div>

    <dialog bind:this={modal} id="image_modal" class="modal">
        <div class="modal-box">
            {#if selectedImage}
                <img
                    src={selectedImage.url}
                    alt={selectedImage.alt_text || "Selected image"}
                    class="w-full h-64 object-contain mb-4"
                />
                
                <!-- Edit image form -->
                <div class="mb-4">
                    <div class="form-control mb-2">
                        <label class="label">Alt Text</label>
                        <input 
                            type="text" 
                            bind:value={selectedImage.alt_text} 
                            class="input input-bordered"
                        />
                    </div>
                    
                    <div class="form-control mb-2">
                        <label class="label flex justify-start gap-2">
                            <input 
                                type="checkbox" 
                                bind:checked={selectedImage.is_primary} 
                                class="checkbox" 
                            />
                            <span>Primary Image</span>
                        </label>
                    </div>
                    
                    <div class="form-control mb-2">
                        <label class="label">Sort Order</label>
                        <div class="flex items-center gap-2">
                            <button 
                                on:click={() => selectedImage.sort_order = Math.max(0, selectedImage.sort_order - 1)}
                                class="btn btn-sm"
                                disabled={selectedImage.sort_order <= 0}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"></path><path d="M19 12H5"></path></svg>
                            </button>
                            <span>{selectedImage.sort_order}</span>
                            <button 
                                on:click={() => selectedImage.sort_order += 1}
                                class="btn btn-sm"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                            </button>
                        </div>
                    </div>
                    
                    <button 
                        class="btn btn-primary w-full mt-2"
                        on:click={editImage}
                    >
                        Save Changes
                    </button>
                </div>
                
                <div class="modal-action flex justify-between">
                    <button
                        class="btn btn-error"
                        on:click|preventDefault={() => deleteImage(selectedImage.image_id)}
                    >
                        Delete
                    </button>
                    <form method="dialog">
                        <button class="btn">Close</button>
                    </form>
                </div>
            {/if}
        </div>
    </dialog>
{:else}
    <div class="bg-base-200 p-4 rounded-lg mt-4 border border-base-300">
        <p>No images uploaded yet.</p>
    </div>
{/if}