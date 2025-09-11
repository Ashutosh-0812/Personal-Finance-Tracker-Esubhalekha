import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTransactions } from '../context/TransactionContext';
import { transactionApi } from '../services/api';
import TransactionForm from '../components/transactions/TransactionForm';

const EditTransaction = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateTransaction } = useTransactions();
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const response = await transactionApi.getTransaction(id);
        setTransaction(response.data);
      } catch (error) {
        console.error('Error fetching transaction:', error);
        navigate('/dashboard');
      } finally {
        setLoading(false);
      }
    };

    fetchTransaction();
  }, [id, navigate]);

  const handleSubmit = async (transactionData) => {
    try {
      await updateTransaction(id, transactionData);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error updating transaction:', error);
    }
  };

  const handleCancel = () => {
    navigate('/dashboard');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <TransactionForm 
        transaction={transaction} 
        onSubmit={handleSubmit} 
        onCancel={handleCancel} 
      />
    </div>
  );
};

export default EditTransaction;