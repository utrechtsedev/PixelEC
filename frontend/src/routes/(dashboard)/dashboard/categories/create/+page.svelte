<script>
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    let editorRef;
    let content = "";
    let newCategory = {
        name: '',
        description: '',
        parent_id: null
    };
    let categories = [];
    let categoryImages = [];
    let selectedImage = null;
    let modal;

    // Editor functions remain the same
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
        // Fetch existing categories for parent selection
        const response = await fetch('/api/categories');
        categories = await response.json();
    });

    const createCategory = async () => {
        try {
            newCategory.description = content;
            const response = await fetch('/api/categories', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({...newCategory})
            });

            if (!response.ok) throw await response.json();
            
            const result = await response.json();
            console.log(result)
            window.location = `/dashboard/categories/edit/${result.category_id}`;
        } catch (error) {
            alert(error.message || 'Aanmaken mislukt');
        }
    };

    // Upload images will only work after category is created
    const uploadImages = async () => {
        alert('Sla eerst de categorie op voordat je afbeeldingen uploadt');
    };
</script>

    <a href="/dashboard/categories" class="flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...$$props}>
            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m5 12l6-6m-6 6l6 6m-6-6h14" />
        </svg>
        <p class="text-2xl">Categories</p>
    </a>
<div class="flex flex-col md:flex-row gap-4 mt-5">
    <!-- Left Column -->
    <div class="bg-base-200 p-4 rounded-lg w-full md:w-8/12 border border-base-300">
        <h3 class="text-xl font-bold mb-2">Title:</h3>
        <input
            bind:value={newCategory.name}
            class="input input-bordered w-full"
            placeholder="Bijv. Zomercollectie, Fietsaccessoires"
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

    <!-- Right Column -->
    <div class="bg-base-200 p-4 rounded-lg w-full md:w-4/12 border border-base-300 h-full">
        <div class="flex flex-col h-full justify-between">
            <div class="space-y-4">
                <div>
                    <label class="font-bold block mb-2">Main category:</label>
                    <select class="select select-bordered w-full" bind:value={newCategory.parent_id}>
                        <option value={null}>None</option>
                        {#each categories.filter(c => !c.parent_id) as category}
                            <option value={category.category_id}>{category.name}</option>
                        {/each}
                    </select>
                </div>

                <div class="cursor-not-allowed tooltip" data-tip="You can upload images after creating the category">
                    <label class="font-bold block mb-2">Images:</label>
                    <input
                        id="imageUpload"
                        type="file"
                        class="file-input file-input-bordered w-full"
                        multiple
                        accept="image/*"
                        disabled
                    />
                    <button
                        on:click={uploadImages}
                        class="btn btn-primary w-full mt-2"
                        disabled
                    >
                        Upload Image(s)
                    </button>
                </div>
            </div>

            <button
                on:click={createCategory}
                class="btn btn-success w-full mt-4"
            >
                Create Category
            </button>
        </div>
    </div>
</div>