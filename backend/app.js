require('dotenv').config(); // om .env-variabelen te laden
const express = require('express');
const app = express();
const { sequelize } = require('./config/db'); 
const path = require('path');
require('url');


// Middlewares
app.use(express.json()); 
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// more in the ./middlewares directory

// Normal routes
const productRoutes = require('./routes/products.routes.js');

// Admin routes
const adminProductRoutes = require('./routes/admin/products.routes.js'); 

// Mounted routes
app.use('/api/products', productRoutes);
app.use('/api/admin/products', adminProductRoutes);


// Error handling/logging

// Database syncing
(async () => {
  try {
    // Test de verbinding
    await sequelize.authenticate();
    console.log('Succesvol verbonden met de database.');

    // Synchroniseer modellen (pas 'force' aan naar behoefte)
    // force: true wist en hermaakt alle tabellen => alleen handig in dev!
    await sequelize.sync({ alter: true });
    console.log('Database modellen gesynchroniseerd!');
    
    // 8. Start de server
    const PORT = process.env.PORT;
    app.listen(PORT, () => {
      console.log(`Server draait op poort ${PORT}`);
    });

  } catch (error) {
    console.error('Kan niet verbinden met de database:', error);
    process.exit(1); // Sluit af als de DB-verbinding niet lukt
  }
})();
