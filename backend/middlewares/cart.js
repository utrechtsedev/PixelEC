// middleware/cart.js
const { models } = require('../models');

module.exports = async (req, res, next) => {
  try {
    let cart;
    
    // For authenticated users
    if (req.user) {
      [cart] = await models.Cart.findOrCreate({
        where: { user_id: req.user.id },
        include: [models.CartItem]
      });
      req.cart = cart;
    }
    // For guests
    else {
      // Initialize session if it doesn't exist
      if (!req.session.cart_id) {
        const newCart = await models.Cart.create({ session_id: req.session_id });
        req.session.cart_id = newCart.id;
        cart = newCart;
        await req.session.save();
      } else {
        cart = await models.Cart.findByPk(req.session.cart_id, {
          include: [models.CartItem]
        });
      }
      req.cart = cart;
    }
    
    next();
  } catch (error) {
    next(error);
  }
};