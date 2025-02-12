// app.js of server.js
const express = require('express');
const { sequelize } = require('../models'); // importeer de sequelize-instantie

const app = express();
app.use(express.json());

// Synchroniseer de modellen met de database (alleen in development)
sequelize.sync({ force: true }) // force = true zal tabellen droppen en opnieuw aanmaken!
  .then(() => {
    console.log('Database gesynchroniseerd!');
  })
  .catch((err) => {
    console.error('Fout bij sync:', err);
  });

// Routes (zoals eerder getoond)
// ...

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
