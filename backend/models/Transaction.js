const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  amount: {
    type: Number,
    required: [true, 'Please add an amount'],
    validate: {
      validator: function(value) {
        return value !== 0;
      },
      message: 'Amount cannot be zero'
    }
  },
  date: {
    type: Date,
    required: [true, 'Please add a date'],
    default: Date.now
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    trim: true,
    maxlength: [50, 'Category cannot be more than 50 characters']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Transaction', transactionSchema);






