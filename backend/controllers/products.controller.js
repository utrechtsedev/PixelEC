const Product = require('../models/product.model');
const Category = require('../models/category.model');
const ProductImage = require('../models/productImage.model');
const ProductVariant = require('../models/productVariant.model');
const Brand = require('../models/brand.model');
const { Op } = require('sequelize');

// Fetch all products
exports.getProducts = async (req, res) => {
  try {
      const { 
          category, 
          brand, 
          inStock, 
          minPrice, 
          maxPrice, 
          ...variantFilters 
      } = req.query;
      
      const where = {};
      const include = [
          {
              model: Category,
              through: { attributes: [] },
              attributes: ['category_id', 'name', 'slug'],
              where: category ? { slug: category } : {}
          },
          {
              model: Brand,
              attributes: ['brand_id', 'name', 'slug'],
              where: brand ? { [Op.or]: [
                  { brand_id: brand },
                  { slug: brand }
              ]} : {}
          },
          {
              model: ProductVariant,
              attributes: ['variant_id', 'sku', 'price_override', 'inventory_quantity', 'attributes'],
              where: {}
          },
          {
              model: ProductImage,
              attributes: ['image_id', 'url', 'alt_text', 'is_primary'],
              where: { is_primary: true }
          }
      ];

      // Inventory filter
      if (typeof inStock !== 'undefined') {
          include[2].where.inventory_quantity = {
              [inStock === 'true' ? Op.gt : Op.lte]: 0
          };
      }

      // Variant attribute filters
      Object.entries(variantFilters).forEach(([key, value]) => {
          include[2].where[`attributes.${key}`] = value;
      });

      // Price filter
      if (minPrice || maxPrice) {
          const priceConditions = [];
          const replacements = {};

          // Bereken effectieve prijs met COALESCE
          const effectivePrice = sequelize.literal(
              'COALESCE("ProductVariant"."price_override", "Product"."base_price")'
          );

          if (minPrice) {
              priceConditions.push(
                  sequelize.where(effectivePrice, Op.gte, parseFloat(minPrice))
              );
          }
          if (maxPrice) {
              priceConditions.push(
                  sequelize.where(effectivePrice, Op.lte, parseFloat(maxPrice))
              );
          }

          // Combineer met bestaande variant filters
          include[2].where = {
              [Op.and]: [
                  include[2].where,
                  ...priceConditions
              ]
          };
          
          include[2].required = true;
      }

      // Paginering en sortering
      const page = parseInt(req.query.page) || 1;
      const pageSize = parseInt(req.query.pageSize) || 24;
      const offset = (page - 1) * pageSize;

      const { count, rows: products } = await Product.findAndCountAll({
          where,
          include,
          distinct: true,
          offset,
          limit: pageSize,
          order: [[req.query.sort || 'created_at', req.query.order || 'DESC']]
      });

      res.json({
          products,
          meta: {
              total: count,
              page,
              pageSize,
              totalPages: Math.ceil(count / pageSize)
          }
      });
  } catch (error) {
      res.status(500).json({ 
          message: 'Filtering error',
          error: error.message 
      });
  }
};

// Fetch one product
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({where: {public_id: req.params.id}});
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Fetch products by category !! EDIT: Instead of this i went with a Category controller. That is more logical. 
// If someone on a webshop is looking at ALL PRODUCTS and decides to filter on ANYTHING like CATEGORY, then the getProducts() will fire.
// exports.getProductsByCategory = async (req, res) => {
//   try {
//     const products = await Product.findAll({
//       include: [
//         {
//           model: Category,
//           where: { public_id: req.params.id },
//           through: { attributes: [] }, // hide join table attributes
//           required: true
//         },
//         includeImages && {
//           model: ProductImage,
//           where: { is_primary: true },
//           required: false
//         },
//         includeVariants && {
//           model: ProductVariant,
//           attributes: ['variant_id', 'sku', 'price_override', 'inventory_quantity']
//         }
//       ]
//     });
//     if (products) {
//       res.json(products);
//     } else {
//       res.status(404).json({ message: 'No products in this category' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// }