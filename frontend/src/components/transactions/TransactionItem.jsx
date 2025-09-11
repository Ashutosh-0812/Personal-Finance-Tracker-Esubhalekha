import { Link } from 'react-router-dom';
import { useTransactions } from '../../context/TransactionContext';
import { Edit, Trash2 } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

const TransactionItem = ({ transaction }) => {
  const { deleteTransaction } = useTransactions();

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      try {
        await deleteTransaction(transaction._id);
      } catch (error) {
        console.error('Error deleting transaction:', error);
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{transaction.title}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className={`text-lg font-semibold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
          {formatCurrency(transaction.amount)}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{transaction.category}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{formatDate(transaction.date)}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <div className="flex space-x-2">
          <Link
            to={`/${transaction._id}/edit`}
            className="text-indigo-600 hover:text-indigo-900"
          >
            <Edit className="h-4 w-4" />
          </Link>
          <button
            onClick={handleDelete}
            className="text-red-600 hover:text-red-900"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default TransactionItem;