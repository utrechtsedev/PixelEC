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
    const product = await models.Category.destroy({where: {category_id: req.body.id}})
    res.json({success: true})
  } catch (error) {
    return res.status(500).json({error: error.message})
  }
}

