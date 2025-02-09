const express = require('express');
const router = express.Router();
const { OrderItem } = require('../models');

// GET /order-items - Haal alle orderregels op
router.get('/', async (req, res) => {
  try {
    const items = await OrderItem.findAll();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /order-items/:id - Haal één orderregel op (via ID)
router.get('/:id', async (req, res) => {
  try {
    const item = await OrderItem.findByPk(req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Orderregel niet gevonden' });
    }
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /order-items - Maak een nieuwe orderregel aan
router.post('/', async (req, res) => {
  try {
    const newItem = await OrderItem.create(req.body);
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT /order-items/:id - Update een bestaande orderregel
router.put('/:id', async (req, res) => {
  try {
    const [rowsUpdated] = await OrderItem.update(req.body, {
      where: { order_item_id: req.params.id }
    });
    if (rowsUpdated === 0) {
      return res.status(404).json({ error: 'Orderregel niet gevonden of geen veranderingen' });
    }
    const updatedItem = await OrderItem.findByPk(req.params.id);
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /order-items/:id - Verwijder een orderregel
router.delete('/:id', async (req, res) => {
  try {
    const rowsDeleted = await OrderItem.destroy({
      where: { order_item_id: req.params.id }
    });
    if (rowsDeleted === 0) {
      return res.status(404).json({ error: 'Orderregel niet gevonden' });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
