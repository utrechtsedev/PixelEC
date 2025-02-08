
<script>
  import TotalUsersChart from "$lib/components/totalUsersChart.svelte";

</script>
<div class="flex flex-col w-full bg-base-200 rounded-xl p-4">
    <h1 class="text-2xl font-bold">
        Quick Actions
    </h1>
    <div class="flex justify-between pt-3">
        <div class="flex flex-col">
            <h2 class="text-xl font-bold">Products:</h2>
            <a href="/">• Add a new product</a>
            <a href="/">• Edit stock of a product</a>
            <a href="/">• Manage all products</a>
            <a href="/">• View all categories</a>
        </div>
        <div class="flex flex-col">
            <h2 class="text-xl font-bold">Customers:</h2>
            <a href="/">• Add a new Customer</a>
            <a href="/">• Manage existing customer</a>
            <a href="/">• Manage Customers</a>
            <a href="/">• View customer List</a>
        </div>
        <div class="flex flex-col">
            <h2 class="text-xl font-bold">Finances:</h2>
            <a href="/">• View all finances</a>
            <a href="/">• Create a financial Report</a>
            <a href="/">• Add a new Transaction</a>
            <a href="/">• Manage your finances</a>
        </div>
        <div class="flex flex-col">
            <h2 class="text-xl font-bold">Orders:</h2>
            <a href="/">• Place a new order</a>
            <a href="/">• Edit existing order</a>
            <a href="/">• Manage all orders</a>
            <a href="/">• View order history</a>
        </div>
        <!-- empty div -->
        <div></div>
    </div>
</div>

<TotalUsersChart />