<script>
    import "../../app.css"
    // Modern Component (default)
    import ModernNavbar from "$lib/frontend-components/modern/modernLayout.svelte";
    import ModernFooter from "$lib/frontend-components/modern/footer.svelte";

    // Minimalist Components
    import MinimalistNavBar from "$lib/frontend-components/minimal/minimalistNavBar.svelte";

    // Classic Components
    import ClassicNavBar from "$lib/frontend-components/classic/classicNavBar.svelte";
    import ClassicFooter from "$lib/frontend-components/classic/footer.svelte";

    export let data;
    const settings = data.siteSettings.data;
    const theme = settings.storefront_theme.value || "modern";


</script>


<!-- Modern Components (default) -->

{#if theme === "modern"}
<ModernNavbar>
    <slot />
</ModernNavbar>
<ModernFooter />
{/if}
{#if theme === "minimal"}
    <!-- Minimalist Components -->
    <MinimalistNavBar />
    <slot />
{/if}
{#if theme === "classic"}
    <!-- Classic Components -->
    <ClassicNavBar />
    <slot />
    <ClassicFooter />
{/if}



