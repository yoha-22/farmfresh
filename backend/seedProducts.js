const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const User = require('./models/User');

dotenv.config();

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected!');

    // Get farmer
    const farmer = await User.findOne({ role: 'farmer' });
    if (!farmer) {
      console.log('❌ No farmer found!');
      process.exit(1);
    }

    // Delete existing products
    await Product.deleteMany({});
    console.log('🗑️ Old products deleted!');

    const products = [
      // Vegetables
      { name: 'Fresh Tomatoes', price: 40, unit: 'kg', category: 'vegetables', image: '🍅', stock: 100, location: 'Coimbatore', description: 'Fresh organic tomatoes from Coimbatore farms', rating: 4.5 },
      { name: 'Green Spinach', price: 25, unit: 'bunch', category: 'vegetables', image: '🥬', stock: 80, location: 'Madurai', description: 'Fresh green spinach', rating: 4.8 },
      { name: 'Fresh Carrots', price: 35, unit: 'kg', category: 'vegetables', image: '🥕', stock: 90, location: 'Trichy', description: 'Organic carrots from Trichy', rating: 4.3 },
      { name: 'Brinjal', price: 30, unit: 'kg', category: 'vegetables', image: '🍆', stock: 70, location: 'Chennai', description: 'Fresh brinjal', rating: 4.2 },
      { name: 'Beans', price: 60, unit: 'kg', category: 'vegetables', image: '🫘', stock: 50, location: 'Salem', description: 'Fresh green beans', rating: 4.4 },
      { name: 'Onions', price: 45, unit: 'kg', category: 'vegetables', image: '🧅', stock: 200, location: 'Coimbatore', description: 'Fresh red onions', rating: 4.6 },
      { name: 'Potatoes', price: 30, unit: 'kg', category: 'vegetables', image: '🥔', stock: 150, location: 'Ooty', description: 'Fresh Ooty potatoes', rating: 4.7 },
      { name: 'Green Chilli', price: 80, unit: 'kg', category: 'vegetables', image: '🌶️', stock: 40, location: 'Guntur', description: 'Spicy green chilli', rating: 4.5 },
      { name: 'Coriander', price: 20, unit: 'bunch', category: 'vegetables', image: '🌿', stock: 60, location: 'Madurai', description: 'Fresh coriander leaves', rating: 4.8 },
      { name: 'Curry Leaves', price: 15, unit: 'bunch', category: 'vegetables', image: '🍃', stock: 100, location: 'Chennai', description: 'Fresh curry leaves', rating: 4.9 },
      { name: 'Drumstick', price: 50, unit: 'kg', category: 'vegetables', image: '🌱', stock: 45, location: 'Tirunelveli', description: 'Fresh drumstick', rating: 4.6 },
      { name: 'Bitter Gourd', price: 40, unit: 'kg', category: 'vegetables', image: '🥒', stock: 55, location: 'Coimbatore', description: 'Fresh bitter gourd', rating: 4.1 },
      { name: 'Snake Gourd', price: 35, unit: 'kg', category: 'vegetables', image: '🫑', stock: 65, location: 'Salem', description: 'Fresh snake gourd', rating: 4.3 },
      { name: 'Cabbage', price: 25, unit: 'piece', category: 'vegetables', image: '🥦', stock: 80, location: 'Ooty', description: 'Fresh Ooty cabbage', rating: 4.5 },
      { name: 'Cauliflower', price: 30, unit: 'piece', category: 'vegetables', image: '🥦', stock: 70, location: 'Ooty', description: 'Fresh cauliflower', rating: 4.4 },

      // Fruits
      { name: 'Alphonso Mango', price: 120, unit: 'kg', category: 'fruits', image: '🥭', stock: 50, location: 'Salem', description: 'Sweet Alphonso mangoes', rating: 5.0 },
      { name: 'Bananas', price: 50, unit: 'dozen', category: 'fruits', image: '🍌', stock: 100, location: 'Trichy', description: 'Fresh Nendran bananas', rating: 4.6 },
      { name: 'Watermelon', price: 25, unit: 'piece', category: 'fruits', image: '🍉', stock: 30, location: 'Madurai', description: 'Sweet watermelon', rating: 4.7 },
      { name: 'Papaya', price: 40, unit: 'piece', category: 'fruits', image: '🍈', stock: 45, location: 'Coimbatore', description: 'Fresh ripe papaya', rating: 4.5 },
      { name: 'Guava', price: 60, unit: 'kg', category: 'fruits', image: '🍐', stock: 55, location: 'Krishnagiri', description: 'Fresh guava', rating: 4.6 },
      { name: 'Pomegranate', price: 150, unit: 'kg', category: 'fruits', image: '🍎', stock: 40, location: 'Dindigul', description: 'Sweet pomegranate', rating: 4.8 },
      { name: 'Coconut', price: 30, unit: 'piece', category: 'fruits', image: '🥥', stock: 200, location: 'Thanjavur', description: 'Fresh tender coconut', rating: 4.9 },
      { name: 'Pineapple', price: 50, unit: 'piece', category: 'fruits', image: '🍍', stock: 35, location: 'Kanyakumari', description: 'Sweet pineapple', rating: 4.7 },
      { name: 'Sapota', price: 80, unit: 'kg', category: 'fruits', image: '🟤', stock: 40, location: 'Vellore', description: 'Sweet sapota chikku', rating: 4.6 },
      { name: 'Jackfruit', price: 60, unit: 'kg', category: 'fruits', image: '🍋', stock: 25, location: 'Coimbatore', description: 'Fresh jackfruit', rating: 4.5 },
      { name: 'Grapes', price: 120, unit: 'kg', category: 'fruits', image: '🍇', stock: 60, location: 'Madurai', description: 'Sweet black grapes', rating: 4.7 },
      { name: 'Sweet Lemon', price: 70, unit: 'kg', category: 'fruits', image: '🍋', stock: 50, location: 'Trichy', description: 'Fresh sweet lemon', rating: 4.4 },
      { name: 'Custard Apple', price: 100, unit: 'kg', category: 'fruits', image: '🍏', stock: 30, location: 'Salem', description: 'Sweet custard apple', rating: 4.8 },
      { name: 'Fig', price: 200, unit: 'kg', category: 'fruits', image: '🫐', stock: 20, location: 'Coimbatore', description: 'Fresh figs', rating: 4.9 },
      { name: 'Tamarind', price: 90, unit: 'kg', category: 'fruits', image: '🟫', stock: 80, location: 'Tirunelveli', description: 'Fresh tamarind', rating: 4.5 },
    ];

    // Add farmer info to each product
    const productsWithFarmer = products.map(p => ({
      ...p,
      farmer: farmer._id,
      farmerName: farmer.name
    }));

    await Product.insertMany(productsWithFarmer);
    console.log('✅ 30 Products added successfully!');
    process.exit(0);

  } catch (err) {
    console.error('❌ Error:', err);
    process.exit(1);
  }
};

seedProducts();