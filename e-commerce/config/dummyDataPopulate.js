const { faker } = require('@faker-js/faker'); // v6 import style
const { 
  Category, 
  Product, 
  User,
  Address, 
  Order, 
  OrderItem, 
  OrderAddress 
} = require('../models');

async function populateDummyData() {
  try {
    // Clear existing data
    await OrderAddress.destroy({ where: {} });
    await OrderItem.destroy({ where: {} });
    await Order.destroy({ where: {} });
    await Address.destroy({ where: {} });
    await User.destroy({ where: {} });
    await Product.destroy({ where: {} });
    await Category.destroy({ where: {} });

    // Create parent categories
    const parentCategories = await Category.bulkCreate(
      Array.from({ length: 5 }, () => ({
        name: faker.commerce.department(),
        description: faker.lorem.sentence(),
        parent_id: null
      }))
    );

    // Create subcategories
    const subCategories = [];
    for (const parent of parentCategories) {
      subCategories.push(...await Category.bulkCreate(
        Array.from({ length: 3 }, () => ({
          name: faker.commerce.productAdjective(),
          description: faker.lorem.sentence(),
          parent_id: parent.category_id
        }))
      ));
    }
    const allCategories = [...parentCategories, ...subCategories];

    // Create products (fixed UUID syntax)
    const products = [];
    for (const category of allCategories) {
      products.push(...await Product.bulkCreate(
        Array.from({ length: faker.datatype.number({ min: 5, max: 10 }) }, () => ({
          category_id: category.category_id,
          name: faker.commerce.productName(),
          description: faker.commerce.productDescription(),
          price: faker.datatype.float({ min: 10, max: 1000, precision: 0.01 }),
          sku: faker.datatype.uuid().substring(0, 100), // Correct v6 syntax
          stock: faker.datatype.number({ min: 0, max: 100 })
        }))
      ));
    }

    // Create users (v6 compatible phone number)
    const users = await User.bulkCreate(
      Array.from({ length: 50 }, () => ({
        email: faker.internet.email(),
        password_hash: faker.internet.password(),
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        phone_number: faker.phone.phoneNumber().slice(0, 20),
        role: faker.datatype.float() < 0.1 ? 'admin' : 'customer'
      }))
    );

    // Create addresses (v6 address syntax)
    for (const user of users) {
      await Address.bulkCreate(
        Array.from({ length: faker.datatype.number({ min: 1, max: 3 }) }, () => ({
          user_id: user.user_id,
          street: faker.address.streetAddress(),
          city: faker.address.city(),
          postal_code: faker.address.zipCode().substring(0, 20),
          country: faker.address.country(),
          address_type: faker.random.arrayElement(['billing', 'shipping'])
        }))
      );
    }

    // Create orders with related data
    for (const user of users) {
      const numOrders = faker.datatype.number({ min: 0, max: 8 });
      for (let i = 0; i < numOrders; i++) {
        // Select random products
        const selectedProducts = faker.helpers.shuffle(products).slice(
          0, 
          faker.datatype.number({ min: 1, max: 5 })
        );

        // Calculate total and prepare order items
        let totalAmount = 0;
        const orderItems = selectedProducts.map(product => {
          const quantity = faker.datatype.number({ min: 1, max: 3 });
          totalAmount += product.price * quantity;
          return {
            product_id: product.product_id,
            quantity,
            price_each: product.price
          };
        });

        // Create order
        const order = await Order.create({
          user_id: user.user_id,
          total_amount: totalAmount,
          status: faker.random.arrayElement(['pending', 'paid', 'shipped', 'delivered', 'cancelled']),
          payment_method: faker.random.arrayElement(['Credit Card', 'PayPal', 'Bank Transfer', 'COD'])
        });

        // Create order items
        await OrderItem.bulkCreate(orderItems.map(item => ({
          order_id: order.order_id,
          ...item
        })));

        // Create order addresses (v6 address syntax)
        const getAddress = () => ({
          street: faker.address.streetAddress(),
          city: faker.address.city(),
          postal_code: faker.address.zipCode().substring(0, 20),
          country: faker.address.country()
        });

        await OrderAddress.bulkCreate([
          {
            order_id: order.order_id,
            address_type: 'shipping',
            ...getAddress()
          },
          {
            order_id: order.order_id,
            address_type: 'billing',
            ...getAddress()
          }
        ]);
      }
    }

    console.log('Successfully populated dummy data!');
  } catch (error) {
    console.error('Error populating data:', error);
  } finally {
    process.exit();
  }
}

populateDummyData();