import { useNavigate } from 'react-router-dom';
import { useTransactions } from '../context/TransactionContext';
import TransactionForm from '../components/transactions/TransactionForm';

const AddTransaction = () => {
  const { addTransaction } = useTransactions();
  const navigate = useNavigate();

  const handleSubmit = async (transactionData) => {
    try {
      await addTransaction(transactionData);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  const handleCancel = () => {
    navigate('/dashboard');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <TransactionForm onSubmit={handleSubmit} onCancel={handleCancel} />
    </div>
  );
};

export default AddTransaction;