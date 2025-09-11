import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowRight, BarChart3, PlusCircle, TrendingUp } from 'lucide-react';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Take Control of Your <span className="text-primary-600">Finances</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
            Track your income and expenses, analyze your spending habits, and achieve your financial goals with our intuitive personal finance tracker.
          </p>
          
          {user ? (
            <Link 
              to="/dashboard" 
              className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors duration-200"
            >
              Go to Dashboard <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          ) : (
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                to="/register" 
                className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors duration-200"
              >
                Get Started
              </Link>
              <Link 
                to="/login" 
                className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg transition-colors duration-200"
              >
                Sign In
              </Link>
            </div>
          )}
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="bg-primary-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <PlusCircle className="h-6 w-6 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Easy Tracking</h3>
            <p className="text-gray-600">
              Quickly add income and expenses with our simple form. Categorize transactions for better organization.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="bg-primary-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <BarChart3 className="h-6 w-6 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Visual Analytics</h3>
            <p className="text-gray-600">
              Understand your spending patterns with beautiful charts and visualizations of your financial data.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="bg-primary-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <TrendingUp className="h-6 w-6 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Financial Insights</h3>
            <p className="text-gray-600">
              Gain valuable insights into your financial health and make informed decisions about your money.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;