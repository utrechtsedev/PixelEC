<script>
    const newArrivals = [
      {
        id: 1,
        name: "Smart Watch Series 5",
        price: 299.99,
        image: "/api/placeholder/250/250",
        href: "/product/smart-watch-series-5",
        badge: "New"
      },
      {
        id: 2,
        name: "Wireless Gaming Mouse",
        price: 79.99,
        image: "/api/placeholder/250/250",
        href: "/product/wireless-gaming-mouse",
        badge: "New"
      },
      {
        id: 3,
        name: "Portable Bluetooth Speaker",
        price: 129.99,
        image: "/api/placeholder/250/250",
        href: "/product/bluetooth-speaker",
        badge: "New"
      }
    ];
  </script>
  
  <section class="py-16 container mx-auto px-4">
    <div class="text-center mb-12">
      <h2 class="text-3xl font-bold mb-2">New Arrivals</h2>
      <p class="text-base-content/70">Check out our latest products</p>
    </div>
    
    <div class="flex flex-col md:flex-row">
      <!-- Large featured new arrival -->
      <div class="md:w-1/2 mb-6 md:mb-0 md:pr-4">
        <div class="relative h-full bg-base-100 rounded-lg shadow-md overflow-hidden">
          <img
            src="/api/placeholder/600/600"
            alt="Featured new arrival"
            class="w-full h-96 object-cover"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 text-white">
            <span class="badge badge-primary mb-2">Just Arrived</span>
            <h3 class="text-2xl font-bold mb-1">Ultra HD Curved Monitor</h3>
            <p class="mb-3 text-white/80">Experience immersive viewing with our latest curved display technology</p>
            <div class="flex justify-between items-center">
              <span class="text-xl font-bold">$499.99</span>
              <a href="/product/curved-monitor" class="btn btn-primary">
                View Product
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Smaller new arrivals -->
      <div class="md:w-1/2 md:pl-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {#each newArrivals as product}
            <div class="card bg-base-100 shadow-md">
              <figure class="relative px-4 pt-4">
                <a href={product.href}>
                  <img
                    src={product.image}
                    alt={product.name}
                    class="rounded-lg h-36 w-full object-cover"
                  />
                </a>
                {#if product.badge}
                  <div class="absolute top-6 left-6 badge badge-primary">{product.badge}</div>
                {/if}
              </figure>
              <div class="card-body p-4">
                <h3 class="card-title text-base">
                  <a href={product.href} class="hover:text-primary transition-colors">
                    {product.name}
                  </a>
                </h3>
                <p class="text-lg font-bold">${product.price}</p>
                <div class="card-actions justify-end mt-2">
                  <a href={product.href} class="btn btn-sm btn-outline">
                    View Details
                  </a>
                </div>
              </div>
            </div>
          {/each}
          
          <!-- View all button for smaller screens -->
          <div class="card bg-base-200 shadow-md sm:hidden">
            <div class="card-body flex items-center justify-center">
              <a href="/new-arrivals" class="btn btn-primary">
                View All New Arrivals
              </a>
            </div>
          </div>
        </div>
        
        <!-- View all button for larger screens -->
        <div class="hidden sm:flex justify-center mt-6">
          <a href="/new-arrivals" class="btn btn-outline">
            View All New Arrivals
          </a>
        </div>
      </div>
    </div>
  </section>