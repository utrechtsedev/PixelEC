const express = require('express');
const router = express.Router();
const { OrderAddress } = require('../models');

// GET /order-addresses - Haal alle order-adressen op
router.get('/', async (req, res) => {
  try {
    const addresses = await OrderAddress.findAll();
    res.json(addresses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /order-addresses/:id - Haal één order-adres op (via ID)
router.get('/:id', async (req, res) => {
  try {
    const address = await OrderAddress.findByPk(req.params.id);
    if (!address) {
      return res.status(404).json({ error: 'Order-adres niet gevonden' });
    }
    res.json(address);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /order-addresses - Maak een nieuw order-adres aan
router.post('/', async (req, res) => {
  try {
    const newOrderAddress = await OrderAddress.create(req.body);
    res.status(201).json(newOrderAddress);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT /order-addresses/:id - Update een bestaand order-adres
router.put('/:id', async (req, res) => {
  try {
    const [rowsUpdated] = await OrderAddress.update(req.body, {
      where: { order_address_id: req.params.id }
    });
    if (rowsUpdated === 0) {
      return res.status(404).json({ error: 'Order-adres niet gevonden of geen veranderingen' });
    }
    const updatedOrderAddress = await OrderAddress.findByPk(req.params.id);
    res.json(updatedOrderAddress);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /order-addresses/:id - Verwijder een order-adres
router.delete('/:id', async (req, res) => {
  try {
    const rowsDeleted = await OrderAddress.destroy({
      where: { order_address_id: req.params.id }
    });
    if (rowsDeleted === 0) {
      return res.status(404).json({ error: 'Order-adres niet gevonden' });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
