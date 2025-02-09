const express = require('express');
const { Order, User, OrderItem, Product } = require('../models'); // Alle modellen importeren
const { Sequelize } = require('sequelize');
const router = express.Router();

// Helper functie buiten de route
const getFulfillmentStatus = (status) => {
  const statusMap = {
    'pending': 'Unfulfilled',
    'paid': 'Processing',
    'shipped': 'Shipped',
    'delivered': 'Delivered',
    'cancelled': 'Cancelled'
  };
  return statusMap[status] || 'Unknown';
};

router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.findAll({
      attributes: [
        'order_id',
        'created_at',
        'total_amount',
        'status',
        [Sequelize.literal('(SELECT SUM(quantity) FROM order_items WHERE order_items.order_id = `Order`.`order_id`)'), 'items_count']
      ],
      include: [
        {
          model: User,
          attributes: [
            [Sequelize.literal('CONCAT(first_name, " ", last_name)'), 'customer']
          ]
        },
        {
          model: OrderItem,
          attributes: [],
          include: [{
            model: Product,
            attributes: []
          }]
        }
      ],
      order: [['created_at', 'DESC']],
      raw: true,
      nest: true
    });

    const formattedOrders = orders.map(order => ({
      id: order.order_id,
      date: order.created_at,
      customer: order.User.customer,
      total: order.total_amount,
      payment_status: order.status === 'pending' ? 'Pending' : 'Paid',
      fulfillment_status: getFulfillmentStatus(order.status), // 'this.' verwijderd
      items: order.items_count || 0
    }));

    res.json(formattedOrders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;