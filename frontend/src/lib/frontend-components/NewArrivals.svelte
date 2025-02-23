<script>
    import { onMount } from "svelte";
    import { slide } from "svelte/transition";

    let currentPage = 0;
    let itemsPerPage = 5; // Default for large screens
    let totalPages = 1;

    const products = [
        { id: 1, name: "Rings", price: "$199", image: "//new-ella-demo.myshopify.com/cdn/shop/files/brand-slider-1.jpg?v=1686192818" },
        { id: 2, name: "Necklaces", price: "$199", image: "img/23-1M902055_SGP_9_b2b-c.webp" },
        { id: 3, name: "Bracelets", price: "$199", image: "img/Heart-shape-gold-diamond-ring-on-transparent-background-PNG.png" },
        { id: 4, name: "Rings", price: "$199", image: "//new-ella-demo.myshopify.com/cdn/shop/files/brand-slider-1.jpg?v=1686192818" },
        { id: 5, name: "Necklaces", price: "$199", image: "img/23-1M902055_SGP_9_b2b-c.webp" },
    ];

    function updateDisplayCount() {
        if (window.innerWidth < 640) {
            itemsPerPage = 2;
        } else if (window.innerWidth < 1024) {
            itemsPerPage = 3;
        } else {
            itemsPerPage = 5;
        }
        updateTotalPages();
        if (currentPage >= totalPages) {
            currentPage = Math.max(0, totalPages - 1);
        }
    }

    function updateTotalPages() {
        totalPages = Math.ceil(products.length / itemsPerPage);
    }

    function goToPage(page) {
        if (page >= 0 && page < totalPages) {
            currentPage = page;
        }
    }

    onMount(() => {
        updateDisplayCount();
        window.addEventListener('resize', updateDisplayCount);
        return () => window.removeEventListener('resize', updateDisplayCount);
    });

    $: dots = Array(totalPages).fill(0);
</script>

<section class="py-12 w-full md:px-12">
    <h2 class="text-3xl font-bold text-center">New Arrivals</h2>
    <p class="text-center mb-8 underline"><a href="/">View All</a></p>
    <div class="relative overflow-hidden">
        <div
            class="flex transition-transform duration-300 ease-in-out gap-3 md:mx-0 mx-3"
            style={`transform: translateX(-${currentPage * 100}%)`}
        >
        {#each products as product (product.id)}
        <div class="flex-shrink-0 w-1/2 sm:w-1/3 lg:w-1/5 bg-base-100 group">
          <figure class="w-full h-[175px] md:h-[250px] lg:h-[300px] xl:h-[325px]"> <!-- Set a height here -->
            <div class="w-full h-full flex items-end group" style="background-image: url('{product.image}'); background-size: cover; background-position: center;">
            <button class="w-full bg-secondary py-3 opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-in-out">
              ADD TO CART
            </button>
          </div>
          </figure>
          <div class="items-center gap-[0px] flex flex-col">
            <h3 class="card-title text-lg group-hover:underline group-hover:text-info">{product.name}</h3>
            <p class="text-lg">{product.price}</p>
          </div>
        </div>
      {/each}
        </div>
    </div>
    {#if totalPages > 1}
        <div class="flex justify-center gap-2 mt-6">
            {#each dots as _, i}
                <button
                    on:click={() => goToPage(i)}
                    class="w-3 h-3 rounded-full transition-all duration-300"
                    class:bg-primary={currentPage === i}
                    class:bg-gray-300={currentPage !== i}
                    aria-label={`Go to page ${i + 1}`}
                ></button>
            {/each}
        </div>
    {/if}
</section>