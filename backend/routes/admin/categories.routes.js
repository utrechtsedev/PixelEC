const { createCategory, deleteCategory, editCategory } = require('../../controllers/admin/categoriesController.js');
const express = require('express');
const router = express.Router();

// create category
router.post('/', (req, res) => createCategory(req, res));
// delete category
router.delete('/', (req, res) => deleteCategory(req, res));
// edit category
router.put('/', (req, res) => editCategory(req, res));

module.exports = router;