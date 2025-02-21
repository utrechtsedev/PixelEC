const express = require('express');
const router = express.Router();
const {createRefund} = require('../controllers/refunds.controller')
// create refund (logged in user)
router.post('/', (req, res) => createRefund(req, res))


module.exports = router;