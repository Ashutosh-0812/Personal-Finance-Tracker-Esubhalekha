import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { TransactionProvider } from './context/TransactionContext';
import Navbar from './components/common/Navbar';
import PrivateRoute from './components/common/PrivateRoute';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import AddTransaction from './pages/AddTransaction';
import EditTransaction from './pages/EditTransaction';
import Analytics from './pages/Analytics';

function App() {
  return (
    <Router>
      <AuthProvider>
        <TransactionProvider>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } />
              <Route path="/add" element={
                <PrivateRoute>
                  <AddTransaction />
                </PrivateRoute>
              } />
              <Route path="/:id/edit" element={
                <PrivateRoute>
                  <EditTransaction />
                </PrivateRoute>
              } />
              <Route path="/analytics" element={
                <PrivateRoute>
                  <Analytics />
                </PrivateRoute>
              } />
            </Routes>
          </div>
        </TransactionProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;