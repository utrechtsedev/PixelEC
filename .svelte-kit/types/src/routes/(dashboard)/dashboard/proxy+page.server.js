// @ts-nocheck
/** @param {Parameters<import('./$types').PageServerLoad>[0]} event */

export async function load({ fetch }) {
    const res = await fetch('http://localhost:5000/orders/dashboard/table?status=pending', {
        method: 'GET'
    });

    const data = await res.json();
    console.log(data);





    // return json(orders.map(order => ({
    //     id: order.order_id,
    //     date: order.created_at,
    //     customer: `${order.user.first_name} ${order.user.last_name}`,
    //     total: order.total_amount,
    //     payment_status: order.status,
    //     fulfillment_status: order.fulfillment_status,
    //     items: order.items.reduce((sum, item) => sum + item.quantity, 0)
    //   })));
    return {
        props: {
            data: data
        }
        
    };
}