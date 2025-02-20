const express = require('express');
const { getBrands, getBrandById } = require('../controllers/brands.controller');
const router = express.Router();


// fetch all categories
router.get('/', (req, res) => getBrands(req, res));

// fetch one category
router.get('/:id', (req, res) => getBrandById(req, res));



module.exports = router;