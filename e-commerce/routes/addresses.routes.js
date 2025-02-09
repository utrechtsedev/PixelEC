const express = require('express');
const router = express.Router();
const { Address } = require('../models');

// GET /addresses - Haal alle adressen op
router.get('/', async (req, res) => {
  try {
    const addresses = await Address.findAll();
    res.json(addresses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /addresses/:id - Haal één adres op (via ID)
router.get('/:id', async (req, res) => {
  try {
    const address = await Address.findByPk(req.params.id);
    if (!address) {
      return res.status(404).json({ error: 'Adres niet gevonden' });
    }
    res.json(address);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /addresses - Maak een nieuw adres aan
router.post('/', async (req, res) => {
  try {
    const newAddress = await Address.create(req.body);
    res.status(201).json(newAddress);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT /addresses/:id - Update een bestaand adres
router.put('/:id', async (req, res) => {
  try {
    const [rowsUpdated] = await Address.update(req.body, {
      where: { address_id: req.params.id }
    });
    if (rowsUpdated === 0) {
      return res.status(404).json({ error: 'Adres niet gevonden of geen veranderingen' });
    }
    const updatedAddress = await Address.findByPk(req.params.id);
    res.json(updatedAddress);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /addresses/:id - Verwijder een adres
router.delete('/:id', async (req, res) => {
  try {
    const rowsDeleted = await Address.destroy({
      where: { address_id: req.params.id }
    });
    if (rowsDeleted === 0) {
      return res.status(404).json({ error: 'Adres niet gevonden' });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;