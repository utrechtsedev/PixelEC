<script>
    import { onMount } from 'svelte';
    import "../../../../app.css";
    // Dummy product data
    const products = [
      {
        id: 1,
        name: 'Premium Wireless Headphones',
        description: 'Noise-cancelling headphones with 30-hour battery life and premium sound quality.',
        price: 249.99,
        rating: 4.8,
        reviewCount: 342,
        category: 'Electronics',
        imageUrl: 'https://images.unsplash.com/photo-1564466809058-bf4114d55352?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
        badge: 'New',
        inStock: true
      },
      {
        id: 2,
        name: 'Minimalist Desk Lamp',
        description: 'Adjustable LED desk lamp with touch controls and 5 brightness levels.',
        price: 79.99,
        rating: 4.5,
        reviewCount: 128,
        category: 'Home Office',
        imageUrl: 'https://images.unsplash.com/photo-1564466809058-bf4114d55352?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
        badge: 'Sale',
        inStock: true
      },
      {
        id: 3,
        name: 'Ergonomic Office Chair',
        description: 'High-back mesh chair with lumbar support and adjustable armrests.',
        price: 189.99,
        rating: 4.7,
        reviewCount: 256,
        category: 'Furniture',
        imageUrl: 'https://images.unsplash.com/photo-1564466809058-bf4114d55352?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
        badge: null,
        inStock: true
      },
      {
        id: 4,
        name: 'Smart Home Hub',
        description: 'Control all your smart devices with this central hub featuring voice control.',
        price: 129.99,
        rating: 4.3,
        reviewCount: 187,
        category: 'Electronics',
        imageUrl: 'https://images.unsplash.com/photo-1564466809058-bf4114d55352?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
        badge: null,
        inStock: false
      },
      {
        id: 5,
        name: 'Portable Power Bank',
        description: '20,000mAh capacity with fast charging for all your devices.',
        price: 49.99,
        rating: 4.6,
        reviewCount: 412,
        category: 'Electronics',
        imageUrl: 'https://images.unsplash.com/photo-1564466809058-bf4114d55352?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
        badge: 'Bestseller',
        inStock: true
      },
      {
        id: 6,
        name: 'Ceramic Coffee Mug Set',
        description: 'Set of 4 modern design ceramic mugs, microwave and dishwasher safe.',
        price: 34.99,
        rating: 4.4,
        reviewCount: 98,
        category: 'Kitchen',
        imageUrl: 'https://images.unsplash.com/photo-1564466809058-bf4114d55352?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
        badge: null,
        inStock: true
      },
      {
        id: 7,
        name: 'Fitness Tracker Watch',
        description: 'Track your steps, heart rate, sleep, and more with 7-day battery life.',
        price: 89.99,
        rating: 4.2,
        reviewCount: 203,
        category: 'Fitness',
        imageUrl: 'https://images.unsplash.com/photo-1564466809058-bf4114d55352?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
        badge: null,
        inStock: true
      },
      {
        id: 8,
        name: 'Wireless Charging Pad',
        description: 'Fast wireless charging for compatible smartphones and accessories.',
        price: 29.99,
        rating: 4.5,
        reviewCount: 156,
        category: 'Electronics',
        imageUrl: 'https://images.unsplash.com/photo-1564466809058-bf4114d55352?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
        badge: 'Sale',
        inStock: true
      }
    ];
  
    // Filter states
    let selectedCategory = 'All';
    let searchQuery = '';
    let sortOption = 'featured';
    let showInStockOnly = false;
    
    // Filtered products
    $: filteredProducts = products
      .filter(product => 
        (selectedCategory === 'All' || product.category === selectedCategory) &&
        (product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
         product.description.toLowerCase().includes(searchQuery.toLowerCase())) &&
        (!showInStockOnly || product.inStock)
      )
      .sort((a, b) => {
        if (sortOption === 'priceLowToHigh') return a.price - b.price;
        if (sortOption === 'priceHighToLow') return b.price - a.price;
        if (sortOption === 'rating') return b.rating - a.rating;
        // Default: featured (original order)
        return a.id - b.id;
      });
  
    // Get unique categories
    $: categories = ['All', ...new Set(products.map(p => p.category))];
  
    // Mobile filter drawer state
    let showMobileFilters = false;
  </script>
  
  <div class="bg-gray-50 min-h-screen">
    <!-- Header -->
    <header class="bg-white shadow-sm">
      <div class="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold text-primary">ModernShop</h1>
        
        <!-- Search bar -->
        <div class="hidden md:block flex-grow max-w-md mx-8">
          <div class="relative">
            <input 
              type="text" 
              bind:value={searchQuery} 
              placeholder="Search products..." 
              class="input input-bordered w-full pr-10" 
            />
            <button class="absolute right-2 top-3 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
  
        <!-- Cart and user menu -->
        <div class="flex items-center space-x-4">
          <button class="btn btn-ghost btn-circle">
            <div class="indicator">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span class="badge badge-sm indicator-item badge-primary">3</span>
            </div>
          </button>
          <div class="avatar placeholder">
            <div class="bg-primary text-white rounded-full w-8">
              <span>JD</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  
    <!-- Mobile search bar - visible only on mobile -->
    <div class="md:hidden container mx-auto px-4 py-2">
      <div class="relative">
        <input 
          type="text" 
          bind:value={searchQuery} 
          placeholder="Search products..." 
          class="input input-bordered w-full pr-10" 
        />
        <button class="absolute right-2 top-3 text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>
    </div>
  
    <!-- Main content -->
    <main class="container mx-auto px-4 py-8">
      <!-- Page title and buttons -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h2 class="text-3xl font-bold text-gray-800">Products</h2>
          <p class="text-gray-600">{filteredProducts.length} items found</p>
        </div>
        
        <!-- Mobile filter button -->
        <button 
          class="btn btn-primary sm:hidden mt-2" 
          on:click={() => showMobileFilters = true}
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Filters
        </button>
      </div>
  
      <div class="flex flex-col md:flex-row gap-6">
        <!-- Sidebar filters - desktop -->
        <aside class="hidden md:block w-64 bg-white p-6 rounded-lg shadow-sm">
          <h3 class="font-semibold text-lg mb-4">Categories</h3>
          <div class="space-y-2">
            {#each categories as category}
              <div class="form-control">
                <label class="label cursor-pointer justify-start">
                  <input 
                    type="radio" 
                    name="category" 
                    class="radio radio-sm radio-primary" 
                    checked={selectedCategory === category}
                    on:change={() => selectedCategory = category}
                  />
                  <span class="label-text ml-2">{category}</span>
                </label>
              </div>
            {/each}
          </div>
  
          <div class="divider"></div>
  
          <h3 class="font-semibold text-lg mb-4">Availability</h3>
          <div class="form-control">
            <label class="label cursor-pointer justify-start">
              <input 
                type="checkbox" 
                class="checkbox checkbox-sm checkbox-primary" 
                bind:checked={showInStockOnly}
              />
              <span class="label-text ml-2">In Stock Only</span>
            </label>
          </div>
        </aside>
  
        <!-- Mobile filters drawer -->
        <div class="drawer md:hidden">
          <input id="filter-drawer" type="checkbox" class="drawer-toggle" bind:checked={showMobileFilters} />
          <div class="drawer-side z-10">
            <label for="filter-drawer" class="drawer-overlay"></label>
            <div class="p-4 w-80 min-h-full bg-white">
              <div class="flex justify-between items-center mb-4">
                <h3 class="font-semibold text-lg">Filters</h3>
                <button class="btn btn-sm btn-ghost" on:click={() => showMobileFilters = false}>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <h4 class="font-semibold mb-2">Categories</h4>
              <div class="space-y-2 mb-4">
                {#each categories as category}
                  <div class="form-control">
                    <label class="label cursor-pointer justify-start">
                      <input 
                        type="radio" 
                        name="category-mobile" 
                        class="radio radio-sm radio-primary" 
                        checked={selectedCategory === category}
                        on:change={() => selectedCategory = category}
                      />
                      <span class="label-text ml-2">{category}</span>
                    </label>
                  </div>
                {/each}
              </div>
  
              <div class="divider"></div>
  
              <h4 class="font-semibold mb-2">Availability</h4>
              <div class="form-control">
                <label class="label cursor-pointer justify-start">
                  <input 
                    type="checkbox" 
                    class="checkbox checkbox-sm checkbox-primary" 
                    bind:checked={showInStockOnly}
                  />
                  <span class="label-text ml-2">In Stock Only</span>
                </label>
              </div>
  
              <div class="mt-6">
                <button 
                  class="btn btn-primary w-full" 
                  on:click={() => showMobileFilters = false}
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Product grid -->
        <div class="flex-1">
          <!-- Sort options -->
          <div class="bg-white p-4 rounded-lg shadow-sm mb-6 flex justify-between items-center">
            <span class="text-gray-700">Sort by:</span>
            <select bind:value={sortOption} class="select select-bordered select-sm">
              <option value="featured">Featured</option>
              <option value="priceLowToHigh">Price: Low to High</option>
              <option value="priceHighToLow">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
  
          <!-- Products -->
          {#if filteredProducts.length > 0}
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {#each filteredProducts as product}
                <div class="card bg-white shadow-sm hover:shadow-md transition-shadow">
                  <figure class="relative">
                    <img src={product.imageUrl} alt={product.name} class="h-48 w-full object-cover" />
                    {#if product.badge}
                      <div class="absolute top-2 right-2 badge badge-primary">{product.badge}</div>
                    {/if}
                  </figure>
                  <div class="card-body p-4">
                    <h3 class="card-title text-lg">{product.name}</h3>
                    <p class="text-sm text-gray-600 line-clamp-2">{product.description}</p>
                    
                    <div class="flex items-center mt-2">
                      <div class="rating rating-sm">
                        {#each Array(5) as _, i}
                          <input 
                            type="radio" 
                            name={`rating-${product.id}`} 
                            class="mask mask-star-2 bg-orange-400" 
                            disabled 
                            checked={Math.round(product.rating) === i + 1}
                          />
                        {/each}
                      </div>
                      <span class="text-xs text-gray-500 ml-1">({product.reviewCount})</span>
                    </div>
                    
                    <div class="flex justify-between items-center mt-4">
                      <span class="text-xl font-bold">${product.price.toFixed(2)}</span>
                      {#if product.inStock}
                        <button class="btn btn-primary btn-sm">Add to Cart</button>
                      {:else}
                        <button class="btn btn-sm btn-disabled">Out of Stock</button>
                      {/if}
                    </div>
                  </div>
                </div>
              {/each}
            </div>
          {:else}
            <div class="bg-white p-8 rounded-lg text-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 class="text-xl font-semibold mt-4">No products found</h3>
              <p class="text-gray-600 mt-2">Try adjusting your search or filter criteria</p>
              <button 
                class="btn btn-primary mt-4"
                on:click={() => {
                  searchQuery = '';
                  selectedCategory = 'All';
                  showInStockOnly = false;
                }}
              >
                Reset filters
              </button>
            </div>
          {/if}
        </div>
      </div>
    </main>
  
    <!-- Footer -->
    <footer class="bg-white border-t mt-12">
      <div class="container mx-auto px-4 py-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 class="text-lg font-semibold mb-4">ModernShop</h3>
            <p class="text-gray-600">Your one-stop shop for high-quality products at affordable prices.</p>
          </div>
          
          <div>
            <h4 class="font-semibold mb-4">Shop</h4>
            <ul class="space-y-2">
              <li><a href="#" class="text-gray-600 hover:text-primary">New Arrivals</a></li>
              <li><a href="#" class="text-gray-600 hover:text-primary">Bestsellers</a></li>
              <li><a href="#" class="text-gray-600 hover:text-primary">Sale</a></li>
              <li><a href="#" class="text-gray-600 hover:text-primary">All Products</a></li>
            </ul>
          </div>
          
          <div>
            <h4 class="font-semibold mb-4">Customer Service</h4>
            <ul class="space-y-2">
              <li><a href="#" class="text-gray-600 hover:text-primary">Contact Us</a></li>
              <li><a href="#" class="text-gray-600 hover:text-primary">FAQs</a></li>
              <li><a href="#" class="text-gray-600 hover:text-primary">Shipping & Returns</a></li>
              <li><a href="#" class="text-gray-600 hover:text-primary">Track Order</a></li>
            </ul>
          </div>
          
          <div>
            <h4 class="font-semibold mb-4">Stay Connected</h4>
            <div class="flex space-x-4">
              <a href="#" class="btn btn-ghost btn-circle">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="fill-current">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                </svg>
              </a>
              <a href="#" class="btn btn-ghost btn-circle">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="fill-current">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                </svg>
              </a>
              <a href="#" class="btn btn-ghost btn-circle">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="fill-current">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                </svg>
              </a>
              <a href="#" class="btn btn-ghost btn-circle">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="fill-current">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
            <div class="mt-4">
              <h5 class="font-semibold mb-2">Subscribe to our newsletter</h5>
              <div class="form-control">
                <div class="input-group">
                  <input type="email" placeholder="Enter your email" class="input input-bordered" />
                  <button class="btn btn-primary">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="border-t mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p class="text-gray-600">&copy; 2025 ModernShop. All rights reserved.</p>
          <div class="flex space-x-4 mt-4 md:mt-0">
            <a href="#" class="text-gray-600 hover:text-primary">Privacy Policy</a>
            <a href="#" class="text-gray-600 hover:text-primary">Terms of Service</a>
            <a href="#" class="text-gray-600 hover:text-primary">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  </div>