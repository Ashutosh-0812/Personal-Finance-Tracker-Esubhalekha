import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '../../utils/formatters';

const ExpenseChart = ({ data }) => {
  const chartData = Object.entries(data).map(([month, values]) => ({
    month,
    income: values.income,
    expense: values.expense
  }));

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-4">Monthly Income vs Expense</h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis
              tickFormatter={(value) => formatCurrency(value)}
            />
            <Tooltip formatter={(value) => formatCurrency(value)} />
            <Legend />
            <Bar dataKey="income" fill="#4ade80" name="Income" />
            <Bar dataKey="expense" fill="#f87171" name="Expense" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ExpenseChart;