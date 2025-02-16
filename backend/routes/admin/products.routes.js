const express = require('express');
const router = express.Router();
const {createProduct} = require('../../controllers/admin/productsController');
//get all products

router.post('/', (req, res) => createProduct(req, res));


module.exports = router;