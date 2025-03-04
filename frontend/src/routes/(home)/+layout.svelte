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

    console.log(data)
let a = "modern";

</script>


<!-- Modern Components (default) -->

{#if a === "modern"}
<ModernNavbar>
    <slot />
</ModernNavbar>
<ModernFooter />
{/if}
{#if a === "minimal"}
    <!-- Minimalist Components -->
    <MinimalistNavBar />
    <slot />
{/if}
{#if a === "classic"}
    <!-- Classic Components -->
    <ClassicNavBar />
    <slot />
    <ClassicFooter />
{/if}



