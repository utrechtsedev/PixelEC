<script>
    import ClassicNavBar from "$lib/frontend-components/classic/classicNavBar.svelte";
    import MinimalistNavBar from "$lib/frontend-components/minimal/minimalistNavBar.svelte";
import ModernLayout from "$lib/frontend-components/modern/modernLayout.svelte";
import TopNavBar from "$lib/frontend-components/modern/modernLayout.svelte";
import "../../app.css"
</script>

<ModernLayout>
    <slot />
</ModernLayout>

<!-- <ClassicNavBar />
<slot /> -->

<!-- Minimalist -->
 <!-- <MinimalistNavBar />
 <slot /> -->