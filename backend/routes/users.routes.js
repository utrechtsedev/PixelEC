const express = require('express');
const { login, logout } = require('../controllers/users.controller');
const router = express.Router();

// login route
router.post('/login', (req, res) => login(req, res));
// logout route
router.get('/logout', (req, res) => logout(req, res));


module.exports = router;