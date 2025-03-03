// app.js
require('dotenv').config(); // om .env-variabelen te laden
const express = require('express');
const app = express();
const { sequelize } = require('./config/db'); 
const path = require('path');
const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')(session.Store);
require('url');


// Middlewares
app.use(express.json()); 
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
const sessionStore = new SequelizeStore({
  db: sequelize
});
app.use(session({
  secret: process.env.SESSION_SECRET, 
  store: sessionStore,
  resave: false, 
  saveUninitialized: false, 
  cookie: {
      maxAge: 1000 * 60 * 60 * 24, 
      secure: false, 
      httpOnly: true, 
  },
}));
// Create cart for each new visit
app.use((req, res, next) => {
  // Initialize empty cart in session if it doesn't exist
  if (!req.session.cart) {
    req.session.cart = { items: [] };
  }
  next();
});
// more in the ./middlewares directory

// Normal routes
const categoryRoutes = require('./routes/categories.routes.js');
const productRoutes = require('./routes/products.routes.js');
const refundRoutes = require('./routes/refunds.routes.js');
const brandRoutes = require('./routes/brands.routes.js');
const orderRoutes = require('./routes/orders.routes.js');
const cartRoutes = require('./routes/carts.routes.js');
const userRoutes = require('./routes/users.routes.js');

// Admin routes
const adminAttributeRoutes = require('./routes/admin/attributes.routes.js');
const adminCategoryRoutes = require('./routes/admin/categories.routes.js'); 
const adminProductRoutes = require('./routes/admin/products.routes.js');
const adminSettingsPage = require('./routes/admin/settings.routes.js');
const adminBrandRoutes = require('./routes/admin/brands.routes.js');
const adminUserRoutes = require('./routes/admin/users.routes.js');

// Mounted routes
app.use('/api/settings', adminSettingsPage);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/refunds', refundRoutes);
app.use('/api/brands', brandRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api', userRoutes);

//admin routes
app.use('/api/admin/categories', adminCategoryRoutes);
app.use('/api/admin/attributes', adminAttributeRoutes);
app.use('/api/admin/products', adminProductRoutes);
app.use('/api/admin/brands', adminBrandRoutes);
app.use('/api/admin/users', adminUserRoutes);


// Error handling/logging

// Database syncing
(async () => {
  try {
    // Test the DB connection
    await sequelize.authenticate();
    console.log('Succesfully connected to the database.');

    // sync the database with current ./models (apply force: true or alter: true in case of changes)
    await sequelize.sync({ /* force: true */ });
    sessionStore.sync()
    console.log('Database models have been synced!');
    
    // Start the server
    const PORT = process.env.PORT;
    app.listen(PORT, () => {
      console.log(`Server online on port ${PORT}`);
    });

  } catch (error) {
    console.error('Cannot connect to the database:', error);
    process.exit(1); // Close connection if database connection error.
  }
})();
