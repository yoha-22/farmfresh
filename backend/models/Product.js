const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  unit: { type: String, default: 'kg' },
  category: { type: String, enum: ['vegetables', 'fruits'], required: true },
  image: { type: String, default: '🥦' },
  stock: { type: Number, required: true, default: 0 },
  farmer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  farmerName: { type: String },
  location: { type: String },
  rating: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
  isAvailable: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);