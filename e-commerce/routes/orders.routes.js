const express = require('express');
const router = express.Router();
const { Order, User, OrderItem, Product } = require('../models'); // Alle modellen importeren
const { Op, Sequelize } = require('sequelize'); 


// GET /orders?status=pending
router.get('/', async (req, res) => {
  try {
    const whereClause = {};
    
    if (req.query.status) {
      const statuses = req.query.status.split(','); 
      whereClause.status = { [Op.in]: statuses };
    }

    const orders = await Order.findAll({
      where: whereClause,
      include: [{
        model: User,
        attributes: ['first_name', 'last_name']
      }],
      raw: false,
      nest: true
    });

    const groupedData = orders.reduce((acc, order) => {
      const orderPlain = order.get({ plain: true });
      const userId = orderPlain.user_id;

      if (!acc[userId]) {
        acc[userId] = {
          user_id: userId,
          user_name: `${orderPlain.User.first_name} ${orderPlain.User.last_name}`,
          order_amount: 0,
          total_amount: 0, // Totaalbedrag voor gebruiker
          orders: []
        };
      }

      // 🚨 Gebruik het JUISTE veld: total_amount ipv total_price
      const orderTotal = parseFloat(orderPlain.total_amount) || 0;
      acc[userId].total_amount += orderTotal;

      acc[userId].order_amount++;
      delete orderPlain.User;
      acc[userId].orders.push(orderPlain);

      return acc;
    }, {});

    res.json(Object.values(groupedData));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /orders/:id - Haal één order op (via ID)
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Order niet gevonden' });
    }
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /orders - Maak een nieuwe order aan
router.post('/', async (req, res) => {
  try {
    const newOrder = await Order.create(req.body);
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT /orders/:id - Update een bestaande order
router.put('/:id', async (req, res) => {
  try {
    const [rowsUpdated] = await Order.update(req.body, {
      where: { order_id: req.params.id }
    });
    if (rowsUpdated === 0) {
      return res.status(404).json({ error: 'Order niet gevonden of geen veranderingen' });
    }
    const updatedOrder = await Order.findByPk(req.params.id);
    res.json(updatedOrder);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /orders/:id - Verwijder een order
router.delete('/:id', async (req, res) => {
  try {
    const rowsDeleted = await Order.destroy({
      where: { order_id: req.params.id }
    });
    if (rowsDeleted === 0) {
      return res.status(404).json({ error: 'Order niet gevonden' });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// dashboard routes
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

router.get('/dashboard/table', async (req, res) => {
  try {
    const statusFilter = req.query.status 
      ? { status: { [Op.in]: req.query.status.split(',') } } 
      : {};


      const usersWithOrders = await User.findAll({
        attributes: [
          'user_id',
          [Sequelize.literal('CONCAT(first_name, " ", last_name)'), 'customer'],
          [Sequelize.fn('COUNT', Sequelize.col('Orders.order_id')), 'order_count'],
          [Sequelize.fn('SUM', Sequelize.col('Orders.total_amount')), 'total_amount'],
          [Sequelize.literal(`
            (SELECT SUM(quantity) 
             FROM order_items 
             INNER JOIN orders ON order_items.order_id = orders.order_id 
             WHERE orders.user_id = User.user_id
             ${req.query.status ? `AND orders.status IN (:statuses)` : ''})
          `), 'total_items'],
          [Sequelize.literal(`
            (SELECT status 
             FROM orders 
             WHERE user_id = User.user_id
             ${req.query.status ? `AND status IN (:statuses)` : ''}
             ORDER BY created_at DESC 
             LIMIT 1)
          `), 'status'],
          [Sequelize.literal(`
            (SELECT created_at 
             FROM orders 
             WHERE user_id = User.user_id
             ${req.query.status ? `AND status IN (:statuses)` : ''}
             ORDER BY created_at DESC 
             LIMIT 1)
          `), 'order_date']
        ],
        include: [{
          model: Order,
          attributes: [],
          where: statusFilter
        }],
        group: ['User.user_id'],
        replacements: {
          statuses: req.query.status?.split(',') || []
        },
        raw: true,
        nest: true
      });

    const formattedData = usersWithOrders.map(user => ({
      id: user.user_id,
      customer: user.customer,
      total_orders: user.order_count,
      total_spent: user.total_amount || 0,
      total_items: user.total_items || 0,
      status: getFulfillmentStatus(user.status),
      order_date: user.order_date
    }));

    res.json(formattedData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;
