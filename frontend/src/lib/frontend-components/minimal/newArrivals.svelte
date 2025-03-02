<script>
    const products = [
      { category: 'Electronics', name: 'Smart Speaker', price: 79, image: '/new1.jpg' },
      { category: 'Fashion', name: 'Canvas Tote Bag', price: 45, image: '/new2.jpg' },
      { category: 'Home & Living', name: 'Scented Candle', price: 29, image: '/new3.jpg' },
      { category: 'Beauty', name: 'Facial Serum', price: 59, image: '/new4.jpg' }
    ];
  </script>
  
  <section class="py-16 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex justify-between items-center mb-8">
        <h2 class="text-2xl font-bold">New Arrivals</h2>
        <a href="#" class="text-gray-600 hover:text-black text-sm">View All →</a>
      </div>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {#each products as product}
          <div class="product-card bg-white">
            <div class="aspect-square overflow-hidden relative">
              <img src={product.image} alt={product.name} class="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
              <div class="absolute top-2 left-2 bg-black text-white text-xs py-1 px-2">New</div>
            </div>
            <div class="p-4">
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