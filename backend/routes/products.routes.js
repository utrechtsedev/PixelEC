const express = require('express');
const router = express.Router();
const { getProducts, getProductById } = require('../controllers/products.controller');

//get all products
router.get('/', (req, res) => getProducts(req, res));

router.get('/:id', (req, res) => getProductById(req, res));

module.exports = router;