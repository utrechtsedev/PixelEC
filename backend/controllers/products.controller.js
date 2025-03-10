const { Op } = require('sequelize');
const { sequelize, models } = require('../models');

// TODO: implement visibility logic
// Fetch all products with 2 optional filters ?category=slug&brand=slug
exports.getProducts = async (req, res) => {
  try {
    const { category, brand } = req.query;
    const include = [
      {
        model: models.Category,
        as: 'Category',
        attributes: ['category_id', 'name', 'slug'],
        where: category ? {
          [Op.or]: [
            { category_id: category },
            { slug: category },
            { name: category }
          ]
        } : undefined,
        required: !!category
      },
      {
        model: models.Brand,
        attributes: ['brand_id', 'name', 'slug'],
        where: brand ? {
          [Op.or]: [
            { brand_id: brand },
            { slug: brand },
            { name: brand }
          ]
        } : undefined,
        required: !!brand
      },
      {
        model: models.ProductVariant,
        as: 'ProductVariants',
        attributes: ['variant_id', 'sku', 'price_override', 'inventory_quantity', 'size', 'weight', 'color'],
        required: false,
        include: [
          {
            model: models.ProductAttribute,
            as: 'ProductAttributes',
            attributes: ['attribute_id', 'key', 'value', 'attribute_type', 'is_filterable'],
            required: false
          },
          {
            model: models.ProductImage,
            as: 'VariantImages', // HIER AANGEPAST: 'ProductImages' → 'VariantImages'
            attributes: ['image_id', 'url', 'alt_text', 'is_primary', 'sort_order'],
            required: false
          }
        ]
      },
      {
        model: models.ProductImage,
        as: 'ProductImages',
        attributes: ['image_id', 'url', 'alt_text', 'is_primary', 'sort_order'],
      }
    ];
    
    const { count, rows: products } = await models.Product.findAndCountAll({
      include,
      distinct: true,
      order: [['created_at', 'DESC']]
    });
    
    res.json({
      products,
      meta: {
        total: count
      }
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: error.message });
  }
};

// Fetch one product
exports.getProductById = async (req, res) => {
  try {
    const product = await models.Product.findOne({
      where: { public_id: req.params.id },
      include: [ 
        {
          model: models.ProductVariant,
          as: 'ProductVariants',
          attributes: ['variant_id', 'sku', 'price_override', 'inventory_quantity', 'size', 'weight', 'color'],
          include: [
            {
              model: models.ProductAttribute,
              as: 'ProductAttributes',
              attributes: ['attribute_id', 'key', 'value', 'attribute_type', 'is_filterable'],
              required: false
            },
            {
              model: models.ProductImage,
              as: 'VariantImages',
              attributes: ['image_id', 'url', 'alt_text', 'is_primary', 'sort_order'],
            }
          ],
        },
        {
          model: models.ProductImage,
          as: 'ProductImages',
          attributes: ['image_id', 'url', 'alt_text', 'is_primary', 'sort_order'],
        }
      ]
    });
    
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// upload one or more product images
exports.uploadProductImages = async (req, res) => {

}

// Upload one or more product variant images
exports.uploadVariantImages = async (req, res) => {

}

exports.uploadProductImage = async (req, res) => {

}