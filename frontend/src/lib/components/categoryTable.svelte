<script>
    import { onMount } from "svelte";
    import { slide } from "svelte/transition";
    export let data = [];

    $: categories = data;
    let selectedCategories = new Set();
    let expanded = {};
    let searchTerm = "";
    const handleEdit = async () => {
        if (selectedCategories.size > 1)
            return alert("You can only edit 1 category at a time"); // TODO: popup (teveel geselecteerd om te bewerken)
        if (selectedCategories.size === 0)
            return alert("Select a category to edit"); // TODO: popup (niets geselecteerd om te bewerken)
        const id = Array.from(selectedCategories)[0];
        return (window.location = `/dashboard/categories/edit/${id}`);
    };
    // Reactive declarations
    $: parentCategories = categories.filter((c) => c.parent_id === null);
    $: childCategoriesMap = parentCategories.reduce((acc, parent) => {
        acc[parent.category_id] = categories.filter(
            (c) => c.parent_id === parent.category_id,
        );
        return acc;
    }, {});
    $: filteredParentCategories = parentCategories.filter((parent) => {
        const parentMatch =
            parent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            parent.description.toLowerCase().includes(searchTerm.toLowerCase());
        const children = childCategoriesMap[parent.category_id] || [];
        const childMatch = children.some(
            (child) =>
                child.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                child.description
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()),
        );
        return parentMatch || childMatch;
    });
    $: allSelected =
        filteredParentCategories.length > 0 &&
        filteredParentCategories.every((c) =>
            selectedCategories.has(c.category_id),
        ) &&
        Object.values(filteredChildCategoriesMap).every((children) =>
            children.every((c) => selectedCategories.has(c.category_id)),
        );
    $: filteredChildCategoriesMap = filteredParentCategories.reduce(
        (acc, parent) => {
            const children = (
                childCategoriesMap[parent.category_id] || []
            ).filter(
                (child) =>
                    child.name
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                    child.description
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()),
            );
            acc[parent.category_id] = children;
            return acc;
        },
        {},
    );

    // Initialize expanded state
    onMount(() => {
        expanded = parentCategories.reduce((acc, category) => {
            acc[category.category_id] = false;
            return acc;
        }, {});
    });
    const toggleCategory = (id) => {
        selectedCategories = new Set(selectedCategories);
        if (selectedCategories.has(id)) {
            selectedCategories.delete(id);
        } else {
            selectedCategories.add(id);
        }
    };
    const toggleAll = () => {
        if (allSelected) {
            selectedCategories = new Set();
        } else {
            const allIds = [
                ...filteredParentCategories.map((c) => c.category_id),
                ...Object.values(filteredChildCategoriesMap)
                    .flat()
                    .map((c) => c.category_id),
            ];
            selectedCategories = new Set(allIds);
        }
    };
    const toggleDropdown = (categoryId) => {
        expanded = { ...expanded, [categoryId]: !expanded[categoryId] };
    };
    const handleDelete = async () => {
        if (selectedCategories.size === 0) return;

        const ids = Array.from(selectedCategories);

        try {
            // Create array of delete promises
            const deletePromises = ids.map(async (id) =>
                await fetch(`/api/categories/${id}`, {
                    method: "DELETE",
                }),
            );
                
            // Wait for all deletions to complete
            categories = categories.filter(
                (c) => !selectedCategories.has(c.category_id),
            );
            selectedCategories = new Set();
                // TODO: checking category deletion 
            alert("Categories deleted successfully!");
        } catch (error) {
            console.error("Delete error:", error);
            alert("Failed to delete some or all categories.");
        }
    };
    
</script>

<div class="p-4 bg-base-300 rounded-lg shadow-md">
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
        <h2 class="text-2xl md:text-4xl font-bold shrink-0">Categories</h2>
        
        <div class="w-full sm:w-auto flex flex-col xs:flex-row gap-2 items-stretch">
            <!-- Search Input -->
            <div class="flex-grow min-w-0">
                <input
                    type="text"
                    placeholder="Search..."
                    class="input input-bordered w-full h-8 text-sm"
                    bind:value={searchTerm}
                />
            </div>
    
            <!-- Button Group -->
            <div class="flex gap-1 justify-end flex-wrap">
                <button class="btn btn-sm flex-shrink-0" on:click={window.location = "/dashboard/categories/create"}>
                    <span class="md:hidden">➕</span>
                    <span class="hidden md:inline">Create</span>
                </button>
    
                <button class="btn btn-sm flex-shrink-0" on:click={handleEdit}>
                    <span class="md:hidden">✏️</span>
                    <span class="hidden md:inline">Edit</span>
                </button>
    
                <button
                    class="btn btn-error btn-sm flex-shrink-0"
                    disabled={selectedCategories.size === 0}
                    on:click={handleDelete}
                >
                    <span class="md:hidden">🗑️<span class="ml-1">{selectedCategories.size}</span></span>
                    <span class="hidden md:inline">Delete ({selectedCategories.size})</span>
                </button>
            </div>
        </div>
    </div>

    <div class="overflow-x-auto bg-base-100 rounded-lg">
        <table class="table">
            <thead>
                <tr>
                    <th class="w-3">
                        <label>
                            <input
                                type="checkbox"
                                class="checkbox checkbox-xs"
                                checked={allSelected}
                                on:change={toggleAll}
                            />
                        </label>
                    </th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Child Categories</th>
                    <th>Created At</th>
                </tr>
            </thead>
            <tbody>
                {#each parentCategories as category (category.category_id)}
                    <!-- Parent Category Row -->
                    <tr class="bg-base-200">
                        <td>
                            <label>
                                <input
                                    type="checkbox"
                                    class="checkbox checkbox-xs"
                                    checked={selectedCategories.has(
                                        category.category_id,
                                    )}
                                    on:change={() =>
                                        toggleCategory(category.category_id)}
                                />
                            </label>
                        </td>
                        <td class="font-medium md:min-w-8 min-w-12 max-w-14"
                            >{category.name}</td
                        >
                        <td class="text-sm"
                            >{category.description
                                .replace(/<[^>]*>/g, "")
                                .replace(/(.{35})..+/, "$1…")}</td
                        >
                        <td>
                            {#if filteredChildCategoriesMap[category.category_id]?.length}
                                <button
                                    class="btn btn-xs btn-ghost"
                                    on:click={() =>
                                        toggleDropdown(category.category_id)}
                                >
                                    {filteredChildCategoriesMap[
                                        category.category_id
                                    ].length}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="h-4 w-4 ml-1 transition-transform {expanded[
                                            category.category_id
                                        ]
                                            ? 'rotate-180'
                                            : ''}"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </button>
                            {:else}
                                <span class="text-xs">No children</span>
                            {/if}
                        </td>
                        <td>
                            {new Date(category.created_at).toLocaleDateString(
                                "en-US",
                                {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                },
                            )}
                        </td>
                    </tr>

                    <!-- Child Categories Rows -->
                    {#if expanded[category.category_id]}
                        {#each filteredChildCategoriesMap[category.category_id] as child}
                            <tr transition:slide>
                                <td>
                                    <label>
                                        <input
                                            type="checkbox"
                                            class="checkbox checkbox-xs"
                                            checked={selectedCategories.has(
                                                child.category_id,
                                            )}
                                            on:change={() =>
                                                toggleCategory(
                                                    child.category_id,
                                                )}
                                        />
                                    </label>
                                </td>
                                <td class="md:min-w-8 min-w-12 max-w-14 overflow-hidden"
                                    >{child.name}</td
                                ><!-- TODO: place some type of icon to show that this is a chukd -->
                                <td class="text-sm md:min-w-8 min-w-12 max-w-14"
                                    >{child.description
                                        .replace(/<[^>]*>/g, "")
                                        .replace(/(.{35})..+/, "$1…")}</td
                                >
                                <td></td>
                                <td>
                                    {new Date(
                                        child.created_at,
                                    ).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                    })}
                                </td>
                            </tr>
                        {/each}
                    {/if}
                {/each}
            </tbody>
        </table>
    </div>
</div>
