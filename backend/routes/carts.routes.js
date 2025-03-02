const express = require('express');
const { getCart, updateItemQuantity, deleteItemFromCart, addItemsToCart } = require('../controllers/carts.controller');
const cartMiddleware = require('../middlewares/cart')

const router = express.Router();


router.use(cartMiddleware);

// Get current cart
router.get('/', (req, res) => getCart(req, res));
// Add item to cart
router.post('/', (req, res) => addItemsToCart(req, res));
// Update item quantity
router.put('/:id', (req, res) => updateItemQuantity(req, res));
// Remove item from cart
router.delete('/:id', (req, res) => deleteItemFromCart(req, res));

module.exports = router;