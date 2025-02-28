<script>
    import { ShoppingCart, Heart } from 'lucide-svelte';
    
    const featuredProducts = [
      {
        id: 1,
        name: "Premium Ultrabook Pro",
        price: 1299.99,
        originalPrice: 1499.99,
        rating: 4.8,
        reviewCount: 124,
        image: "/api/placeholder/300/300",
        href: "/product/premium-ultrabook-pro"
      },
      {
        id: 2,
        name: "SmartPhone X10",
        price: 899.99,
        originalPrice: 999.99,
        rating: 4.7,
        reviewCount: 89,
        image: "/api/placeholder/300/300",
        href: "/product/smartphone-x10"
      },
      {
        id: 3,
        name: "Wireless Noise-Canceling Headphones",
        price: 249.99,
        originalPrice: 299.99,
        rating: 4.9,
        reviewCount: 215,
        image: "/api/placeholder/300/300",
        href: "/product/wireless-headphones"
      },
      {
        id: 4,
        name: "4K Ultra HD Smart TV - 55\"",
        price: 699.99,
        originalPrice: 799.99,
        rating: 4.6,
        reviewCount: 178,
        image: "/api/placeholder/300/300",
        href: "/product/4k-smart-tv"
      }
    ];
    
    function formatPrice(price) {
      return price.toFixed(2);
    }
    
    function calculateDiscount(price, originalPrice) {
      if (!originalPrice || originalPrice <= price) return null;
      const discount = ((originalPrice - price) / originalPrice) * 100;
      return Math.round(discount);
    }
  </script>
  
  <section class="py-16 bg-base-200">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center mb-12">
        <div>
          <h2 class="text-3xl font-bold mb-2">Featured Products</h2>
          <p class="text-base-content/70">Handpicked favorites just for you</p>
        </div>
        <a href="/products" class="btn btn-outline">View All</a>
      </div>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {#each featuredProducts as product}
          <div class="card bg-base-100 shadow-md hover:shadow-lg transition-all duration-300">
            <!-- Product image with discount badge -->
            <figure class="relative px-4 pt-4">
              <a href={product.href}>
                <img
                  src={product.image}
                  alt={product.name}
                  class="rounded-lg h-48 w-full object-cover"
                />
              </a>
              
              {#if calculateDiscount(product.price, product.originalPrice)}
                <div class="absolute top-6 left-6 bg-error text-white text-xs font-bold px-2 py-1 rounded">
                  -{calculateDiscount(product.price, product.originalPrice)}%
                </div>
              {/if}
              
              <button class="absolute top-6 right-6 btn btn-circle btn-sm btn-ghost">
                <Heart size={16} />
              </button>
            </figure>
            
            <div class="card-body p-4">
              <!-- Rating -->
              <div class="flex items-center mb-2">
                <div class="rating rating-sm">
                  {#each Array(5) as _, i}
                    <input
                      type="radio"
                      name={`rating-${product.id}`}
                      class="mask mask-star-2 bg-orange-400"
                      checked={Math.round(product.rating) === i + 1}
                      disabled
                    />
                  {/each}
                </div>
                <span class="text-xs text-base-content/70 ml-2">
                  ({product.reviewCount} reviews)
                </span>
              </div>
              
              <!-- Product name -->
              <h3 class="text-lg font-medium mb-2">
                <a href={product.href} class="hover:text-primary transition-colors">
                  {product.name}
                </a>
              </h3>
              
              <!-- Price -->
              <div class="flex items-center mb-4">
                <span class="text-lg font-bold">${formatPrice(product.price)}</span>
                {#if product.originalPrice && product.originalPrice > product.price}
                  <span class="text-sm line-through text-base-content/50 ml-2">
                    ${formatPrice(product.originalPrice)}
                  </span>
                {/if}
              </div>
              
              <!-- Add to cart button -->
              <div class="card-actions justify-between items-center">
                <a href={product.href} class="text-sm font-medium text-primary">
                  View Details
                </a>
                <button class="btn btn-primary btn-sm">
                  <ShoppingCart size={16} class="mr-1" />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>