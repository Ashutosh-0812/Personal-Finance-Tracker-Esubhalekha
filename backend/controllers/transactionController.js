const Transaction = require('../models/Transaction');

// Get all transactions for a user
const getTransactions = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, type, category, startDate, endDate } = req.query;
    
    let query = { user: req.user._id };
    
    if (type) query.type = type;
    if (category) query.category = category;
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }
    
    const transactions = await Transaction.find(query)
      .sort({ date: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await Transaction.countDocuments(query);
    
    res.json({
      transactions,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    next(error);
  }
};

// Get single transaction
const getTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findOne({
      _id: req.params.id,
      user: req.user._id
    });
    
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    
    res.json(transaction);
  } catch (error) {
    next(error);
  }
};

// Create transaction
const createTransaction = async (req, res, next) => {
  try {
    const { title, amount, type, date, category } = req.body;
    
    const transaction = await Transaction.create({
      title,
      amount,
      type,
      date,
      category,
      user: req.user._id
    });
    
    res.status(201).json(transaction);
  } catch (error) {
    next(error);
  }
};

// Update transaction
const updateTransaction = async (req, res, next) => {
  try {
    const { title, amount, type, date, category } = req.body;
    
    let transaction = await Transaction.findOne({
      _id: req.params.id,
      user: req.user._id
    });
    
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    
    transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      { title, amount, type, date, category },
      { new: true, runValidators: true }
    );
    
    res.json(transaction);
  } catch (error) {
    next(error);
  }
};

// Delete transaction
const deleteTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findOne({
      _id: req.params.id,
      user: req.user._id
    });
    
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    
    await Transaction.findByIdAndDelete(req.params.id);
    
    res.json({ message: 'Transaction removed' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTransactions,
  getTransaction,
  createTransaction,
  updateTransaction,
  deleteTransaction,
};