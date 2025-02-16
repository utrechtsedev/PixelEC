const {sequelize, models} = require('../../models/index.js');
const { Op } = require('sequelize');

// design:
// name: String, SKU: String, base_price: Int, brand_id: String | Null, 
// category_id: String | Null, Attributes: [] | Null, Variants: [] | Null, images:: [] | Null
exports.createProduct = async (req, res) => {
    const {name, sku, base_price, brand_id, category_id, attributes, variants, images} = req.body
    





  };