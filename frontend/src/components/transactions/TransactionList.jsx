import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTransactions } from '../../context/TransactionContext';
import TransactionItem from './TransactionItem';
import FilterPanel from '../filters/FilterPanel';
import { PlusCircle, Filter } from 'lucide-react';

const TransactionList = () => {
  const { transactions, loading, filters, applyFilters } = useTransactions();
  const [showFilters, setShowFilters] = useState(false);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Transactions</h1>
        <div className="flex space-x-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="btn btn-secondary flex items-center"
          >
            <Filter className="h-4 w-4 mr-1" />
            Filters
          </button>
          <Link to="/add" className="btn btn-primary flex items-center">
            <PlusCircle className="h-4 w-4 mr-1" />
            Add New
          </Link>
        </div>
      </div>

      {showFilters && (
        <FilterPanel
          filters={filters}
          onApplyFilters={applyFilters}
          onClose={() => setShowFilters(false)}
        />
      )}

      {transactions.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">No transactions yet</h2>
          <p className="text-gray-500 mb-4">Start by adding your first transaction</p>
          <Link to="/add" className="btn btn-primary">
            Add Transaction
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {transactions.map(transaction => (
                  <TransactionItem key={transaction._id} transaction={transaction} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionList;