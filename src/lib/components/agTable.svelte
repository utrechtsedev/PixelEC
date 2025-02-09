<script>
    export let data = [];
  
    let currentPage = 1;
    $: totalPages = Math.ceil(data.length / 10);
    $: paginatedData = data.slice((currentPage - 1) * 10, currentPage * 10);
    
    $: {
        // Adjust current page if out of bounds when data changes
        if (currentPage > totalPages && totalPages > 0) {
            currentPage = totalPages;
        } else if (totalPages === 0) {
            currentPage = 1;
        }
    }

    // Status kleuren configuratie
    const statusStyles = {
      payment: {
        Paid: 'bg-success text-success-content',
        Pending: 'bg-warning text-warning-content'
      },
      fulfillment: {
        Shipped: 'bg-info text-info-content',
        Delivered: 'bg-success text-success-content',
        Pending: 'bg-warning text-warning-content',
        Cancelled: 'bg-error text-error-content'
      }
    };
</script>
<div class="">
    <div class="p-4 bg-base-300 rounded-t-xl">
        <h2 class="text-3xl font-bold">Open Orders</h2>
    </div>
    <div class="overflow-x-auto rounded-lg shadow-md bg-base-300 pb-3">
        {#if data.length === 0}
            <div class="text-center p-8 bg-base-200 rounded-b-lg">
                <p class="text-gray-500">No orders found</p>
            </div>
        {:else}
            <table class="table table-zebra table-md bg-base-100">
                <thead class="bg-base-200">
                    <tr>
                        <th class="text-left">Order ID</th>
                        <th class="text-left">Date</th>
                        <th class="text-left">Customer</th>
                        <th class="text-right">Total</th>
                        <th class="text-center">Payment</th>
                        <th class="text-center">Fulfillment</th>
                        <th class="text-right">Items</th>
                    </tr>
                </thead>
                <tbody>
                    {#each paginatedData as order (order.order_id)}
                    
                        <tr class="hover:bg-base-200 transition-colors">
                            <td class="font-mono">#{order.order_id}</td>
                            <td>
                                {new Date(order.created_at).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                })}
                            </td>
                            <td>{order.customer}</td>
                            <td class="text-right font-semibold">
                                €{order.total_amount.toFixed(2)}
                            </td>
                            <td class="text-center">
                                <span class="badge badge-lg {statusStyles.payment[order.payment_status]}">
                                    {order.payment_status}
                                </span>
                            </td>
                            <td class="text-center">
                                <span class="badge badge-lg {statusStyles.fulfillment[order.fulfillment_status]}">
                                    {order.fulfillment_status}
                                </span>
                            </td>
                            <td class="text-right">{order.items} items</td>
                        </tr>
                    {/each}
                </tbody>
            </table>

            <!-- Pagination -->
            <div class="join grid grid-cols-2 w-64 mt-4 mx-auto">
                <button 
                    class="join-item btn btn-outline" 
                    on:click={() => currentPage--}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <button 
                    class="join-item btn btn-outline" 
                    on:click={() => currentPage++}
                    disabled={currentPage === totalPages || totalPages === 0}
                >
                    Next
                </button>
            </div>
        {/if}
    </div>
</div>