const express = require('express');
const { createBrand, deleteBrand, editBrand } = require('../../controllers/admin/brands.controller');
const router = express.Router();

// create brand
router.post('/', (req, res) => createBrand(req, res));
// delete brand
router.delete('/', (req, res) => deleteBrand(req, res));
// edit brand
router.put('/', (req, res) => editBrand(req, res));

module.exports = router;