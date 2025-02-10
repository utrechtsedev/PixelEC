<script>
    export let data = [];
    let currentPage = 1;
    let selectedFilter = 'Open';
    let searchQuery = '';
    let sortBy = 'created_at'; // Default sort by date
    let sortDirection = 'desc'; // Default sort direction

    // Reactive filtered data
    $: filteredData = data.filter(order => {
        switch(selectedFilter) {
            case 'Open':
                return !['Delivered', 'Cancelled'].includes(order.fulfillment_status);
            case 'Unfulfilled':
                return order.fulfillment_status === 'Pending';
            case 'Unpaid':
                return order.payment_status === 'Pending';
            case 'Closed':
                return ['Delivered', 'Cancelled'].includes(order.fulfillment_status);
            case 'All':
            default:
                return true;
        }
    }).filter(order => {
        // Search functionality
        return order.order_id.toString().includes(searchQuery) ||
               order.customer.toLowerCase().includes(searchQuery.toLowerCase());
    }).sort((a, b) => {
        // Sort functionality
        if (sortBy === 'created_at') {
            return sortDirection === 'asc' ? new Date(a.created_at) - new Date(b.created_at) : new Date(b.created_at) - new Date(a.created_at);
        } else if (sortBy === 'total_amount') {
            return sortDirection === 'asc' ? a.total_amount - b.total_amount : b.total_amount - a.total_amount;
        } else if (sortBy === 'customer') {
            return sortDirection === 'asc' ? a.customer.localeCompare(b.customer) : b.customer.localeCompare(a.customer);
        }
        return 0;
    });

    // Reset to first page when filter or search changes
    $: selectedFilter, searchQuery, sortBy, sortDirection, currentPage = 1;

    $: totalPages = Math.ceil(filteredData.length / 10);
    $: paginatedData = filteredData.slice((currentPage - 1) * 10, currentPage * 10);

    $: {
        // Adjust current page if out of bounds
        if (currentPage > totalPages && totalPages > 0) {
            currentPage = totalPages;
        } else if (totalPages === 0) {
            currentPage = 1;
        }
    }

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
    <div class="p-4 bg-base-300 rounded-t-xl flex flex-wrap gap-4">
        <h2 class="text-3xl font-bold mb-4 mr-4">Open Orders</h2>
        <div class="flex flex-wrap gap-2">
            <button on:click={() => selectedFilter = 'Open'}
                class="btn btn-sm"
                class:btn-primary={selectedFilter === 'Open'}
                class:btn-outline={selectedFilter !== 'Open'}
            >
                Open
            </button>
            <button on:click={() => selectedFilter = 'Unfulfilled'}
                class="btn btn-sm"
                class:btn-primary={selectedFilter === 'Unfulfilled'}
                class:btn-outline={selectedFilter !== 'Unfulfilled'}
            >
                Unfulfilled
            </button>
            <button on:click={() => selectedFilter = 'Unpaid'}
                class="btn btn-sm"
                class:btn-primary={selectedFilter === 'Unpaid'}
                class:btn-outline={selectedFilter !== 'Unpaid'}
            >
                Unpaid
            </button>
            <button on:click={() => selectedFilter = 'Closed'}
                class="btn btn-sm"
                class:btn-primary={selectedFilter === 'Closed'}
                class:btn-outline={selectedFilter !== 'Closed'}
            >
                Closed
            </button>
            <button on:click={() => selectedFilter = 'All'}
                class="btn btn-sm"
                class:btn-primary={selectedFilter === 'All'}
                class:btn-outline={selectedFilter !== 'All'}
            >
                All
            </button>
        </div>
        <input
            type="text"
            bind:value={searchQuery}
            placeholder="Search orders..."
            class="input input-bordered input-sm"
        />
        <select
            bind:value={sortBy}
            class="select select-bordered select-sm"
        >
            <option value="created_at">Date</option>
            <option value="total_amount">Total Amount</option>
            <option value="customer">Customer</option>
        </select>
        <select
            bind:value={sortDirection}
            class="select select-bordered select-sm"
        >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
        </select>
    </div>
    <div class="overflow-x-auto rounded-lg shadow-md bg-base-300 pb-3">
        {#if filteredData.length === 0}
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

            <!-- Pagination controls remain the same -->
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