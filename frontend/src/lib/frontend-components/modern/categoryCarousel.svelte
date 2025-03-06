<script>
    import { onMount } from "svelte";
    export let data;

    const categories = data || [];


    let a = {
  category_id: "320f56ea-dab9-4f47-9721-44729c29351e",
  name: "Ringen Title",
  public_id: 3,
  slug: "Ringen Slug",
  description: "Dit zijn de ringen",
  image_url: null,
  visible: "visible",
  parent_id: null,
  created_at: "2025-03-04T16:54:40.000Z",
  updated_at: "2025-03-04T16:55:03.000Z",
  deleted_at: null,
  CategoryImages: [
    {
      image_id: "2504c7fe-4d65-4c82-b3cf-75c0041b4c9d",
      url: "/uploads/images-1741107293306.png",
      alt_text: "aaaa",
      is_primary: true,
      sort_order: 0
    },
    {
      image_id: "370b354a-5020-40b7-8d43-e66cd411d10b",
      url: "/uploads/images-1741107320187.png",
      alt_text: "aaaa",
      is_primary: false,
      sort_order: 1
    }
  ]
}



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

              
              <div
              bind:this={scrollContainer}
              class="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 lg:mx-0"
            >
              {#each categories as category}
                <div
                  on:click={window.location=`/categories/${category.public_id}`}
                  class="card card-compact w-[45%] md:w-[30%] xl:w-[15%] flex-shrink-0 snap-center bg-base-100 group"
                >
                
                  <figure class="relative h-48 w-full overflow-hidden">
                    <img
                      src={category.CategoryImages.url}
                      alt={category.CategoryImages.alt_text}
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