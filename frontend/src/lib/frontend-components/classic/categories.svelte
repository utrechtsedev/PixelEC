<script>
    const categories = [
      {
        id: 1,
        name: "Laptops",
        image: "/api/placeholder/200/200",
        description: "Powerful laptops for work and play",
        href: "/category/laptops"
      },
      {
        id: 2,
        name: "Smartphones",
        image: "/api/placeholder/200/200",
        description: "Latest smartphones with cutting-edge features",
        href: "/category/smartphones"
      },
      {
        id: 3,
        name: "Tablets",
        image: "/api/placeholder/200/200",
        description: "Portable tablets for productivity and entertainment",
        href: "/category/tablets"
      },
      {
        id: 4,
        name: "Accessories",
        image: "/api/placeholder/200/200",
        description: "Essential accessories for all your devices",
        href: "/category/accessories"
      }
    ];
  </script>
  
  <section class="py-16 container mx-auto px-4">
    <div class="text-center mb-12">
      <h2 class="text-3xl font-bold mb-2">Shop By Category</h2>
      <p class="text-base-content/70">Browse our wide selection of products</p>
    </div>
    
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {#each categories as category}
        <a 
          href={category.href}
          class="card bg-base-100 shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <figure class="px-6 pt-6">
            <img
              src={category.image}
              alt={category.name}
              class="rounded-lg h-40 w-full object-cover"
            />
          </figure>
          <div class="card-body items-center text-center">
            <h3 class="card-title text-lg">{category.name}</h3>
            <p class="text-sm text-base-content/70">{category.description}</p>
            <div class="card-actions justify-center mt-2">
              <span class="text-primary font-medium">Shop Now</span>
            </div>
          </div>
        </a>
      {/each}
    </div>
  </section>