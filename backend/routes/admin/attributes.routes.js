const express = require('express');
const { createAttribute, editAttribute, deleteAttribute } = require('../../controllers/admin/productAttributes.controller');
const router = express.Router();

router.post('/', (req, res) => createAttribute(req, res));

router.put('/', (req, res) => editAttribute(req, res));

router.delete('/', (req, res) => deleteAttribute(req, res));

module.exports = router;