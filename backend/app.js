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
const categoryRoutes = require('./routes/categories.routes.js')

// Admin routes
const adminProductRoutes = require('./routes/admin/products.routes.js');
const adminCategoryRoutes = require('./routes/admin/categories.routes.js'); 
const adminBrandRoutes = require('./routes/admin/brands.routes.js')

// Mounted routes
app.use('/api/products', productRoutes);
app.use('/api/category', categoryRoutes)

//admin routes
app.use('/api/admin/products', adminProductRoutes);
app.use('/api/admin/categories', adminCategoryRoutes);
app.use('/api/admin/brands', adminBrandRoutes)


// Error handling/logging

// Database syncing
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Succesvol verbonden met de database.');

    await sequelize.sync({  });
    console.log('Database modellen gesynchroniseerd!');
    
    const PORT = process.env.PORT;
    app.listen(PORT, () => {
      console.log(`Server draait op poort ${PORT}`);
    });

  } catch (error) {
    console.error('Kan niet verbinden met de database:', error);
    process.exit(1); // Sluit af als de DB-verbinding niet lukt
  }
})();
