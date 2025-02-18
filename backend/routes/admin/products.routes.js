const express = require('express');
const router = express.Router();
const {createProduct, createVariant, editVariant, deleteProduct, editProduct, deleteVariant} = require('../../controllers/admin/productsController');

// create product
router.post('/', (req, res) => createProduct(req, res));
// delete product
router.delete('/', (req, res) => deleteProduct(req, res));
// edit product
router.put('/', (req, res) => editProduct(req, res));
// create product variant
router.post('/variants', (req, res) => createVariant(req, res));
// delete product variant
router.put('/variants', (req, res) => editVariant(req, res));
// edit product variant
router.delete('/variants', (req, res) => deleteVariant(req, res));

module.exports = router;