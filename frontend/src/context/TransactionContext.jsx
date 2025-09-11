import { createContext, useContext, useReducer } from 'react';
import { transactionApi } from '../services/api';
import { useAuth } from './AuthContext';

const TransactionContext = createContext();

const transactionReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_TRANSACTIONS':
      return { ...state, transactions: action.payload, loading: false };
    case 'ADD_TRANSACTION':
      return { ...state, transactions: [action.payload, ...state.transactions] };
    case 'UPDATE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.map(transaction =>
          transaction._id === action.payload._id ? action.payload : transaction
        )
      };
    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter(
          transaction => transaction._id !== action.payload
        )
      };
    case 'SET_FILTERS':
      return { ...state, filters: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

const initialState = {
  transactions: [],
  loading: false,
  error: null,
  filters: {
    category: '',
    startDate: '',
    endDate: '',
    type: ''
  }
};

export const TransactionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(transactionReducer, initialState);
  const { user } = useAuth();

  const getTransactions = async (filters = {}) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await transactionApi.getTransactions(filters);
      dispatch({ type: 'SET_TRANSACTIONS', payload: response.data.transactions });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.response?.data?.message || 'Error fetching transactions' });
    }
  };

  const addTransaction = async (transactionData) => {
    try {
      const response = await transactionApi.createTransaction(transactionData);
      dispatch({ type: 'ADD_TRANSACTION', payload: response.data });
      return response.data;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.response?.data?.message || 'Error adding transaction' });
      throw error;
    }
  };

  const updateTransaction = async (id, transactionData) => {
    try {
      const response = await transactionApi.updateTransaction(id, transactionData);
      dispatch({ type: 'UPDATE_TRANSACTION', payload: response.data });
      return response.data;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.response?.data?.message || 'Error updating transaction' });
      throw error;
    }
  };

  const deleteTransaction = async (id) => {
    try {
      await transactionApi.deleteTransaction(id);
      dispatch({ type: 'DELETE_TRANSACTION', payload: id });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.response?.data?.message || 'Error deleting transaction' });
      throw error;
    }
  };

  const applyFilters = (filters) => {
    dispatch({ type: 'SET_FILTERS', payload: filters });
  };

  const value = {
    transactions: state.transactions,
    loading: state.loading,
    error: state.error,
    filters: state.filters,
    getTransactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    applyFilters
  };

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error('useTransactions must be used within a TransactionProvider');
  }
  return context;
};