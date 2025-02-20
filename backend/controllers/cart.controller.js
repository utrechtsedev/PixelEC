// routes/cart.js
const { models } = require('../models');


// Get current cart GET /items
exports.getCart = async (req, res) => {
  try {
    const cart = await req.cart.reload({
      include: [{
        model: models.CartItem,
        include: [models.Product, models.ProductVariant]
      }]
    });
    
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add item to cart  POST /items
exports.addItemsToCart = async (req, res) => {
  try {
    const { product_id, variant_id, quantity = 1 } = req.body;
    
    // Validate product exists
    const product = await models.Product.findByPk(product_id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    
    // Validate variant exists if provided
    if (variant_id) {
      const variant = await models.ProductVariant.findByPk(variant_id);
      if (!variant) return res.status(404).json({ error: 'Variant not found' });
    }
    
    // Use variant price if available, otherwise product base price
    const price = variant_id 
      ? (await models.ProductVariant.findByPk(variant_id)).price_override || product.base_price
      : product.base_price;

    // Add or update item in cart
    const [item] = await models.CartItem.upsert({
      cart_id: req.cart.id,
      product_id,
      variant_id,
      quantity,
      price
    }, {
      returning: true,
      conflictFields: ['cart_id', 'product_id', 'variant_id']
    });

    res.json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update item quantity router.put('/cart/:item_id', 
exports.updateItemQuantity = async (req, res) => {
  try {
    const { quantity } = req.body;
    const item = await models.CartItem.findByPk(req.params.id);
    
    if (!item) return res.status(404).json({ error: 'Item not found' });
    if (item.cart_id !== req.cart.id) return res.status(403).json({ error: 'Unauthorized' });
    
    item.quantity = quantity;
    await item.save();
    
    res.json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Remove item from cart router.delete('/cart/:item_id'
exports.deleteItemFromCart =  async (req, res) => {
  try {
    const item = await models.CartItem.findByPk(req.params.id);
    
    if (!item) return res.status(404).json({ error: 'Item not found' });
    if (item.cart_id !== req.cart.id) return res.status(403).json({ error: 'Unauthorized' });
    
    await item.destroy();
    res.json({ message: 'Item removed from cart' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

