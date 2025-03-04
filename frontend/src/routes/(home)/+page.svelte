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


let a = "modern";



</script>



{#if a === "modern"}
<!-- Modern Components (default) -->
    <ModernHero />
    <ModernCategories />
    <div class="divider"></div>
    <ModernNewArrivals />
    <ModernDoubleHero />
    <ModernFeaturedProducts />
    <ModernMustHave />
    <ModernFeatureCard />
    <div class="divider"></div>
{/if}
{#if a === "minimal"}
    <!-- Minimalist Components -->
    <MinimalistHero />
    <MinimalistCategories /> 
    <MinimalistFeaturedProducts />
    <MinimalistNewArrivals />
    <MinimalistFeatureCards />
    <MinimalistNewsletter /> 
{/if}
{#if a === "classic"}
<!-- Classic Components -->
    <ClassicHero />
    <ClassicCategories /> 
    <ClassicFeaturedProducts />
    <ClassicNewArrivals />
    <ClassicNewsletter /> 
    <ClassicFooter />
{/if}

