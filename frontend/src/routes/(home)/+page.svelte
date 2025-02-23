<script>
    import Hero from "$lib/frontend-components/hero.svelte";
    import CategoryCarousel from '$lib/frontend-components/categoryCarousel.svelte';
    import DoubleHero from "$lib/frontend-components/doubleHero.svelte";
    import NewArrivals from "$lib/frontend-components/NewArrivals.svelte";
    import FeaturedProducts from "$lib/frontend-components/featuredProducts.svelte";
    import MustHave from "$lib/frontend-components/mustHave.svelte";
    import FeatureCard from "$lib/frontend-components/featureCard.svelte";
    import Footer from "$lib/frontend-components/footer.svelte";
</script>
<Hero />
<CategoryCarousel />
<div class="divider"></div>
<NewArrivals />
<DoubleHero />
<FeaturedProducts />
<MustHave />
<FeatureCard />
<div class="divider"></div>
<Footer />