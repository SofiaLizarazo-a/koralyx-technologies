import { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AIChat from './components/AIChat';
import Home from './pages/Home';
import Checkout from './pages/Checkout';
import Admin from './pages/Admin';
import { CartContext } from './context/CartContext';

// Lleva a la sección (#servicios, #pqr...) incluso viniendo de otra página
function ScrollToHash() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) setTimeout(() => document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' }), 60);
    else window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

function Toast() {
  const { toast } = useContext(CartContext);
  return toast ? <div className="toast" role="status">{toast}</div> : null;
}

export default function App() {
  return (
    <Router>
      <ScrollToHash />
      <Navbar />
      <main style={{ minHeight: '80vh' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
      <AIChat />
      <Toast />
      <Footer />
    </Router>
  );
}
