<script>
    import { ShoppingCart, User, Search } from 'lucide-svelte';
    
    let searchQuery = '';
    
    const categories = [
      { id: 1, name: 'Laptops', href: '/category/laptops' },
      { id: 2, name: 'Smartphones', href: '/category/smartphones' },
      { id: 3, name: 'Tablets', href: '/category/tablets' },
      { id: 4, name: 'Accessories', href: '/category/accessories' },
      { id: 5, name: 'Monitors', href: '/category/monitors' }
    ];
    
    function handleSearch() {
      if (searchQuery.trim()) {
        // Handle search functionality
        console.log('Searching for:', searchQuery);
      }
    }
  </script>
  
  <header class="bg-base-100 shadow-md">
    <div class="container mx-auto px-4">
      <!-- Top navigation bar -->
      <div class="py-4 flex items-center justify-between">
        <!-- Logo -->
        <a href="/" class="flex items-center space-x-2">
          <span class="text-2xl font-bold text-primary">Pixel Store</span>
        </a>
        
        <!-- Search bar -->
        <div class="relative w-full max-w-md mx-4">
          <form on:submit|preventDefault={handleSearch} class="flex">
            <input
              type="text"
              bind:value={searchQuery}
              placeholder="Search products..."
              class="input input-bordered w-full pr-10"
            />
            <button type="submit" class="btn btn-primary">
              <Search size={20} />
            </button>
          </form>
        </div>
        
        <!-- Icons -->
        <div class="flex items-center space-x-4">
          <a href="/account" class="btn btn-ghost btn-circle">
            <User size={20} />
          </a>
          <a href="/cart" class="btn btn-ghost btn-circle indicator">
            <span class="indicator-item badge badge-primary badge-sm">3</span>
            <ShoppingCart size={20} />
          </a>
        </div>
      </div>
      
      <!-- Categories menu -->
      <nav class="py-2 border-t border-b border-base-200">
        <ul class="flex items-center justify-center space-x-8">
          {#each categories as category}
            <li>
              <a
                href={category.href}
                class="text-base font-medium hover:text-primary transition-colors duration-200"
              >
                {category.name}
              </a>
            </li>
          {/each}
        </ul>
      </nav>
    </div>
  </header>