const express = require('express');
const router = express.Router();
const { getProducts } = require('../controllers/products.controller');
//get all products

router.get('/', (req, res) => getProducts(req, res));


module.exports = router;