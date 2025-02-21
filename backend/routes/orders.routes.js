const express = require('express');
const { getOrders, getOrder } = require('../controllers/orders.controller');
const router = express.Router();

// get all orders associated to logged in user
router.get('/', (req, res) => getOrders(req, res))

// get one order associated to logged in user
router.get('/:id', (req, res) => getOrder(req, res))

module.exports = router;