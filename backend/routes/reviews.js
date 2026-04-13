const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
 
// GET all reviews for a product
router.get('/:productId', async (req, res) => {
  try {
    const reviews = await Review.find({ productId: req.params.productId }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching reviews' });
  }
});
 
// POST a new review
router.post('/', async (req, res) => {
  try {
    const { productId, customerName, rating, comment } = req.body;
    const review = new Review({ productId, customerName, rating, comment });
    await review.save();
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: 'Error saving review' });
  }
});
 
module.exports = router;
 






