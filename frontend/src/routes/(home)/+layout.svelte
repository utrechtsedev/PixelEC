<script>
    import TopNav from "$lib/frontend-components/classic/topNav.svelte";
import ModernLayout from "$lib/frontend-components/modern/modernLayout.svelte";
import TopNavBar from "$lib/frontend-components/modern/modernLayout.svelte";
import "../../app.css"
</script>

<!-- <ModernLayout>
    <slot />
</ModernLayout> -->

<TopNav />
<slot />