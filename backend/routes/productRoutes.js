const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { protect, farmerOnly } = require('../middleware/authMiddleware');

router.get('/', async (req, res) => {
  try {
    const { category, search, farmerName } = req.query;
    let query = { isAvailable: true };
    if (category) query.category = category;
    if (search) query.name = { $regex: search, $options: 'i' };
    if (farmerName) query.farmerName = { $regex: farmerName, $options: 'i' };
    const products = await Product.find(query).populate('farmer', 'name');
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('farmer', 'name');
    if (!product) return res.status(404).json({ message: 'Product not found!' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', protect, farmerOnly, async (req, res) => {
  try {
    const product = await Product.create({
      ...req.body,
      farmer: req.user._id,
      farmerName: req.user.name || 'Unknown'
    });
    res.status(201).json({ message: '✅ Product added!', product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/:id', protect, farmerOnly, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: '✅ Product updated!', product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/:id', protect, farmerOnly, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: '✅ Product deleted!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;