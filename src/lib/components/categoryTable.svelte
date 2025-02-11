
<script>
  import { onMount } from 'svelte';
    import { fade, scale, slide } from 'svelte/transition';
    let searchTerm = '';
  export let data;
  
  let categories = data;
  let selectedCategories = new Set();
  let expanded = {};


  // Reactive declarations
  $: parentCategories = categories.filter(c => c.parent_id === null); $: childCategoriesMap = parentCategories.reduce((acc, parent) => { acc[parent.category_id] = categories.filter(c => c.parent_id === parent.category_id); return acc; }, {}); 
  $: filteredParentCategories = parentCategories.filter(parent => {
      const parentMatch = parent.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        parent.description.toLowerCase().includes(searchTerm.toLowerCase());
      const children = childCategoriesMap[parent.category_id] || [];
      const childMatch = children.some(child => 
          child.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
          child.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return parentMatch || childMatch;
  });

  $: allSelected = filteredParentCategories.length > 0 && 
    filteredParentCategories.every(c => selectedCategories.has(c.category_id)) &&
    Object.values(filteredChildCategoriesMap).every(children => 
        children.every(c => selectedCategories.has(c.category_id))
    );

  $: filteredChildCategoriesMap = filteredParentCategories.reduce((acc, parent) => {
      const children = (childCategoriesMap[parent.category_id] || []).filter(child => 
          child.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
          child.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      acc[parent.category_id] = children;
      return acc;
  }, {});
  
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
            ...filteredParentCategories.map(c => c.category_id),
            ...Object.values(filteredChildCategoriesMap).flat().map(c => c.category_id)
        ];
        selectedCategories = new Set(allIds);
    }
};
  
  const toggleDropdown = (categoryId) => {
      expanded = {...expanded, [categoryId]: !expanded[categoryId]};
  };
  
  const handleDelete = () => {
      console.log('Deleting categories:', Array.from(selectedCategories));
      selectedCategories = new Set();
  };
</script>
<div class="p-4 bg-base-300 rounded-lg shadow-md">
  <div class="flex justify-between items-center mb-4">
      <h2 class="text-2xl font-bold">Categories</h2>
      <div class="flex gap-3">
        <input 
            transition:scale
            type="text" 
            placeholder="Search categories..." 
            class="input input-bordered w-full max-w-xs h-8" 
            bind:value={searchTerm}/>
        <button 
        class="btn btn-sm" 
        on:click={handleDelete}>
        Create
        </button>
        <button 
        class="btn btn-sm" 
        on:click={handleDelete}>
        Edit
        </button>
        <button 
          class="btn btn-error btn-sm" 
          disabled={selectedCategories.size === 0}
          on:click={handleDelete}>
          Delete ({selectedCategories.size})
        </button>
        
        <!-- svelte-ignore a11y_consider_explicit_label -->
      </div>
      </div>

  <div class="overflow-x-auto bg-base-100 rounded-lg">
      <table class="table">
          <thead>
              <tr>
                  <th>
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
                                  checked={selectedCategories.has(category.category_id)}
                                  on:change={() => toggleCategory(category.category_id)}
                              />
                          </label>
                      </td>
                      <td class="font-medium">{category.name}</td>
                      <td class="text-sm text-gray-500">{category.description}</td>
                      <td>
                        {#if filteredChildCategoriesMap[category.category_id]?.length}                              <button 
                                  class="btn btn-xs btn-ghost"
                                  on:click={() => toggleDropdown(category.category_id)}
                              >
                              {filteredChildCategoriesMap[category.category_id].length}
                                  <svg xmlns="http://www.w3.org/2000/svg" 
                                      class="h-4 w-4 ml-1 transition-transform {expanded[category.category_id] ? 'rotate-180' : ''}" 
                                      fill="none" 
                                      viewBox="0 0 24 24" 
                                      stroke="currentColor">
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                  </svg>
                              </button>
                          {:else}
                              <span class="text-xs text-gray-400">No children</span>
                          {/if}
                      </td>
                      <td>
                          {new Date(category.created_at).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                          })}
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
                                          checked={selectedCategories.has(child.category_id)}
                                          on:change={() => toggleCategory(child.category_id)}
                                      />
                                  </label>
                              </td>
                              <td class="pl-8">→ {child.name}</td>
                              <td class="text-sm text-gray-500">{child.description}</td>
                              <td></td>
                              <td>
                                  {new Date(child.created_at).toLocaleDateString('en-US', {
                                      year: 'numeric',
                                      month: 'short',
                                      day: 'numeric'
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
