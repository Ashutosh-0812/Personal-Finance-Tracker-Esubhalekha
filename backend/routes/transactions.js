const express = require('express');
const {
  getTransactions,
  getTransaction,
  createTransaction,
  updateTransaction,
  deleteTransaction
} = require('../controllers/transactionController');
const { protect } = require('../middleware/auth');
const { validateTransaction, handleValidationErrors } = require('../middleware/validation');

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getTransactions)
  .post(validateTransaction, handleValidationErrors, createTransaction);

router.route('/:id')
  .get(getTransaction)
  .put(validateTransaction, handleValidationErrors, updateTransaction)
  .delete(deleteTransaction);

module.exports = router;