const {sequelize, models} = require('../../models/index.js');
const { Op } = require('sequelize')
const bcrypt = require('bcrypt')

exports.getUserById = async (req, res) => {
    try {
        const user = await models.User.findOne({where: {user_id: req.params.id}, attributes: {exclude: ['password_hash']}, include: [
          {
            model: models.Address,
            attributes: ['address_id', 'street', 'city', 'address_type', 'is_primary']
          }
        ]});
        if (user) {
          res.json(user);
        } else {
          res.status(404).json({ message: 'User not found' });
        }
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}

exports.getUsers = async (req, res) => {
    try {
        const user = await models.User.findAll({attributes: {exclude: ['password_hash']}, include: [
          {
            model: models.Address,
            attributes: ['address_id', 'street', 'city', 'address_type', 'is_primary']
          }
        ]});
        return res.json(user);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

exports.createUser = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
      const { first_name, last_name, email, password, addresses } = req.body;
  
      if (!first_name || !last_name|| !email || !password) {
        await transaction.rollback(); 
        return res.status(400).json({ error: 'First name, last name, email and password are mandatory' });
      }
  
      // Check bestaande gebruiker
      const existingUser = await models.User.findOne({ where: { email }, transaction });
      if (existingUser) {
        await transaction.rollback();
        return res.status(400).json({ error: 'Email already exists' });
      }
  
      // Hash wachtwoord
      const hashedPassword = await bcrypt.hash(password, 12);
  
      // Maak gebruiker aan
      const user = await models.User.create({
        first_name,
        last_name,
        email,
        password_hash: hashedPassword,
        is_active: true
      }, { transaction });
  
      // Verwerk adressen
      if (addresses && addresses.length > 0) {
        for (const addr of addresses) {
          // Adresvalidatie
          const requiredFields = ['street', 'city', 'country', 'postal_code', 'address_type'];
          if (requiredFields.some(field => !addr[field])) {
            await transaction.rollback();
            return res.status(400).json({ error: 'Fill in all mandatory address fields' });
          }
  
          if (!['billing', 'shipping'].includes(addr.address_type)) {
            await transaction.rollback();
            return res.status(400).json({ error: 'Non-address type' });
          }
  
          await models.Address.create({
            street: addr.street,
            city: addr.city,
            state: addr.state,
            country: addr.country,
            postal_code: addr.postal_code,
            is_primary: addr.is_primary || false,
            address_type: addr.address_type,
            UserUserId: user.user_id
          }, { transaction });
        }
      }
  
      await transaction.commit();
      
      // Haal gebruiker op met adressen
      const userWithAddresses = await models.User.findByPk(user.user_id, {
        include: [{
          model: models.Address,
          attributes: ['address_id', 'street', 'city', 'address_type', 'is_primary']
        }]
      });
  
      res.status(201).json(userWithAddresses);
    } catch (error) {
      await transaction.rollback();
      res.status(500).json({ 
        error: 'Server error creating user',
        details: error.message 
      });
    }
};

exports.updateUser = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
      const user_id = req.params.id;
      const { first_name, last_name, email, password, addresses } = req.body;

      // Find existing user
      const user = await models.User.findByPk(user_id, { transaction });
      if (!user) {
          await transaction.rollback();
          return res.status(404).json({ error: 'User not found' });
      }

      // Validate email uniqueness if changed
      if (email && email !== user.email) {
          const existingUser = await models.User.findOne({ 
              where: { email }, 
              transaction 
          });
          if (existingUser) {
              await transaction.rollback();
              return res.status(400).json({ error: 'Email already in use' });
          }
      }

      // Update user fields
      if (first_name) user.first_name = first_name;
      if (last_name) user.last_name = last_name;
      if (email) user.email = email;
      if (password) {
          const hashedPassword = await bcrypt.hash(password, 12);
          user.password_hash = hashedPassword;
      }
      await user.save({ transaction });

      // Process addresses if provided
      if (addresses) {
          for (const addr of addresses) {
              const requiredFields = ['street', 'city', 'country', 'postal_code', 'address_type'];
              
              // Validate address fields
              if (requiredFields.some(field => !addr[field])) {
                  await transaction.rollback();
                  return res.status(400).json({ error: 'All mandatory address fields are required' });
              }
              
              if (!['billing', 'shipping'].includes(addr.address_type)) {
                  await transaction.rollback();
                  return res.status(400).json({ error: 'Invalid address type' });
              }

              if (addr.address_id) {
                  // Update existing address
                  const existingAddress = await models.Address.findOne({
                      where: { 
                          address_id: addr.address_id,
                          UserUserId: user_id
                      },
                      transaction
                  });

                  if (!existingAddress) {
                      await transaction.rollback();
                      return res.status(404).json({ error: 'Address not found' });
                  }

                  await existingAddress.update({
                      street: addr.street,
                      city: addr.city,
                      state: addr.state,
                      country: addr.country,
                      postal_code: addr.postal_code,
                      is_primary: addr.is_primary || false,
                      address_type: addr.address_type
                  }, { transaction });
              } else {
                  // Create new address
                  await models.Address.create({
                      street: addr.street,
                      city: addr.city,
                      state: addr.state,
                      country: addr.country,
                      postal_code: addr.postal_code,
                      is_primary: addr.is_primary || false,
                      address_type: addr.address_type,
                      UserUserId: user_id
                  }, { transaction });
              }
          }
      }

      await transaction.commit();

      // Return updated user with addresses
      const updatedUser = await models.User.findByPk(user_id, {
          include: [{
              model: models.Address,
              attributes: ['address_id', 'street', 'city', 'address_type', 'is_primary']
          }]
      });

      res.status(200).json(updatedUser);
  } catch (error) {
      await transaction.rollback();
      res.status(500).json({ 
          error: 'Server error updating user',
          details: error.message 
      });
  }
};