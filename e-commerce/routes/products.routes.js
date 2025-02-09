const express = require('express');
const router = express.Router();
const { Product } = require('../models');

// GET /products - Haal alle producten op
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /products/:id - Haal één product op (via ID)
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product niet gevonden' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /products - Maak een nieuw product aan
router.post('/', async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT /products/:id - Update een bestaand product
router.put('/:id', async (req, res) => {
  try {
    const [rowsUpdated] = await Product.update(req.body, {
      where: { product_id: req.params.id }
    });
    if (rowsUpdated === 0) {
      return res.status(404).json({ error: 'Product niet gevonden of geen veranderingen' });
    }
    const updatedProduct = await Product.findByPk(req.params.id);
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /products/:id - Verwijder een product
router.delete('/:id', async (req, res) => {
  try {
    const rowsDeleted = await Product.destroy({
      where: { product_id: req.params.id }
    });
    if (rowsDeleted === 0) {
      return res.status(404).json({ error: 'Product niet gevonden' });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
