import { useState, useEffect } from 'react';
import { transactionApi } from '../services/api';

export const useTransactions = (filters = {}) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const response = await transactionApi.getTransactions(filters);
        setTransactions(response.data.transactions);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching transactions');
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [filters]);

  const addTransaction = async (transactionData) => {
    try {
      const response = await transactionApi.createTransaction(transactionData);
      setTransactions(prev => [response.data, ...prev]);
      return response.data;
    } catch (err) {
      throw err.response?.data?.message || 'Error adding transaction';
    }
  };

  const updateTransaction = async (id, transactionData) => {
    try {
      const response = await transactionApi.updateTransaction(id, transactionData);
      setTransactions(prev => prev.map(t => t._id === id ? response.data : t));
      return response.data;
    } catch (err) {
      throw err.response?.data?.message || 'Error updating transaction';
    }
  };

  const deleteTransaction = async (id) => {
    try {
      await transactionApi.deleteTransaction(id);
      setTransactions(prev => prev.filter(t => t._id !== id));
    } catch (err) {
      throw err.response?.data?.message || 'Error deleting transaction';
    }
  };

  return {
    transactions,
    loading,
    error,
    addTransaction,
    updateTransaction,
    deleteTransaction
  };
};