const { models } = require('../models');

// Fetch all categories
exports.getBrands = async (req, res) => {
    try {
        const brands = await models.Brand.findAll();
        return res.json(brands);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// Fetch one category
exports.getBrandById = async (req, res) => {
  try {
    const brands = await models.Brand.findOne({where: {public_id: req.params.id}});
    if (brands) {
      res.json(brands);
    } else {
      res.status(404).json({ message: 'Brand not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
