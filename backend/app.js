require('dotenv').config(); // om .env-variabelen te laden
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const { sequelize } = require('./config/db'); 
const path = require('path');
require('url');

app.use(express.static('uploads'))

// Middlewares
app.use(bodyParser.json()); 
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// more in the ./middlewares directory

// Routes
const userRoutes = require('./routes/users.routes');
const addressRoutes = require('./routes/addresses.routes');
const categoryRoutes = require('./routes/categories.routes');
const productRoutes = require('./routes/products.routes');
const orderRoutes = require('./routes/orders.routes');
const orderItemRoutes = require('./routes/orderItems.routes');
const orderAddressRoutes = require('./routes/orderAddresses.routes');

// Mounted routes
app.use('/api/users', userRoutes);
app.use('/api/addresses', addressRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/order-items', orderItemRoutes);
app.use('/api/order-addresses', orderAddressRoutes);

// Error handling/logging
// app.use((err, req, res, next) => { ... })

// Database syncing
(async () => {
  try {
    // Test de verbinding
    await sequelize.authenticate();
    console.log('Succesvol verbonden met de database.');

    // Synchroniseer modellen (pas 'force' aan naar behoefte)
    // force: true wist en hermaakt alle tabellen => alleen handig in dev!
    await sequelize.sync({ alter:true});
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
