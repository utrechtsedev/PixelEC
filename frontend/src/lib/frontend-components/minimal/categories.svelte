<script>
    const categories = [
      { name: 'Electronics', image: '/category1.jpg' },
      { name: 'Fashion', image: '/category2.jpg' },
      { name: 'Home & Living', image: '/category3.jpg' },
      { name: 'Beauty', image: '/category4.jpg' }
    ];
  </script>
  
  <section class="py-16 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4">
      <h2 class="text-2xl font-bold mb-8 text-center md:text-left">Shop by Category</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        {#each categories as category}
          <div class="relative group overflow-hidden">
            <img src={category.image} alt={category.name} class="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105" />
            <div class="absolute inset-0 bg-black bg-opacity-20 flex items-end p-4">
              <h3 class="text-white font-medium text-lg">{category.name}</h3>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>