<script>
    import Wysiwyg from "$lib/components/wysiwyg.svelte";
    export let data;
    export let content;

    let categories = data.data 
    const filteredCategories = categories.filter(category => category.parent_id === null)
</script>
<div class="flex flex-col md:flex-row items-start gap-4 mt-5">
    <!-- Left Column (8/12 on desktop, full width on mobile) -->
    <div class="flex flex-col bg-base-200 col-span-2 p-4 h-full rounded-lg w-full md:w-8/12">
        <h3 class="text-xl">Title</h3>
        <input
            class="input input-bordered"
            type="text"
            name="title"
            id="title"
            placeholder="e.g. Summer collection, Under $100, Bikes & Accessoires"
        />
        <label class="text-xl" for="description">Description</label>
        <Wysiwyg />
    </div>

    <!-- Right Column (4/12 on desktop, full width on mobile) -->
    <div class="flex flex-col bg-base-200 w-full md:w-4/12 p-4 h-full rounded-lg">
        <p class="text-xl font-bold">Options</p>
        <label for="childOf">Subcategory of:</label>
        <select name="childOf" id="childOf" class="select">
            <option value="">---</option>
            {#each filteredCategories as category}
                <option value={category.category_id}>{category.name}</option>
            {/each}
        </select>
    </div>
</div>