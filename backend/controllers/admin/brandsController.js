const { Op } = require('sequelize');
const { sequelize, models } = require('../../models');

exports.createBrand = async (req, res) => {
    let {name, slug} = req.body
    
    if (!name || !slug) {return res.status(403).json({error: "Unsufficient fields"})}

    try {
        const brand = await models.Brand.create(req.body)
        res.json(brand)
    } catch (error) {
      res.status(500).json({error: error.message})
    } 
};

exports.editBrand = async (req, res) => {
    try {
      const [rowsUpdated] = await models.Brand.update(req.body, {
        where: { brand_id: req.body.id }
      });
      if (rowsUpdated === 0) {
        return res.status(404).json({ error: 'Brand not found or nothing has changed' });
      }
      const updatedBrand = await models.Brand.findOne({where: {brand_id: req.body.id}});
      res.json(updatedBrand);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
  
  exports.deleteBrand = async (req, res) => {
    try {
      const product = await models.Brand.destroy({where: {brand_id: req.body.id}})
      res.json({success: true})
    } catch (error) {
      return res.status(500).json({error: error.message})
    }
  }
  