<script>
    const heroInfo = {
      title: "Latest Tech for Modern Life",
      subtitle: "Discover amazing deals on the newest electronics",
      buttonText: "Shop Now",
      buttonLink: "/products"
    };
  </script>
  
  <section class="bg-base-200">
    <div class="container mx-auto px-4 py-16 flex flex-col md:flex-row items-center">
      <!-- Hero content -->
      <div class="md:w-1/2 mb-10 md:mb-0 md:pr-10">
        <h1 class="text-4xl md:text-5xl font-bold leading-tight mb-4">
          {heroInfo.title}
        </h1>
        <p class="text-lg md:text-xl mb-8 text-base-content/80">
          {heroInfo.subtitle}
        </p>
        <div class="flex space-x-4">
          <a href={heroInfo.buttonLink} class="btn btn-primary btn-lg">
            {heroInfo.buttonText}
          </a>
          <a href="/deals" class="btn btn-outline btn-lg">
            View Deals
          </a>
        </div>
      </div>
      
      <!-- Hero image -->
      <div class="md:w-1/2">
        <div class="bg-base-100 p-4 rounded-lg shadow-lg">
          <img
            src="/api/placeholder/800/500"
            alt="Latest electronics showcase"
            class="w-full h-auto rounded-md"
          />
        </div>
      </div>
    </div>
  </section>