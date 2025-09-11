// Utility functions for generating chart data
const generateMonthlyChartData = (transactions) => {
  const monthlyData = {};
  
  transactions.forEach(transaction => {
    const monthYear = transaction.date.toISOString().substring(0, 7); // YYYY-MM format
    
    if (!monthlyData[monthYear]) {
      monthlyData[monthYear] = { income: 0, expense: 0 };
    }
    
    if (transaction.type === 'income') {
      monthlyData[monthYear].income += transaction.amount;
    } else {
      monthlyData[monthYear].expense += transaction.amount;
    }
  });
  
  return monthlyData;
};

const generateCategoryData = (transactions) => {
  const categoryData = {};
  
  transactions
    .filter(t => t.type === 'expense')
    .forEach(transaction => {
      categoryData[transaction.category] = (categoryData[transaction.category] || 0) + transaction.amount;
    });
  
  return categoryData;
};

module.exports = {
  generateMonthlyChartData,
  generateCategoryData
};