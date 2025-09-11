import { useState, useEffect } from 'react';
import { analyticsApi } from '../services/api';
import ExpenseChart from '../components/analytics/ExpenseChart';
import CategoryChart from '../components/analytics/CategoryChart';
import MonthlySummary from '../components/analytics/MonthlySummary';

const Analytics = () => {
  const [summary, setSummary] = useState(null);
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: ''
  });

  useEffect(() => {
    fetchSummary();
  }, [filters]);

  const fetchSummary = async () => {
    try {
      const response = await analyticsApi.getSummary(filters);
      setSummary(response.data);
    } catch (error) {
      console.error('Error fetching summary:', error);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  if (!summary) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">Financial Analytics</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-lg font-semibold mb-4">Date Range Filter</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={filters.startDate}
              onChange={handleFilterChange}
              className="input"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
            <input
              type="date"
              name="endDate"
              value={filters.endDate}
              onChange={handleFilterChange}
              className="input"
            />
          </div>
        </div>
      </div>
      
      <MonthlySummary summary={summary} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ExpenseChart data={summary.monthlyData} />
        <CategoryChart data={summary.expenseByCategory} />
      </div>
    </div>
  );
};

export default Analytics;