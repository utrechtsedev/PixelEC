<script> // todo: there is a weird refresh bug when uploading and directly deleting an image. page must be reloaded before selectedImage is populated. FIX THIS!
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

    onMount(async () => {
        edittingCategory = categories.find(c => c.category_id == page.params.id);

        if (!edittingCategory) {
            await goto('/dashboard/categories');
            return;
        }

        content = edittingCategory.description || '';
        parentCategoryId = edittingCategory.parent_id;
        if (editorRef) editorRef.innerHTML = content;

        //fetch all category images
        let req = await (await fetch(`/api/categories/images/${page.params.id}`))
        categoryImages = await req.json();
        console.log(categoryImages)
    });
    const saveDetails = async () => {
        try {

            const response = await fetch(`/api/categories/${page.params.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
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

    const uploadImages = async () => {
        try {
            const fileInput = document.querySelector('#imageUpload');
            if (!fileInput.files.length) return alert('First select images to upload');

            const formData = new FormData();
            Array.from(fileInput.files).forEach(file => {
                formData.append('images', file);
            });

            const response = await fetch(`/api/categories/images/${page.params.id}`, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) throw await response.json();

            const result = await response.json();
            categoryImages = [...categoryImages, ...result.images];
            fileInput.value = ''; // Reset input
        } catch (error) {
            alert(error.message || 'Upload mislukt');
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
                    <label class="font-bold block mb-2">Images:</label>
                    <input
                        id="imageUpload"
                        type="file"
                        class="file-input file-input-bordered w-full"
                        multiple
                        accept="image/*"
                    />
                    <button
                        on:click={uploadImages}
                        class="btn btn-primary w-full mt-2"
                    >
                        Upload Image(s)
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

{#if categoryImages.length > 0}
    <div class="bg-base-200 p-4 rounded-lg mt-4 border border-base-300">
        <h3 class="font-bold mb-3">Uploaded images:</h3>
        <div class="flex flex-wrap gap-4">
            {#each categoryImages as { id, image_url }}
                <div class="relative group">
                    <button on:click={() => {
                        selectedImage = { id, image_url };
                        modal.showModal();
                    }}>
                        <img
                            src={image_url}
                            alt="Categorie afbeelding"
                            class="h-32 w-32 object-cover rounded-lg shadow"
                        />
                    </button>
                </div>
            {/each}
        </div>
    </div>

    <dialog bind:this={modal} id="image_modal" class="modal">
        <div class="modal-box">
            {#if selectedImage}
                <img
                    src={selectedImage.image_url}
                    alt="Geselecteerde afbeelding"
                    class="w-full h-64 object-contain mb-4"
                />
                <div class="modal-action flex justify-between">
                    <button
                        class="btn btn-error"
                        on:click|preventDefault={async () => {
                            try {
                                const response = await fetch(`/api/categories/images/${selectedImage.id}`, {
                                    method: 'DELETE'
                                });

                                if (response.ok) {
                                    categoryImages = categoryImages.filter(img => img.id !== selectedImage.id);
                                    modal.close();
                                } else {
                                    alert('Verwijderen mislukt');
                                }
                            } catch (error) {
                                console.error('Delete error:', error);
                                alert('Fout bij verwijderen');
                            }
                        }}
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
{/if}

