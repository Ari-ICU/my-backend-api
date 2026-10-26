const mongoose = require('mongoose');
const User = require('../models/user.model');
const Category = require('../models/category.model');
const Product = require('../models/product.model');

async function seedEcommerce() {
  const mongoUri = process.env.MONGDB_URL || process.env.MONGODB_URI || 'mongodb://localhost:27017/course-test';

  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB successfully.');

    // Clear existing collections
    await User.deleteMany({});
    await Category.deleteMany({});
    await Product.deleteMany({});
    console.log('Cleared existing Users, Categories, and Products.');

    // Seed Categories
    const electronics = await Category.create({
      name: 'Electronics',
      slug: 'electronics',
      description: 'Gadgets and electronic devices'
    });

    const computers = await Category.create({
      parent_id: electronics._id,
      name: 'Computers & Laptops',
      slug: 'computers-laptops',
      description: 'Laptops, desktops, and computing gear'
    });

    const audio = await Category.create({
      parent_id: electronics._id,
      name: 'Audio',
      slug: 'audio',
      description: 'Headphones, earbuds, and speakers'
    });

    console.log('Seeded categories.');

    // Seed Products
    await Product.create([
      {
        category_id: computers._id,
        name: 'Pro Ultrabook 14-inch',
        slug: 'pro-ultrabook-14-inch',
        description: 'High performance laptop with M-series processor and 16GB unified memory.',
        sku: 'LAP-PRO-14',
        price: 1299.99,
        compare_at_price: 1499.99,
        stock_quantity: 25,
        status: 'published',
        images: [
          {
            image_url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8',
            alt_text: 'Pro Ultrabook Front View',
            is_primary: true,
            sort_order: 1
          }
        ]
      },
      {
        category_id: audio._id,
        name: 'Wireless Noise Cancelling Headphones',
        slug: 'wireless-noise-cancelling-headphones',
        description: 'Active noise cancellation with 40-hour battery life and premium drivers.',
        sku: 'AUD-NC-001',
        price: 249.99,
        compare_at_price: 299.99,
        stock_quantity: 50,
        status: 'published',
        images: [
          {
            image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
            alt_text: 'Headphones angled view',
            is_primary: true,
            sort_order: 1
          }
        ]
      }
    ]);

    console.log('Seeded products.');

    // Seed Users with addresses
    await User.create([
      {
        full_name: 'Admin User',
        email: 'admin@example.com',
        password_hash: 'hashed_password_example_1',
        phone: '+85512345678',
        role: 'admin',
        addresses: [
          {
            recipient_name: 'Admin User',
            phone: '+85512345678',
            address_line: 'Building 12, St 271',
            city: 'Phnom Penh',
            province: 'Phnom Penh',
            postal_code: '12000',
            country: 'Cambodia',
            is_default: true
          }
        ]
      },
      {
        full_name: 'John Customer',
        email: 'john@example.com',
        password_hash: 'hashed_password_example_2',
        phone: '+85598765432',
        role: 'customer',
        addresses: [
          {
            recipient_name: 'John Customer',
            phone: '+85598765432',
            address_line: 'House 45, St 310',
            city: 'Phnom Penh',
            province: 'Phnom Penh',
            postal_code: '12300',
            country: 'Cambodia',
            is_default: true
          }
        ]
      }
    ]);

    console.log('Seeded users.');
    console.log('All E-Commerce seed data successfully inserted!');
  } catch (error) {
    console.error('Error seeding e-commerce data:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
    process.exit(0);
  }
}

seedEcommerce();
