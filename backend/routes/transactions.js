const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { protect } = require('../middleware/auth');

// Use in-memory storage if MongoDB is not connected
let Transaction;
try {
  if (mongoose.connection.readyState === 1) {
    Transaction = require('../models/Transaction');
  } else {
    throw new Error('MongoDB not connected');
  }
} catch (error) {
  console.log('Using in-memory storage for demo purposes');
  Transaction = require('../models/MemoryTransaction');
}

// @route   GET /api/transactions
// @desc    Get all transactions
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1 });
    res.json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   GET /api/transactions/:id
// @desc    Get single transaction
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    
    res.json(transaction);
  } catch (error) {
    console.error('Error fetching transaction:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   POST /api/transactions
// @desc    Create new transaction
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { title, amount, date, category } = req.body;
    
    const transaction = new Transaction({
      title,
      amount,
      date: date || new Date(),
      category
    });
    
    const savedTransaction = await transaction.save();
    res.status(201).json(savedTransaction);
  } catch (error) {
    console.error('Error creating transaction:', error);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   PUT /api/transactions/:id
// @desc    Update transaction
// @access  Private
router.put('/:id', protect, async (req, res) => {
  try {
    const { title, amount, date, category } = req.body;
    
    const transaction = await Transaction.findById(req.params.id);
    
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    
    transaction.title = title || transaction.title;
    transaction.amount = amount !== undefined ? amount : transaction.amount;
    transaction.date = date || transaction.date;
    transaction.category = category || transaction.category;
    
    const updatedTransaction = await transaction.save();
    res.json(updatedTransaction);
  } catch (error) {
    console.error('Error updating transaction:', error);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   DELETE /api/transactions/:id
// @desc    Delete transaction
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    
    await Transaction.findByIdAndDelete(req.params.id);
    res.json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    console.error('Error deleting transaction:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;


