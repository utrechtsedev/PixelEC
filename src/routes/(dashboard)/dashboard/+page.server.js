export const load = async ({ fetch }) => {
    try {
        const res = await fetch('http://localhost:5000/orders/dashboard/table');
        
        if (!res.ok) throw new Error('Kon orders niet ophalen');
        
        const apiData = await res.json();

        const formattedData = apiData.map(item => ({
            order_id: item.id,
            created_at: item.order_date,  // Bewaar de ISO datum
            customer: item.customer,
            total_amount: item.total_spent,
            payment_status: item.status === 'pending' ? 'Pending' : 'Paid',
            fulfillment_status: item.status,
            items: item.total_items
        }));

        return {
                orders: formattedData  // Gebruik duidelijke property naam
        };
        
    } catch (err) {
        return {
            status: 500,
            error: err.message
        };
    }
}