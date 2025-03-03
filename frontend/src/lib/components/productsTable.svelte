<!-- /components/ProductsTable.svelte -->
<script>
    import { onMount } from "svelte";
    import { slide } from "svelte/transition";
    
    export let products = [];

    let selectedProducts = new Set();
    let expanded = {};
    let searchTerm = "";
    
    const handleEdit = async () => {
  if (selectedProducts.size > 1)
    return alert("You can only edit one product at a time");
  if (selectedProducts.size === 0)
    return alert("Select a product to edit");
  
  // Haal de product_id op uit de selectedProducts Set
  const productId = Array.from(selectedProducts)[0];
  
  // Zoek het bijbehorende product op basis van product_id
  const selectedProduct = products.find(p => p.product_id === productId);
  
  if (!selectedProduct) {
    return alert("Selected product could not be found");
  }
  
  // Gebruik public_id voor de URL
  return (window.location = `/dashboard/products/edit/${selectedProduct.public_id}`);
};
    
    // Filteren op productnaam of omschrijving
    $: filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    
    $: allSelected = 
        filteredProducts.length > 0 &&
        filteredProducts.every(p => selectedProducts.has(p.product_id));
    
        const toggleProduct = (id) => {
    selectedProducts = new Set(selectedProducts);
    if (selectedProducts.has(id)) {
        selectedProducts.delete(id);
    } else {
        selectedProducts.add(id);
    }
};
    
    const toggleAll = () => {
        if (allSelected) {
            selectedProducts = new Set();
        } else {
            selectedProducts = new Set(filteredProducts.map(p => p.product_id));
        }
    };
    
    const handleDelete = async () => {
        if (selectedProducts.size === 0) return;

        if (!confirm(`Are you sure you want to delete ${selectedProducts.size} products?`)) {
            return;
        }

        const ids = Array.from(selectedProducts);

        try {
            // Create array of delete promises
            const deletePromises = ids.map(async (id) =>
                await fetch(`/api/admin/products`, {
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({id: id})
                })
            );
            
            await Promise.all(deletePromises);
                
            // Filter deleted products
            products = products.filter(
                (p) => !selectedProducts.has(p.product_id)
            );
            
            selectedProducts = new Set();
            alert("Products succesfully deleted!");
        } catch (error) {
            console.error("Delete error:", error);
            alert("An error occurred while deleting products.");
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
    
    // Helper functie om datum te formatteren
    const formatDate = (dateString) => {
        if (!dateString) return "";
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    // Helper functie om de totale voorraad per product te berekenen
    const calculateTotalStock = (product) => {
        if (!product.ProductVariants || product.ProductVariants.length === 0) {
            return 0;
        }
        
        return product.ProductVariants.reduce((total, variant) => {
            // inventory_quantity kan undefined zijn, dus voeg een fallback toe
            const variantStock = variant.inventory_quantity || 0;
            return total + variantStock;
        }, 0);
    };

    // Helper functie om voorraad te formatteren met context
    const formatStock = (product) => {
        const totalStock = calculateTotalStock(product);
        const variantCount = product.ProductVariants ? product.ProductVariants.length : 0;
        
        if (variantCount === 0) {
            return "No stock";
        }
        
        if (variantCount === 1) {
            return `${totalStock} items`;
        }
        
        // Als er meerdere varianten zijn, toon een overzicht
        return `${totalStock} items`;
    };
</script>

<div class="p-4 bg-base-300 rounded-lg shadow-md">
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
        <h2 class="text-2xl md:text-4xl font-bold shrink-0">Products</h2>
        
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
                <button class="btn btn-sm flex-shrink-0" on:click={() => window.location = "/dashboard/products/create"}>
                    <span class="md:hidden">➕</span>
                    <span class="hidden md:inline">Create New</span>
                </button>
    
                <button class="btn btn-sm flex-shrink-0" on:click={handleEdit}>
                    <span class="md:hidden">✏️</span>
                    <span class="hidden md:inline">Edit</span>
                </button>
    
                <button
                    class="btn btn-error btn-sm flex-shrink-0"
                    disabled={selectedProducts.size === 0}
                    on:click={handleDelete}
                >
                    <span class="md:hidden">🗑️<span class="ml-1">{selectedProducts.size}</span></span>
                    <span class="hidden md:inline">Delete ({selectedProducts.size})</span>
                </button>
            </div>
        </div>
    </div>

    {#if products.length === 0}
        <div class="bg-base-100 p-8 text-center rounded-lg">
            <p>No products found.</p>
        </div>
    {:else}
        <div class="overflow-x-auto bg-base-100 rounded-lg">
            <table class="table table-zebra w-full">
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
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Variants</th>
                        <th>In Stock</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {#each filteredProducts as product (product.product_id)}
                    <tr class="hover:bg-base-200">
                        <td>
                            <label>
                                <input
                                    type="checkbox"
                                    class="checkbox checkbox-xs"
                                    checked={selectedProducts.has(product.product_id)}
                                    on:change={() => toggleProduct(product.product_id)}
                                />
                            </label>
                        </td>
                        <td class="font-medium">{product.public_id}</td> <!-- Toon de public_id -->
                        <td class="font-medium">{product.name}</td>
                            <td class="text-sm">
                                {#if product.description}
                                    {product.description.replace(/<[^>]*>/g, "").substring(0, 35)}
                                    {product.description.length > 35 ? '...' : ''}
                                {/if}
                            </td>
                            <td>{formatPrice(product.base_price)}</td>
                            <td>
                                {#if product.ProductVariants && product.ProductVariants.length}
                                    <span class="badge badge-success">{product.ProductVariants.length} variants</span>
                                {:else}
                                    <span class="badge badge-ghost">No variants</span>
                                {/if}
                            </td>
                            <td>
                                {#if product.ProductVariants && product.ProductVariants.length > 0}
                                    <span class="badge {calculateTotalStock(product) > 0 ? 'badge-success' : 'badge-error'}">
                                        {formatStock(product)}
                                    </span>
                                {:else}
                                    <span class="badge badge-ghost">No stock</span>
                                {/if}
                            </td>
                            <td>{formatDate(product.created_at)}</td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    {/if}
</div>