const { Op } = require('sequelize');
const { sequelize, models } = require('../models');

// Fetch all categories
exports.getCategories = async (req, res) => {
    try {
        const categories = await models.Category.findAll();
        return res.json(categories);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// Fetch one category
exports.getCategoryById = async (req, res) => {
  try {
    const categories = await models.Category.findOne({where: {public_id: req.params.id}});
    if (categories) {
      res.json(categories);
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
