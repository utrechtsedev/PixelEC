
<script>
  import TotalUsersChart from "$lib/components/totalUsersChart.svelte";
  import TotalSalesChart from "$lib/components/totalSalesChart.svelte";
    import ProfitExpenseChart from "$lib/components/profitExpenseChart.svelte";
    import OrderTable from "$lib/components/orderTable.svelte";

    export let data; 
//  let data = [
//     {
//       order_id: 1,
//       created_at: '2024-03-15',
//       customer: 'John Doe',
//       total_amount: 149.99,
//       payment_status: 'Paid',
//       fulfillment_status: 'Shipped',
//       items: 5
//     }
//   ]
  // Tijdelijke logging
  import { onMount } from 'svelte';
  onMount(() => {
    console.log('Ontvangen data:', data);
  });
</script>


<div class="bg-base-200 rounded-xl p-4 collapse collapse-plus">
    <input type="checkbox" name="my-accordion-3" checked="checked" />
    <div class="collapse-title text-2xl font-bold mb-4 md:mb-6">
        Quick Actions
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 collapse-content">
        <!-- Products Column -->
        <div class="flex flex-col space-y-2">
            <h2 class="text-xl font-bold mb-2">Products:</h2>
            <a href="/" class="text-sm md:text-base hover:text-primary">• Add a new product</a>
            <a href="/" class="text-sm md:text-base hover:text-primary">• Edit stock of a product</a>
            <a href="/" class="text-sm md:text-base hover:text-primary">• Manage all products</a>
            <a href="/" class="text-sm md:text-base hover:text-primary">• View all categories</a>
        </div>

        <!-- Customers Column -->
        <div class="flex flex-col space-y-2">
            <h2 class="text-xl font-bold mb-2">Customers:</h2>
            <a href="/" class="text-sm md:text-base hover:text-primary">• Add a new Customer</a>
            <a href="/" class="text-sm md:text-base hover:text-primary">• Manage existing customer</a>
            <a href="/" class="text-sm md:text-base hover:text-primary">• Manage Customers</a>
            <a href="/" class="text-sm md:text-base hover:text-primary">• View customer List</a>
        </div>

        <!-- Finances Column -->
        <div class="flex flex-col space-y-2">
            <h2 class="text-xl font-bold mb-2">Finances:</h2>
            <a href="/" class="text-sm md:text-base hover:text-primary">• View all finances</a>
            <a href="/" class="text-sm md:text-base hover:text-primary">• Create a financial Report</a>
            <a href="/" class="text-sm md:text-base hover:text-primary">• Add a new Transaction</a>
            <a href="/" class="text-sm md:text-base hover:text-primary">• Manage your finances</a>
        </div>

        <!-- Orders Column -->
        <div class="flex flex-col space-y-2">
            <h2 class="text-xl font-bold mb-2">Orders:</h2>
            <a href="/" class="text-sm md:text-base hover:text-primary">• Place a new order</a>
            <a href="/" class="text-sm md:text-base hover:text-primary">• Edit existing order</a>
            <a href="/" class="text-sm md:text-base hover:text-primary">• Manage all orders</a>
            <a href="/" class="text-sm md:text-base hover:text-primary">• View order history</a>
        </div>
    </div>
</div>
<div class="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
    <div class="w-full h-full"><TotalUsersChart /></div>
    <div class="w-full h-full"><TotalSalesChart /></div>
    <div class="w-full h-full"><ProfitExpenseChart /></div>
</div>
<OrderTable data={data?.orders || []} />