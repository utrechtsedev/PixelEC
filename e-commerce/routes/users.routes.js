// routes/users.routes.js
const express = require('express');
const router = express.Router();
const { User } = require('../models');

// GET /users - Alle users ophalen
router.get('/', async (req, res) => {
try {
 const users = await User.findAll();
 res.json(users);
} catch (err) {
 res.status(500).json({ error: err.message });
}
});

// GET /users/:id - Één user op ID
router.get('/:id', async (req, res) => {
try {
 const user = await User.findByPk(req.params.id);
 if (!user) {
   return res.status(404).json({ error: 'User niet gevonden' });
 }
 res.json(user);
} catch (err) {
 res.status(500).json({ error: err.message });
}
});

// POST /users - Nieuwe user aanmaken
router.post('/', async (req, res) => {
try {
 // Voorbeeld: we gaan uit van req.body = { email, password_hash, first_name, last_name, ... }
 const newUser = await User.create(req.body);
 res.status(201).json(newUser);
} catch (err) {
 res.status(400).json({ error: err.message });
}
});

// PUT /users/:id - Bestaande user updaten
router.put('/:id', async (req, res) => {
try {
 const [rowsUpdated] = await User.update(req.body, {
   where: { user_id: req.params.id }
 });
 if (rowsUpdated === 0) {
   return res.status(404).json({ error: 'User niet gevonden of geen veranderingen' });
 }
 // Eventueel de geüpdatete user terughalen
 const updatedUser = await User.findByPk(req.params.id);
 res.json(updatedUser);
} catch (err) {
 res.status(400).json({ error: err.message });
}
});

// DELETE /users/:id - User verwijderen
router.delete('/:id', async (req, res) => {
try {
 const rowsDeleted = await User.destroy({
   where: { user_id: req.params.id }
 });
 if (rowsDeleted === 0) {
   return res.status(404).json({ error: 'User niet gevonden' });
 }
 res.status(204).send(); // Succes, maar geen content terug
} catch (err) {
 res.status(500).json({ error: err.message });
}
});

module.exports = router;