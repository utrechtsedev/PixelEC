const express = require('express');
const router = express.Router();
const { Category, CategoryImage } = require('../models');
const upload = require('../middlewares/multer');
const fs = require('fs');
const path = require('path');


// GET /categories - Haal alle categorieën op
router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /categories/:id - Haal één categorie op (via ID)
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findOne({where: {category_id: req.params.id}});
    if (!category) {
      return res.status(404).json({ error: 'Categorie niet gevonden' });
    }
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /categories - Maak een nieuwe categorie aan
router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /categories/:id - Verwijder een categorie
router.delete('/:id', async (req, res) => {
  try {
    const rowsDeleted = await Category.destroy({
      where: { category_id: req.params.id }
    });
    if (rowsDeleted === 0) {
      return res.status(404).json({ error: 'Categorie niet gevonden' });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    const Children = Category.findAll({where: {parent_id: req.params.id}})
    if (!Children) {return}
    await Category.destroy({where: {parent_id: req.params.id}})
  }
});

router.put('/:id', async (req, res) => {
  try {
    console.log(req.body);
    const { name, description, parent_id } = req.body;
    
    const update = await Category.update({name:name,description:description,parent_id: parent_id === 'null' ? null : parent_id}, {where: { category_id: req.params.id }
    });

    const updatedCategory = await Category.findOne({where: {category_id: req.params.id}});
    res.json(updatedCategory);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Upload afbeeldingen
router.post('/images/:id', upload.array('images'), async (req, res) => {
  try {
    const images = req.files.map(file => ({
      category_id: req.params.id,
      image_url: `/uploads/${file.filename}`
    }));

    await CategoryImage.bulkCreate(images);
    res.json({ message: 'Afbeeldingen geüpload', images });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// TODO: remove this and refactor GET /categories/:id to include this. and refactor dashboard get requests
router.get('/images/:id', async (req, res) => {
  try {
    const categoryImages = await CategoryImage.findAll({where: {category_id: req.params.id}});
    if (!categoryImages) {
      return res.status(404).json({ error: 'Geen categorie gevonden' });
    }
    res.json(categoryImages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/images/:id', async (req, res) => {
  try {
      const image = await CategoryImage.findOne({where: {id: req.params.id}});
      if (!image) return res.status(404).send('Image not found');
      console.log(image.image_url.split('/uploads/')[1])
      // Delete file from filesystem
      
      fs.unlinkSync(path.join(__dirname, '../uploads', image.image_url.split('/uploads/')[1]));
      
      // Delete database record
      await image.destroy();
      
      res.status(204).end();
  } catch (error) {
      console.error('Delete error:', error);
      res.status(500).send('Server error');
  }
});


module.exports = router;
