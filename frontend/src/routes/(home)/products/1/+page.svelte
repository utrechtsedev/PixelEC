<script>
    import { onMount } from 'svelte';
    
    // Product data
    let product = {
      id: 1,
      name: "Premium Wireless Headphones",
      description: "Experience unparalleled sound quality with our Premium Wireless Headphones. Featuring advanced noise-cancellation technology and 30-hour battery life.",
      price: 249.99,
      compareAtPrice: 299.99,
      discount: 17,
      rating: 4.8,
      reviewCount: 342,
      sku: "PH-NC100-BLK",
      barcode: "123456789012",
      vendor: "AudioTech",
      stockCount: 24,
      inStock: true,
      isBestseller: true,
      images: [
        { url: '/api/placeholder/800/800', alt: 'Premium Wireless Headphones - Front View' },
        { url: '/api/placeholder/800/800', alt: 'Premium Wireless Headphones - Side View' },
        { url: '/api/placeholder/800/800', alt: 'Premium Wireless Headphones - Lifestyle' },
        { url: '/api/placeholder/800/800', alt: 'Premium Wireless Headphones - Carrying Case' },
        { url: '/api/placeholder/800/800', alt: 'Premium Wireless Headphones - Accessories' }
      ],
      thumbnails: [
        { url: '/api/placeholder/120/120', alt: 'Thumbnail 1' },
        { url: '/api/placeholder/120/120', alt: 'Thumbnail 2' },
        { url: '/api/placeholder/120/120', alt: 'Thumbnail 3' },
        { url: '/api/placeholder/120/120', alt: 'Thumbnail 4' },
        { url: '/api/placeholder/120/120', alt: 'Thumbnail 5' }
      ],
      options: {
        colors: [
          { name: 'Matte Black', value: '#1a1a1a', code: 'BLK', isSelected: true },
          { name: 'Silver', value: '#c0c0c0', code: 'SLV', isSelected: false },
          { name: 'Navy Blue', value: '#000080', code: 'NVY', isSelected: false }
        ],
        sizes: []
      },
      features: [
        "Active noise cancellation",
        "30-hour battery life",
        "Bluetooth 5.0 connectivity",
        "Touch controls on ear cup",
        "Voice assistant compatible"
      ],
      shipping: {
        free: true,
        estimatedDelivery: "2-4 business days"
      },
      guarantee: "30-day money-back guarantee"
    };
  
    // State variables
    let quantity = 1;
    let selectedImageIndex = 0;
    let expandedImage = false;
    
    // Format price with currency
    const formatPrice = (price) => {
      return new Intl.NumberFormat('en-US', { 
        style: 'currency', 
        currency: 'USD',
        minimumFractionDigits: 2
      }).format(price);
    };
    
    // Get selected color
    $: selectedColor = product.options.colors.find(c => c.isSelected) || product.options.colors[0];
    
    // Handle color selection
    function selectColor(colorCode) {
      product.options.colors = product.options.colors.map(c => ({
        ...c,
        isSelected: c.code === colorCode
      }));
    }
    
    // Increment/decrement quantity
    function changeQuantity(amount) {
      const newQuantity = quantity + amount;
      if (newQuantity >= 1 && newQuantity <= product.stockCount) {
        quantity = newQuantity;
      }
    }
    
    // Add to cart functionality
    function addToCart() {
      alert(`Added ${quantity} ${product.name} (${selectedColor.name}) to cart`);
    }
    
    // Buy now functionality
    function buyNow() {
      alert(`Proceeding to checkout for ${quantity} ${product.name} (${selectedColor.name})`);
    }
    
    // Toggle zoom on main image
    function toggleExpandImage() {
      expandedImage = !expandedImage;
    }
    
    // Calculate savings
    $: savings = product.compareAtPrice ? (product.compareAtPrice - product.price).toFixed(2) : 0;
  </script>
  
  <!-- Modern Product Page Layout -->
  <div class="bg-white min-h-screen">
    <div class="container mx-auto px-4 py-8">
      <!-- Breadcrumbs -->
      <nav class="text-sm mb-8">
        <ol class="flex flex-wrap items-center">
          <li class="flex items-center">
            <a href="/" class="text-gray-500 hover:text-primary">Home</a>
            <svg class="h-4 w-4 mx-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </li>
          <li class="flex items-center">
            <a href="/collections" class="text-gray-500 hover:text-primary">Collections</a>
            <svg class="h-4 w-4 mx-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </li>
          <li class="flex items-center">
            <a href="/collections/audio" class="text-gray-500 hover:text-primary">Audio</a>
            <svg class="h-4 w-4 mx-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </li>
          <li class="text-gray-700 font-medium">{product.name}</li>
        </ol>
      </nav>
  
      <!-- Product Layout - Left Image, Right Details -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        <!-- Left Column: Product Images -->
        <div class="space-y-4">
          <!-- Main Image -->
          <div class="relative rounded-lg overflow-hidden bg-gray-100 hover:bg-gray-200 transition-colors">
            <button 
              class="w-full h-full cursor-zoom-in focus:outline-none"
              on:click={toggleExpandImage}
            >
              <img 
                src={product.images[selectedImageIndex].url} 
                alt={product.images[selectedImageIndex].alt}
                class="w-full h-auto object-contain aspect-square"
              />
            </button>
            
            {#if product.isBestseller}
              <div class="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-full">
                Bestseller
              </div>
            {/if}
            
            {#if product.compareAtPrice}
              <div class="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                Save {product.discount}%
              </div>
            {/if}
          </div>
          
          <!-- Thumbnail Images -->
          <div class="grid grid-cols-5 gap-2">
            {#each product.thumbnails as thumbnail, i}
              <button 
                class="rounded-md overflow-hidden focus:outline-none border transition-all
                      {selectedImageIndex === i ? 'border-primary ring-2 ring-primary ring-opacity-50' : 'border-gray-200 hover:border-gray-300'}"
                on:click={() => selectedImageIndex = i}
              >
                <img 
                  src={thumbnail.url} 
                  alt={thumbnail.alt}
                  class="w-full h-auto object-cover aspect-square"
                />
              </button>
            {/each}
          </div>
        </div>
        
        <!-- Right Column: Product Details -->
        <div class="flex flex-col">
          <!-- Product title and vendor -->
          <div class="mb-4">
            <div class="flex items-center justify-between">
              <p class="text-gray-500 text-sm mb-1">{product.vendor}</p>
              <div class="flex items-center">
                <div class="rating rating-sm">
                  {#each Array(5) as _, i}
                    <input 
                      type="radio" 
                      name="product-rating" 
                      class="mask mask-star-2 bg-yellow-400" 
                      disabled 
                      checked={Math.round(product.rating) === i + 1}
                    />
                  {/each}
                </div>
                <a href="#reviews" class="text-sm text-primary hover:underline ml-2">
                  {product.reviewCount} reviews
                </a>
              </div>
            </div>
            <h1 class="text-3xl font-bold text-gray-900">{product.name}</h1>
          </div>
          
          <!-- Price section -->
          <div class="mb-6">
            <div class="flex items-center">
              <span class="text-2xl font-bold text-gray-900">{formatPrice(product.price)}</span>
              {#if product.compareAtPrice}
                <span class="text-lg line-through text-gray-500 ml-2">
                  {formatPrice(product.compareAtPrice)}
                </span>
                <span class="ml-2 text-sm font-medium text-green-600">
                  Save {formatPrice(savings)}
                </span>
              {/if}
            </div>
            {#if product.shipping.free}
              <p class="text-green-600 text-sm mt-1">
                <span class="font-medium">Free shipping</span> 
                <span class="text-gray-600">· Estimated delivery: {product.shipping.estimatedDelivery}</span>
              </p>
            {/if}
          </div>
          
          <!-- Color options -->
          <div class="mb-6">
            <div class="flex items-center justify-between mb-2">
              <h3 class="font-medium text-gray-900">Color: <span class="text-gray-600">{selectedColor.name}</span></h3>
            </div>
            <div class="flex space-x-3">
              {#each product.options.colors as color}
                <button 
                  class="w-10 h-10 rounded-full p-0.5 focus:outline-none transition-all
                        {color.isSelected ? 'ring-2 ring-offset-2 ring-primary' : 'ring-1 ring-gray-300'}"
                  style="background-color: {color.value};"
                  on:click={() => selectColor(color.code)}
                  title={color.name}
                >
                  {#if color.isSelected}
                    <div class="w-full h-full rounded-full flex items-center justify-center bg-transparent">
                      <svg class="h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M5 13l4 4L19 7" stroke-linecap="round" stroke-linejoin="round"></path>
                      </svg>
                    </div>
                  {/if}
                </button>
              {/each}
            </div>
          </div>
          
          <!-- Quantity Selector -->
          <div class="mb-6">
            <h3 class="font-medium text-gray-900 mb-2">Quantity</h3>
            <div class="flex h-10">
              <button 
                class="bg-gray-100 rounded-l-lg px-3 py-2 border border-r-0 border-gray-300 focus:outline-none hover:bg-gray-200"
                on:click={() => changeQuantity(-1)}
                disabled={quantity <= 1}
              >
                <svg class="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                </svg>
              </button>
              <input 
                type="number" 
                bind:value={quantity}
                min="1" 
                max={product.stockCount}
                class="w-16 border border-gray-300 text-center focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
              />
              <button 
                class="bg-gray-100 rounded-r-lg px-3 py-2 border border-l-0 border-gray-300 focus:outline-none hover:bg-gray-200"
                on:click={() => changeQuantity(1)}
                disabled={quantity >= product.stockCount}
              >
                <svg class="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
              </button>
              
              <span class="ml-3 text-sm text-gray-500 self-center">
                {product.stockCount} available
              </span>
            </div>
          </div>
          
          <!-- Action Buttons -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
            <button 
              class="btn btn-primary w-full h-12 rounded-lg"
              on:click={addToCart}
            >
              Add to Cart
            </button>
            <button 
              class="btn bg-gray-900 hover:bg-black text-white border-none w-full h-12 rounded-lg"
              on:click={buyNow}
            >
              Buy Now
            </button>
          </div>
          
          <!-- Additional buttons -->
          <div class="flex justify-between mb-8">
            <button class="btn btn-ghost btn-sm flex items-center text-gray-600">
              <svg class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              Add to Wishlist
            </button>
            <button class="btn btn-ghost btn-sm flex items-center text-gray-600">
              <svg class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              Share
            </button>
          </div>
          
          <!-- Product Features -->
          <div class="border-t border-b py-4 mb-6">
            <h3 class="font-medium text-gray-900 mb-2">Features:</h3>
            <ul class="space-y-1">
              {#each product.features as feature}
                <li class="flex items-start">
                  <svg class="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="text-gray-700">{feature}</span>
                </li>
              {/each}
            </ul>
          </div>
          
          <!-- Product Info & Policies -->
          <div class="space-y-4 text-sm">
            <div class="grid grid-cols-2 gap-4">
              <div class="flex items-center">
                <svg class="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span class="text-gray-700">{product.guarantee}</span>
              </div>
              <div class="flex items-center">
                <svg class="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span class="text-gray-700">In stock, ready to ship</span>
              </div>
            </div>
            
            <div class="grid grid-cols-2 gap-4">
              <div class="flex items-center">
                <svg class="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                <span class="text-gray-700">Secure checkout</span>
              </div>
              <div class="flex items-center">
                <svg class="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                <span class="text-gray-700">SKU: {product.sku}</span>
              </div>
            </div>
          </div>
          
          <!-- Product Description Collapse -->
          <details class="group mt-8">
            <summary class="flex justify-between items-center cursor-pointer list-none">
              <h3 class="text-lg font-medium text-gray-900">Description</h3>
              <span class="transition group-open:rotate-180">
                <svg class="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </summary>
            <div class="mt-3 text-gray-700">
              <p class="mb-2">{product.description}</p>
              <p>Experience crystal-clear audio with deep, powerful bass and crisp highs. These headphones are designed for comfort during extended listening sessions with soft, memory foam ear cushions and an adjustable headband. The active noise cancellation technology uses advanced algorithms to block out ambient sounds, allowing you to focus on your music or calls without distractions.</p>
            </div>
          </details>
          
          <details class="group mt-4 border-b pb-4">
            <summary class="flex justify-between items-center cursor-pointer list-none">
              <h3 class="text-lg font-medium text-gray-900">Shipping & Returns</h3>
              <span class="transition group-open:rotate-180">
                <svg class="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </summary>
            <div class="mt-3 text-gray-700">
              <p class="mb-2"><strong>Free standard shipping</strong> on orders over $50</p>
              <p class="mb-2">Estimated delivery time: {product.shipping.estimatedDelivery}</p>
              <p class="mb-2"><strong>30-day returns</strong> for unopened products</p>
              <p>Return shipping fee: $5.99</p>
            </div>
          </details>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Image modal for zoom view (would be implemented with a proper modal component in a real app) -->
  {#if expandedImage}
    <div class="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50" on:click={toggleExpandImage}>
      <div class="relative max-w-5xl max-h-screen p-4">
        <img 
          src={product.images[selectedImageIndex].url} 
          alt={product.images[selectedImageIndex].alt}
          class="max-w-full max-h-[90vh] object-contain"
        />
        <button 
          class="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70"
          on:click|stopPropagation={toggleExpandImage}
        >
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  {/if}