<script>
    // Modern Component (default)
    import ModernHero from "$lib/frontend-components/modern/hero.svelte";
    import ModernCategories from "$lib/frontend-components/modern/categoryCarousel.svelte";
    import ModernNewArrivals from "$lib/frontend-components/modern/newArrivals.svelte";
    import ModernDoubleHero from "$lib/frontend-components/modern/doubleHero.svelte"
    import ModernFeaturedProducts from "$lib/frontend-components/modern/featuredProducts.svelte";
    import ModernMustHave from "$lib/frontend-components/modern/mustHave.svelte"
    import ModernFeatureCard from "$lib/frontend-components/modern/featureCard.svelte"
    // Minimalist Components
    import MinimalistHero from "$lib/frontend-components/minimal/Hero.svelte";
    import MinimalistCategories from "$lib/frontend-components/minimal/categories.svelte";
    import MinimalistFeaturedProducts from "$lib/frontend-components/minimal/featuredProducts.svelte";
    import MinimalistNewArrivals from "$lib/frontend-components/minimal/newArrivals.svelte";
    import MinimalistFeatureCards from "$lib/frontend-components/minimal/featureCards.svelte";
    import MinimalistNewsletter from "$lib/frontend-components/minimal/newsletter.svelte";
    // Classic Components
    import ClassicHero from "$lib/frontend-components/classic/hero.svelte";
    import ClassicCategories from "$lib/frontend-components/classic/categories.svelte";
    import ClassicFeaturedProducts from "$lib/frontend-components/classic/featuredProducts.svelte";
    import ClassicNewArrivals from "$lib/frontend-components/classic/newArrivals.svelte";
    import ClassicNewsletter from "$lib/frontend-components/classic/newsletter.svelte";
    export let data;
    const products = data.products.products;
    const categories = data.categories;
    const settings = data.siteSettings.data;
    const theme = settings.storefront_theme.value || "modern";
    const hero = settings.modern_component_hero;

   // Get 5 newest products with error handling
   let newestFiveProducts = [];
    try {
      // Check if products exists and is an array
      if (products && Array.isArray(products) && products.length > 0) {
        // Create a shallow copy of the products array
        const productsCopy = [...products];
        
        // Sort products by created_at in descending order (newest first)
        const sortedProducts = productsCopy.sort((a, b) => {
          return new Date(b.created_at) - new Date(a.created_at);
        });
        
        // Get the 5 newest products
        newestFiveProducts = sortedProducts.slice(0, 5);
      } else {
        console.warn('Products data is not available or not in the expected format');
      }
    } catch (error) {
      console.error('Error processing products:', error);
    }

    // filter 5 featured products
</script>


{#if theme === "modern"}
<!-- Modern Components (default) -->
    <ModernHero data={hero} />
    <ModernCategories data={categories} />
    <div class="divider"></div>
    <ModernNewArrivals data={newestFiveProducts} />
    <ModernDoubleHero />
    <ModernFeaturedProducts data={newestFiveProducts}/>
    <ModernMustHave />
    <ModernFeatureCard />
    <div class="divider"></div>
{/if}
{#if theme === "minimal"}
    <!-- Minimalist Components -->
    <MinimalistHero />
    <MinimalistCategories /> 
    <MinimalistFeaturedProducts />
    <MinimalistNewArrivals />
    <MinimalistFeatureCards />
    <MinimalistNewsletter /> 
{/if}
{#if theme === "classic"}
<!-- Classic Components -->
    <ClassicHero />
    <ClassicCategories /> 
    <ClassicFeaturedProducts />
    <ClassicNewArrivals />
    <ClassicNewsletter /> 
{/if}

