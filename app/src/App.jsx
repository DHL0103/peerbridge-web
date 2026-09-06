import { Routes, Route, useLocation } from 'react-router-dom';

import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Dashboard from './pages/Dashboard';
import Deposit from './pages/Deposit';
import MyInvestments from './pages/MyInvestments';
import LoanApply from './pages/LoanApply';
import MyLoans from './pages/MyLoans';
import Repay from './pages/Repay';
import About from './pages/About';
import Admin from './pages/Admin';
import Settings from './pages/Settings';

export default function App() {
  const { pathname } = useLocation();

  return (
    <div style={{ maxWidth: 1440, margin: '0 auto', background: '#f5f1ea', minHeight: '100vh' }} key={pathname}>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/deposit" element={<Deposit />} />
        <Route path="/my-investments" element={<MyInvestments />} />
        <Route path="/loan/apply" element={<LoanApply />} />
        <Route path="/my-loans" element={<MyLoans />} />
        <Route path="/repay" element={<Repay />} />
        <Route path="/about" element={<About />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </div>
  );
}
