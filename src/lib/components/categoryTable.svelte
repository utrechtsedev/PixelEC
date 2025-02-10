<script>
    // Verwacht dat 'data' door de load-functie wordt doorgegeven.
    // Als de load-functie { data: [...] } retourneert, dan haal je de array uit data.data.
    export let data;
  
    // Zorg dat 'categories' altijd de array bevat.
    let categories = Array.isArray(data) ? data : data.data;
  
    // Debug: log de ontvangen data
    console.log('Categories:', categories);
  
    let selectedCategories = new Set();
    let expanded = {};
  
    // Filter de parent categorieën: alleen die met parent_id === null
    $: parentCategories = categories.filter(c => c.parent_id === null);
    console.log('Parent Categories:', parentCategories);
  
    // Bouw een map voor de child categorieën, key is de parent_id
    $: childCategoriesMap = {};
    categories.forEach(c => {
      if (c.parent_id !== null) {
        if (!childCategoriesMap[c.parent_id]) {
          childCategoriesMap[c.parent_id] = [];
        }
        childCategoriesMap[c.parent_id].push(c);
      }
    });
    console.log('Child Categories Map:', childCategoriesMap);
  
    $: allSelected = parentCategories.length > 0 &&
        parentCategories.every(c => selectedCategories.has(c.category_id)) &&
        Object.values(childCategoriesMap).every(children =>
            children.every(c => selectedCategories.has(c.category_id))
        );
  
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
          ...parentCategories.map(c => c.category_id),
          ...Object.values(childCategoriesMap).flat().map(c => c.category_id)
        ];
        selectedCategories = new Set(allIds);
      }
    };
  
    const handleDelete = () => {
      console.log('Deleting categories:', Array.from(selectedCategories));
      selectedCategories = new Set();
    };
  
    const toggleExpanded = (parentId) => {
      expanded = { ...expanded, [parentId]: !expanded[parentId] };
    };
  </script>
  
  <div class="p-4 bg-base-300 rounded-lg shadow-md">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-2xl font-bold">Categories</h2>
      <button 
        class="btn btn-error btn-sm" 
        disabled={selectedCategories.size === 0}
        on:click={handleDelete}
      >
        Delete Selected ({selectedCategories.size})
      </button>
    </div>
  
    <div class="overflow-x-auto bg-base-100 rounded-lg">
      <table class="table w-full">
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
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {#each parentCategories as parent (parent.category_id)}
            <!-- Parent Row -->
            <tr class="bg-gray-100">
              <td>
                <label>
                  <input
                    type="checkbox"
                    class="checkbox checkbox-xs"
                    checked={selectedCategories.has(parent.category_id)}
                    on:change={() => toggleCategory(parent.category_id)}
                  />
                </label>
              </td>
              <td class="font-medium">{parent.name}</td>
              <td class="text-sm text-gray-500">{parent.description}</td>
              <td>
                {new Date(parent.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </td>
              <td>
                {#if childCategoriesMap[parent.category_id] && childCategoriesMap[parent.category_id].length > 0}
                  <button class="btn btn-xs" on:click={() => toggleExpanded(parent.category_id)}>
                    {expanded[parent.category_id] ? 'Hide Children' : 'Show Children'}
                  </button>
                {/if}
              </td>
            </tr>
  
            <!-- Child Rows: worden direct onder de parent rij ingevoegd -->
            {#if expanded[parent.category_id] && childCategoriesMap[parent.category_id]}
              {#each childCategoriesMap[parent.category_id] as child (child.category_id)}
                <tr class="bg-white">
                  <td class="pl-8">
                    <label>
                      <input
                        type="checkbox"
                        class="checkbox checkbox-xs"
                        checked={selectedCategories.has(child.category_id)}
                        on:change={() => toggleCategory(child.category_id)}
                      />
                    </label>
                  </td>
                  <td class="pl-8 font-medium">{child.name}</td>
                  <td class="text-sm text-gray-500">{child.description}</td>
                  <td>
                    {new Date(child.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </td>
                  <td></td>
                </tr>
              {/each}
            {/if}
          {/each}
        </tbody>
      </table>
    </div>
  </div>
  