import { useSelector } from 'react-redux';
import { selectCart } from './redux/productsSlice';
import { selectUser } from './redux/authSlice';

import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';

import Header from './components/Header';
import Cart from './pages/Cart';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import Auth from './pages/Auth';
import OrderConfirmation from './pages/OrderConfirmation';
import AdminDashboard from './pages/AdminDashboard';

const App = () => {
  const cart = useSelector(selectCart);

  const user = useSelector(selectUser);

  return (
    <Router>
      <main className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:id" element={<ProductPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/auth" element={!user ? <Auth /> : <Navigate to="/" />} />
          <Route path="/orderconfirmation" element={cart ? <OrderConfirmation /> : <Navigate to="/" />} />
          <Route path="/dashboard" element={user ? <AdminDashboard /> : <Navigate to="/" />} />
        </Routes>
      </main>
    </Router>
  )
}

export default App;