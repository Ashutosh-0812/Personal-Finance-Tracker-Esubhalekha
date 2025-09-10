const Transaction = require('../models/Transaction');
const { generateMonthlyChartData, generateCategoryChartData } = require('../utils/charts');

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
    
    // Generate chart data
    const monthlyData = generateMonthlyChartData(transactions);
    const categoryData = generateCategoryChartData(transactions, 'expense');
    
    res.json({
      totalIncome,
      totalExpense,
      balance,
      monthlyData,
      categoryData
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getFinancialSummary,
};