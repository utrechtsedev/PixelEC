const express = require('express');
const { getCategoryById, getCategories } = require('../controllers/categories.controller');
const router = express.Router();


// fetch all categories
router.get('/', (req, res) => getCategories(req, res));

// fetch one category
router.get('/:id', (req, res) => getCategoryById(req, res));



module.exports = router;