<script>
    const products = [
      { category: 'Electronics', name: 'Wireless Headphones', price: 129, image: '/product1.jpg' },
      { category: 'Fashion', name: 'Minimalist Watch', price: 89, image: '/product2.jpg' },
      { category: 'Home & Living', name: 'Ceramic Vase', price: 49, image: '/product3.jpg' },
      { category: 'Beauty', name: 'Essential Oils Set', price: 35, image: '/product4.jpg' }
    ];
  </script>
  
  <section class="py-16">
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex justify-between items-center mb-8">
        <h2 class="text-2xl font-bold">Featured Products</h2>
        <a href="#" class="text-gray-600 hover:text-black text-sm">View All →</a>
      </div>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {#each products as product}
          <div class="product-card">
            <div class="aspect-square overflow-hidden">
              <img src={product.image} alt={product.name} class="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
            </div>
            <div class="pt-4">
              <p class="text-gray-500 text-xs mb-1">{product.category}</p>
              <h3 class="font-medium mb-1">{product.name}</h3>
              <p class="text-sm font-medium">${product.price.toFixed(2)}</p>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>
  
  <style>
    .product-card {
      transition: transform 0.2s ease-in-out;
    }
    
    .product-card:hover {
      transform: translateY(-5px);
    }
  </style>
  