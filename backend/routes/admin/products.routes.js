const express = require('express');
const router = express.Router();
const {createProduct, createVariant} = require('../../controllers/admin/productsController');
//get all products

router.post('/', (req, res) => createProduct(req, res));

router.post('/variant', (req, res) => createVariant(req, res));

module.exports = router;