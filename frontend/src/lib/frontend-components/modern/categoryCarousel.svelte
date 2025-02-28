<script>
    import { onMount } from "svelte";

    const categories = [
        { id: 1, name: "Rings", image: "//new-ella-demo.myshopify.com/cdn/shop/files/brand-slider-1.jpg?v=1686192818" },
        { id: 2, name: "Necklaces", image: "img/23-1M902055_SGP_9_b2b-c.webp" },
        { id: 3, name: "Bracelets", image: "img/Heart-shape-gold-diamond-ring-on-transparent-background-PNG.png" },
        { id: 4, name: "Earrings", image: "img/Silver-Bracelet-Transparent.png" },
        { id: 5, name: "Pendants", image: "/images/pendants.jpg" },
        { id: 6, name: "Watches", image: "/images/watches.jpg" },
        { id: 7, name: "Brooches", image: "/images/brooches.jpg" },
        { id: 8, name: "Necklaces", image: "/images/necklaces.jpg" },
        { id: 9, name: "Bracelets", image: "/images/bracelets.jpg" },
        { id: 10, name: "Earrings", image: "/images/earrings.jpg" },
        { id: 11, name: "Pendants", image: "/images/pendants.jpg" },
        { id: 12, name: "Watches", image: "/images/watches.jpg" },
        { id: 13, name: "Brooches", image: "/images/brooches.jpg" },
    ];

    const allCategories = [...categories, ...categories, ...categories].map((c, index) => ({
        ...c,
        uniqueId: index
    }));

    let scrollContainer;
    let virtualScroll = 0;
    let W;
    const cardWidth = 200;

    const getScrollDistance = () => {
        return window.innerWidth < 768 ? cardWidth : cardWidth * 2;
    };

    const scrollLeft = () => {
        const distance = getScrollDistance();
        virtualScroll -= distance;
        updateScrollPosition();
    };

    const scrollRight = () => {
        const distance = getScrollDistance();
        virtualScroll += distance;
        updateScrollPosition();
    };

    const updateScrollPosition = () => {
        const offset = ((virtualScroll % W) + W) % W;
        const actualScroll = W + offset;
        scrollContainer.scrollTo({ left: actualScroll, behavior: "smooth" });
    };

    onMount(() => {
        W = scrollContainer.scrollWidth / 3;
        virtualScroll = 0;
        scrollContainer.scrollLeft = W;

        const handleResize = () => {
            W = scrollContainer.scrollWidth / 3;
            const offset = ((virtualScroll % W) + W) % W;
            scrollContainer.scrollLeft = W + offset;
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    });
</script>

<section class="py-12 w-full md:px-12">
    <div class="w-full px-4 md:px-8 lg:px-0">
        <div class="relative w-full">
            <button 
                aria-label="left-button" 
                class="btn btn-circle btn-ghost border absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10" 
                on:click={scrollLeft}
            >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                </svg>
            </button>
            <script>
                let scrollContainer;
              </script>
              
              <div
              bind:this={scrollContainer}
              class="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 lg:mx-0"
            >
              {#each allCategories as category (category.uniqueId)}
                <div
                  class="card card-compact w-[45%] md:w-[30%] xl:w-[15%] flex-shrink-0 snap-center bg-base-100 group"
                >
                  <figure class="relative h-48 w-full overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      class="h-full w-full object-contain transition-transform duration-300 group-hover:-translate-y-2 group-hover:border-b-4 border-black"
                    />
                  </figure>
                  <div class="card-body items-center gap-[0px]">
                    <h3 class="card-title text-lg group-hover:underline group-hover:text-info">{category.name}</h3>
                    <p class="text-lg">Shop now</p>
                  </div>
                </div>
              {/each}
            </div>

            <button 
                aria-label="right-button" 
                class="btn btn-circle btn-ghost absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10" 
                on:click={scrollRight}
            >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
            </button>
        </div>
    </div>
</section>

<style>
    .scrollbar-hide::-webkit-scrollbar {
        display: none;
    }

    .scrollbar-hide {
        -ms-overflow-style: none;
        scrollbar-width: none;
    }

    @media (min-width: 1024px) {
        section {
            margin-left: calc(-50vw + 50%);
            margin-right: calc(-50vw + 50%);
            width: 100vw;
        }
    }
</style>