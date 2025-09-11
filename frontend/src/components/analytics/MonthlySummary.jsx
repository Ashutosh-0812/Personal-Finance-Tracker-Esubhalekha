import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

const MonthlySummary = ({ summary }) => {
  const { totalIncome, totalExpense, balance } = summary;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="card bg-green-50">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-green-100 mr-4">
            <TrendingUp className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-green-600">Total Income</p>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalIncome)}</p>
          </div>
        </div>
      </div>
      
      <div className="card bg-red-50">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-red-100 mr-4">
            <TrendingDown className="h-6 w-6 text-red-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-red-600">Total Expense</p>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalExpense)}</p>
          </div>
        </div>
      </div>
      
      <div className={`card ${balance >= 0 ? 'bg-blue-50' : 'bg-orange-50'}`}>
        <div className="flex items-center">
          <div className={`p-3 rounded-full ${balance >= 0 ? 'bg-blue-100' : 'bg-orange-100'} mr-4`}>
            <DollarSign className={`h-6 w-6 ${balance >= 0 ? 'text-blue-600' : 'text-orange-600'}`} />
          </div>
          <div>
            <p className={`text-sm font-medium ${balance >= 0 ? 'text-blue-600' : 'text-orange-600'}`}>Balance</p>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(balance)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlySummary;