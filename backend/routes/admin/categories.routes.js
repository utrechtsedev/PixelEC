const { createCategory, deleteCategory, editCategory, createCategoryImage, deleteCategoryImage, editCategoryImage } = require('../../controllers/admin/categories.controller.js');
const express = require('express');
const router = express.Router();
const upload = require('../../middlewares/multer');

// create category
router.post('/', (req, res) => createCategory(req, res));
// delete category
router.delete('/', (req, res) => deleteCategory(req, res));
// edit category
router.put('/', (req, res) => editCategory(req, res));
// add image to product
router.post('/images', upload.single('image'), createCategoryImage);
// delete product image
router.delete('/images', (req, res) => deleteCategoryImage(req, res));
// edit product image
router.put('/images', (req, res) => editCategoryImage(req, res))

module.exports = router;