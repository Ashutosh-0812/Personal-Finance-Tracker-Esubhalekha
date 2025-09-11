const Transaction = require('../models/Transaction');

// Get financial summary
const getFinancialSummary = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;
    
    let query = { user: req.user._id };
    
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }
    
    const transactions = await Transaction.find(query);
    
    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const totalExpense = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const balance = totalIncome - totalExpense;
    
    // Generate monthly data directly in the controller
    const monthlyData = transactions.reduce((acc, t) => {
      const monthYear = t.date.toISOString().substring(0, 7); // YYYY-MM format
      if (!acc[monthYear]) {
        acc[monthYear] = { income: 0, expense: 0 };
      }
      
      if (t.type === 'income') {
        acc[monthYear].income += t.amount;
      } else {
        acc[monthYear].expense += t.amount;
      }
      
      return acc;
    }, {});
    
    // Generate category data
    const expenseByCategory = transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {});
    
    res.json({
      totalIncome,
      totalExpense,
      balance,
      expenseByCategory,
      monthlyData
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getFinancialSummary
};