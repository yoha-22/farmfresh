const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    name: String,
    price: Number,
    quantity: Number,
    image: String,
    farmer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  }],
  deliveryAddress: {
    name: String,
    phone: String,
    street: String,
    city: String,
    state: { type: String, default: 'Tamil Nadu' },
    pincode: String
  },
  paymentMethod: { type: String, enum: ['upi', 'card', 'cod'], default: 'cod' },
  paymentStatus: { type: String, enum: ['pending', 'paid'], default: 'pending' },
  orderStatus: {
    type: String,
    enum: ['pending', 'packing', 'on-the-way', 'delivered', 'cancelled'],
    default: 'pending'
  },
  subtotal: Number,
  deliveryCharge: { type: Number, default: 40 },
  discount: { type: Number, default: 0 },
  total: Number,
  couponCode: String
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);