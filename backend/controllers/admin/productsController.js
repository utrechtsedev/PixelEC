const {sequelize, models} = require('../../models/index.js');
const { Op } = require('sequelize');

// design:
// name: String, SKU: String, base_price: Int, type: "physical" | "digital" | "service", brand_id: String | Null,
// category_id: String | Null, Attributes: [] | Null, Variants: [] | Null, images:: [] | Null
exports.createProduct = async (req, res) => {
    let {name, sku, base_price, type, brand_id, category_id} = req.body
    
    if (!name || !sku || !base_price || type) {return res.status(403).send({error: "Unsufficient fields"})}
    if (!brand_id) {brand_id = null}
    if (!category_id) {category_id = null}

    try {
        let product = await models.Product.create({name: name, sku: sku, base_price: base_price, type: type, brand_id: brand_id, category_id: category_id})
        res.send(product)
    } catch (error) {
      res.status(500).send({error: error.text})
    } 
  };

  exports.deleteProduct = async (req, res) => {
    
  }

  exports.createVariant = async (req, res) => {
    let {sku, price_override, inventory_quantity, size, weight, color, ProductProductId} = req.body;
    if (!sku) {return res.status(403).send({error: "Unsufficient fields"})}

    Object.keys(req.body).forEach(function(key, index) {
      if (req.body[key] == "" || req.body[key] == null || req.body[key] == undefined) {
        req.body[key] == null
      }
    });

    try {
      let variant = await models.ProductVariant.create({sku: sku, price_override: price_override, inventory_quantity: inventory_quantity, size: size, weight: weight, color: color, ProductProductId: ProductProductId})
      res.send(variant)
    } catch (error) {
      res.status(500).send({error: error.text})
    }
  }