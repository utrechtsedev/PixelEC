const express = require('express');
const { createUser, getUserById, getUsers, updateUser } = require('../../controllers/admin/usersController');
const router = express.Router();

// create user
router.post('/', (req, res) => createUser(req, res));
// fetch one user
router.get('/:id', (req, res) => getUserById(req, res));
// fetch all users
router.get('/', (req, res) => getUsers(req, res));
// update user
router.put('/:id', (req, res) => updateUser(req, res))

module.exports = router;