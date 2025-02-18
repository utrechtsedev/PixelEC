const {sequelize, models} = require('../../models/index.js');
const { Op } = require('sequelize');

// design:
// name: String, SKU: String, base_price: Int, type: "physical" | "digital" | "service", brand_id: String | Null,
// category_id: String | Null, Attributes: [] | Null, Variants: [] | Null, images:: [] | Null
exports.createProduct = async (req, res) => {
    let {name, sku, base_price, visible, type, brand_id, category_id} = req.body
    
    if (!name || !sku || !base_price || type) {return res.status(403).json({error: "Unsufficient fields"})}
    if (!brand_id) {brand_id = null}
    if (!category_id) {category_id = null}

    try {
        const product = await models.Product.create({name: name, sku: sku, base_price: base_price, type: type, brand_id: brand_id, category_id: category_id})
        res.json(product)
    } catch (error) {
      res.status(500).json({error: error.message})
    } 
};
exports.editProduct = async (req, res) => {
    try {
      const [rowsUpdated] = await models.Product.update(req.body, {
        where: { product_id: req.body.id }
      });
      if (rowsUpdated === 0) {
        return res.status(404).json({ error: 'Product not found or nothing has changed' });
      }
      const updatedProduct = await models.Product.findOne({where: {product_id: req.body.id}});
      res.json(updatedProduct);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
}
exports.deleteProduct = async (req, res) => {
  try {
    const product = await models.Product.destroy({where: {product_id: req.body.id}})
    res.json({success: true})
  } catch (error) {
    return res.status(500).json({error: error.message})
  }
}
exports.createVariant = async (req, res) => {
  const {sku, price_override, inventory_quantity, size, weight, color, ProductProductId} = req.body;
  if (!sku) {return res.status(403).json({error: "Unsufficient fields"})}
  Object.keys(req.body).forEach(function(key, index) {
    if (req.body[key] == "" || req.body[key] == null || req.body[key] == undefined) {
      req.body[key] == null
    }
  });
  try {
    let variant = await models.ProductVariant.create({sku: sku, price_override: price_override, inventory_quantity: inventory_quantity, size: size, weight: weight, color: color, ProductProductId: ProductProductId})
    res.json(variant)
  } catch (error) {
    res.status(500).json({error: error.message})
  }
}
exports.editVariant = async (req, res) => {
  try {
    const [rowsUpdated] = await models.ProductVariant.update(req.body, {
      where: { variant_id: req.body.id }
    });
    if (rowsUpdated === 0) {
      return res.status(404).json({ error: 'Variant not found or nothing has changed' });
    }
    const updatedVariant = await models.ProductVariant.findOne({where: {variant_id: req.body.id}});
    res.json(updatedVariant);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
exports.deleteVariant = async (req, res) => {
  try {
    const variant = await models.ProductVariant.destroy({where: {variant_id: req.body.id}})
    res.json({success: true})
  } catch (error) {
    return res.status(500).json({error: error.message})
  }
}

