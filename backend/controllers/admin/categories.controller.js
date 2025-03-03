const {sequelize, models} = require('../../models/index.js');
const { Op } = require('sequelize');

exports.createCategory = async (req, res) => {
    let {name, slug} = req.body
    
    if (!name || !slug) {return res.status(403).json({error: "Unsufficient fields"})}

    try {
        const category = await models.Category.create(req.body)
        res.json(category)
    } catch (error) {
      res.status(500).json({error: error.message})
    } 
}

exports.editCategory = async (req, res) => {
  try {
    const [rowsUpdated] = await models.Category.update(req.body, {
      where: { category_id: req.body.id }
    });
    if (rowsUpdated === 0) {
      return res.status(404).json({ error: 'Category not found or nothing has changed' });
    }
    const updatedCategory = await models.Category.findOne({where: {category_id: req.body.id}});
    res.json(updatedCategory);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

exports.deleteCategory = async (req, res) => {
  try {
    const category = await models.Category.destroy({where: {category_id: req.body.id}})
    res.json({success: true})
  } catch (error) {
    return res.status(500).json({error: error.message})
  }
}








exports.createCategoryImage = async (req, res) => {
  try {
    // Get form data from request body
    const { category_id, alt_text, is_primary, sort_order } = req.body;
    
    // Check if at least one of product_id or variant_id is provided
    if (!category_id) {
      return res.status(400).json({ message: "Category ID must be provided" });
    }
    // Check if image was uploaded
    if (!req.file) {
      return res.status(400).json({ message: "Please upload an image file" });
    }
    
    // Create file URL (relative to your server or absolute depending on your setup)
    const fileUrl = `/uploads/${req.file.filename}`;
    
    // Create image record
    const imageData = {
      category_id: category_id,
      url: fileUrl,
      alt_text: alt_text || req.file.originalname,
      is_primary: is_primary === 'true' || is_primary === true ? true : false,
      sort_order: sort_order ? parseInt(sort_order) : 0
    };
    
    const image = await models.CategoryImage.create(imageData);
    
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

exports.deleteCategoryImage = async (req, res) => {
  try {
    const image = await models.CategoryImage.destroy({where: {image_id: req.body.id}})
    res.json({succes:true})
    // TODO: image deletion from server (current or S3)
  } catch (error) {
    return res.status(500).json({error: error.message})
  }
}
exports.editCategoryImage = async (req, res) => {
  try {
    const { image_id, alt_text, is_primary, sort_order } = req.body;
    
    if (!id) {
      return res.status(400).json({ message: "Image ID is required" });
    }
    
    // Find the image
    const image = await models.CategoryImage.findOne({ where: { image_id: image_id }});
    
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }
    
    // Check if setting as primary - need to ensure only one primary image
    if (is_primary === true && !image.is_primary) {
      const whereCondition = { variant_id: image.variant_id, is_primary: true };
      
      // Check if there's already a primary image
      const existingPrimary = await models.CategoryImage.findOne({ where: whereCondition });
      
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
    const updatedImage = await models.CategoryImage.findOne({ where: { image_id: image_id }});
    
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

