// controllers/admin/products.controller.js
const {sequelize, models} = require('../../models/index.js');
const { Op } = require('sequelize');

// design:
// name: String, SKU: String, base_price: Int, type: "physical" | "digital" | "service", brand_id: String | Null,
// category_id: String | Null, Attributes: [] | Null, Variants: [] | Null, images:: [] | Null
exports.createProduct = async (req, res) => {
    let {name, sku, base_price, visible, type, brand_id, category_id} = req.body
    
    if (!name || !sku || !base_price || !type) {return res.status(403).json({error: "Unsufficient fields"})}
    if (!brand_id) {brand_id = null}
    if (!category_id) {category_id = null}

    try {
        const product = await models.Product.create({name: name, sku: sku, base_price: base_price, type: type, brand_id: brand_id, category_id: category_id})
        res.json(product)
    } catch (error) {
      res.status(500).json({message: error.message})
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
    console.log(req.body)
    const product = await models.Product.destroy({where: {product_id: req.body.id}})
    res.json({success: true})
  } catch (error) {
    return res.status(500).json({error: req.body.id})
  }
}
exports.createVariant = async (req, res) => {
  const {sku, price_override, inventory_quantity, size, weight, color, product_id} = req.body;
  if (!sku) {return res.status(403).json({error: "Unsufficient fields"})}
  Object.keys(req.body).forEach(function(key, index) {
    if (req.body[key] == "" || req.body[key] == null || req.body[key] == undefined) {
      req.body[key] == null
    }
  });
  try {
    let variant = await models.ProductVariant.create({sku: sku, price_override: price_override, inventory_quantity: inventory_quantity, size: size, weight: weight, color: color, product_id: product_id})
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
exports.createProductImage = async (req, res) => {
  try {
    // Get form data from request body
    const { product_id, variant_id, alt_text, is_primary, sort_order } = req.body;
    
    // Check if at least one of product_id or variant_id is provided
    if (!product_id && !variant_id) {
      return res.status(400).json({ message: "Either product_id or variant_id must be provided" });
    }
    if (is_primary) {
      const whereCondition = product_id
        ? { product_id: product_id, is_primary: true }
        : { variant_id: variant_id, is_primary: true };
      
      const existingPrimaryImage = await models.ProductImage.findOne({ where: whereCondition });
      
      if (existingPrimaryImage) {
        // Update de bestaande hoofdafbeelding om niet meer primair te zijn
        await existingPrimaryImage.update({ is_primary: false });
        
        // Je kunt de statuscode verwijderen als je het gewoon wilt toestaan om een nieuwe primaire afbeelding in te stellen
        // return res.status(400).json({ message: "You already have a main image." });
      }
    }
    // Check if image was uploaded
    if (!req.file) {
      return res.status(400).json({ message: "Please upload an image file" });
    }
    
    // Create file URL (relative to your server or absolute depending on your setup)
    const fileUrl = `/uploads/${req.file.filename}`;
    
    // Create image record
    const imageData = {
      product_id: product_id || null,
      variant_id: variant_id || null,
      url: fileUrl,
      alt_text: alt_text || req.file.originalname,
      is_primary: is_primary === 'true' || is_primary === true ? true : false,
      sort_order: sort_order ? parseInt(sort_order) : 0
    };
    
    const image = await models.ProductImage.create(imageData);
    
    // Return success response
    return res.status(201).json({
      message: "Image uploaded successfully",
      image: image
    });
    
  } catch (error) {
    console.error('Error uploading image:', error);
    
    // If there was an error and a file was uploaded, clean it up
    if (req.file && req.file.path) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error('Error deleting file after failed upload:', err);
      });
    }
    
    return res.status(500).json({ message: error.message });
  }
};
// unused function 
exports.createMultipleProductImages = async (req, res) => {
  try {
    // Check if files were uploaded
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "Please upload at least one image file" });
    }
    
    const { product_id, variant_id } = req.body;
    
    // Check if at least one of product_id or variant_id is provided
    if (!product_id && !variant_id) {
      return res.status(400).json({ message: "Either product_id or variant_id must be provided" });
    }
    
    // Process each uploaded file
    const imagePromises = req.files.map((file, index) => {
      const fileUrl = `/uploads/${file.filename}`;
      
      return models.ProductImage.create({
        product_id: product_id || null,
        variant_id: variant_id || null,
        url: fileUrl,
        alt_text: req.body.alt_text || file.originalname,
        is_primary: index === 0 && (req.body.is_primary === 'true' || req.body.is_primary === true),
        sort_order: index
      });
    });
    
    const images = await Promise.all(imagePromises);
    
    return res.status(201).json({
      message: `${images.length} images uploaded successfully`,
      images: images
    });
    
  } catch (error) {
    console.error('Error uploading images:', error);
    
    // Clean up any uploaded files
    if (req.files && req.files.length > 0) {
      req.files.forEach(file => {
        fs.unlink(file.path, (err) => {
          if (err) console.error('Error deleting file after failed upload:', err);
        });
      });
    }
    
    return res.status(500).json({ message: error.message });
  }
};
exports.deleteProductImage = async (req, res) => {
  try {
    const image = await models.ProductImage.destroy({where: {image_id: req.body.id}})
    res.json({succes:true})
    // TODO: image deletion from server (current or S3)
  } catch (error) {
    return res.status(500).json({error: error.message})
  }
}
exports.editProductImage = async (req, res) => {
  try {
    const { id, alt_text, is_primary, sort_order } = req.body;
    
    if (!id) {
      return res.status(400).json({ message: "Image ID is required" });
    }
    
    // Find the image
    const image = await models.ProductImage.findOne({ where: { image_id: id }});
    
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }
    
    // Check if setting as primary - need to ensure only one primary image
    if (is_primary === true && !image.is_primary) {
      // Determine which field (product_id or variant_id) to use in the search
      const whereCondition = image.product_id 
        ? { product_id: image.product_id, is_primary: true }
        : { variant_id: image.variant_id, is_primary: true };
      
      // Check if there's already a primary image
      const existingPrimary = await models.ProductImage.findOne({ where: whereCondition });
      
      // If there's an existing primary image, update it to not be primary
      if (existingPrimary) {
        await existingPrimary.update({ is_primary: false });
      }
    }
    
    // Create the update object with only the fields that were provided
    const updateData = {};
    if (alt_text !== undefined) updateData.alt_text = alt_text;
    if (is_primary !== undefined) updateData.is_primary = is_primary;
    if (sort_order !== undefined) updateData.sort_order = sort_order;
    
    // Update the image
    await image.update(updateData);
    
    // Fetch the updated image
    const updatedImage = await models.ProductImage.findOne({ where: { image_id: id }});
    
    // Return success response
    return res.status(200).json({
      message: "Image updated successfully",
      image: updatedImage
    });
    
  } catch (error) {
    console.error('Error updating image:', error);
    return res.status(500).json({ message: error.message });
  }
};