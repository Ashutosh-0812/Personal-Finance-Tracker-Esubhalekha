import { useEffect } from 'react';
import { useTransactions } from '../context/TransactionContext';
import TransactionList from '../components/transactions/TransactionList';
import { analyticsApi } from '../services/api';
import { useState } from 'react';
import MonthlySummary from '../components/analytics/MonthlySummary';

const Dashboard = () => {
  const { getTransactions } = useTransactions();
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    getTransactions();
    fetchSummary();
  }, []);

  const fetchSummary = async () => {
    try {
      const response = await analyticsApi.getSummary();
      setSummary(response.data);
    } catch (error) {
      console.error('Error fetching summary:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">Dashboard</h1>
      
      {summary && <MonthlySummary summary={summary} />}
      
      <TransactionList />
    </div>
  );
};

export default Dashboard;