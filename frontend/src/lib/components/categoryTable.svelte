<script>
    import { onMount } from "svelte";
    import { slide } from "svelte/transition";
    export let data = [];

    $: categories = data || [];
    let selectedCategories = new Set();
    let expanded = {};
    let searchTerm = "";
    
    // Simplified edit handler that reliably uses public_id
    const handleEdit = () => {
        if (selectedCategories.size > 1) {
            return alert("You can only edit 1 category at a time");
        }
        if (selectedCategories.size === 0) {
            return alert("Select a category to edit");
        }
        
        const categoryId = Array.from(selectedCategories)[0];
        const selectedCategory = categories.find(c => c.category_id === categoryId);
        
        if (!selectedCategory) {
            return alert("Could not find the selected category");
        }
        
        // Navigate to edit page with public_id
        window.location.href = `/dashboard/categories/edit/${selectedCategory.public_id}`;
    };
    
    // Navigate to create page
    const handleCreate = () => {
        window.location.href = "/dashboard/categories/create";
    };
    
    // Delete handler
    const handleDelete = async () => {
        if (selectedCategories.size === 0) return;
        
        if (!confirm(`Are you sure you want to delete ${selectedCategories.size} categories?`)) {
            return;
        }

        const ids = Array.from(selectedCategories);

        try {
            // Create and execute delete requests
            const deletePromises = ids.map(id => 
                fetch(`/api/admin/categories`, { 
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({id: id})
                })
            );
            
            await Promise.all(deletePromises);
                
            // Update UI
            categories = categories.filter(c => !selectedCategories.has(c.category_id));
            selectedCategories = new Set();
            alert("Categories deleted successfully!");
        } catch (error) {
            console.error("Delete error:", error);
            alert("Failed to delete some or all categories.");
        }
    };
    
    // Reactive declarations for filtered data
    $: parentCategories = categories.filter(c => c.parent_id === null);
    
    $: childCategoriesMap = categories.reduce((acc, category) => {
        if (category.parent_id) {
            if (!acc[category.parent_id]) {
                acc[category.parent_id] = [];
            }
            acc[category.parent_id].push(category);
        }
        return acc;
    }, {});
    
    // Filter parent categories based on search term
    $: filteredParentCategories = searchTerm 
        ? parentCategories.filter(parent => {
            const parentMatch = matchesSearchTerm(parent);
            const childrenMatch = (childCategoriesMap[parent.category_id] || [])
                .some(child => matchesSearchTerm(child));
            return parentMatch || childrenMatch;
        })
        : parentCategories;
    
    // Filter child categories based on search term
    $: filteredChildCategoriesMap = filteredParentCategories.reduce((acc, parent) => {
        const children = childCategoriesMap[parent.category_id] || [];
        acc[parent.category_id] = searchTerm 
            ? children.filter(child => matchesSearchTerm(child))
            : children;
        return acc;
    }, {});
    
    // Helper function to check if a category matches the search term
    const matchesSearchTerm = (category) => {
        if (!searchTerm) return true;
        
        const term = searchTerm.toLowerCase();
        const name = (category.name || "").toLowerCase();
        const description = (category.description || "").toLowerCase();
        
        return name.includes(term) || description.includes(term);
    };
    
    // Check if all visible categories are selected
    $: allSelected = 
        filteredParentCategories.length > 0 &&
        filteredParentCategories.every(c => selectedCategories.has(c.category_id)) &&
        Object.values(filteredChildCategoriesMap).flat().every(c => 
            selectedCategories.has(c.category_id)
        );
    
    // Toggle category selection
    const toggleCategory = (id) => {
        selectedCategories = new Set(selectedCategories);
        if (selectedCategories.has(id)) {
            selectedCategories.delete(id);
        } else {
            selectedCategories.add(id);
        }
    };
    
    // Toggle all categories selection
    const toggleAll = () => {
        if (allSelected) {
            selectedCategories = new Set();
        } else {
            const allIds = [
                ...filteredParentCategories.map(c => c.category_id),
                ...Object.values(filteredChildCategoriesMap).flat().map(c => c.category_id)
            ];
            selectedCategories = new Set(allIds);
        }
    };
    
    // Toggle category expansion
    const toggleDropdown = (categoryId) => {
        expanded = { ...expanded, [categoryId]: !expanded[categoryId] };
    };
    
    // Initialize expanded state
    onMount(() => {
        expanded = parentCategories.reduce((acc, category) => {
            acc[category.category_id] = false;
            return acc;
        }, {});
    });
    
    // Format description for display
    const formatDescription = (description) => {
        if (!description) return "";
        return description
            .replace(/<[^>]*>/g, "") // Remove HTML tags
            .substring(0, 35) + (description.length > 35 ? "…" : "");
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
                <button class="btn btn-sm flex-shrink-0" on:click={handleCreate}>
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
                {#each filteredParentCategories as category (category.category_id)}
                    <!-- Parent Category Row -->
                    <tr class="bg-base-200">
                        <td>
                            <label>
                                <input
                                    type="checkbox"
                                    class="checkbox checkbox-xs"
                                    checked={selectedCategories.has(category.category_id)}
                                    on:change={() => toggleCategory(category.category_id)}
                                />
                            </label>
                        </td>
                        <td class="font-medium md:min-w-8 min-w-12 max-w-14">
                            {category.name}
                        </td>
                        <td class="text-sm">
                            {formatDescription(category.description)}
                        </td>
                        <td>
                            {#if filteredChildCategoriesMap[category.category_id]?.length}
                                <button
                                    class="btn btn-xs btn-ghost"
                                    on:click={() => toggleDropdown(category.category_id)}
                                >
                                    {filteredChildCategoriesMap[category.category_id].length}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="h-4 w-4 ml-1 transition-transform {expanded[category.category_id] ? 'rotate-180' : ''}"
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
                            {new Date(category.created_at).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                            })}
                        </td>
                    </tr>

                    <!-- Child Categories Rows -->
                    {#if expanded[category.category_id] && filteredChildCategoriesMap[category.category_id]?.length}
                        {#each filteredChildCategoriesMap[category.category_id] as child}
                            <tr transition:slide>
                                <td>
                                    <label>
                                        <input
                                            type="checkbox"
                                            class="checkbox checkbox-xs"
                                            checked={selectedCategories.has(child.category_id)}
                                            on:change={() => toggleCategory(child.category_id)}
                                        />
                                    </label>
                                </td>
                                <td class="md:min-w-8 min-w-12 max-w-14 overflow-hidden">
                                    <span class="flex items-center">
                                        <span class="text-xs opacity-70 mr-1">↳</span> {child.name}
                                    </span>
                                </td>
                                <td class="text-sm md:min-w-8 min-w-12 max-w-14">
                                    {formatDescription(child.description)}
                                </td>
                                <td></td>
                                <td>
                                    {new Date(child.created_at).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                    })}
                                </td>
                            </tr>
                        {/each}
                    {/if}
                {/each}
                
                {#if filteredParentCategories.length === 0}
                    <tr>
                        <td colspan="5" class="text-center py-4">
                            {searchTerm ? "No matching categories found" : "No categories found"}
                        </td>
                    </tr>
                {/if}
            </tbody>
        </table>
    </div>
</div>