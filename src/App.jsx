import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Shop from './pages/Shop'; 
import { CartProvider } from "./context/CartContext.jsx";
import Navbar from "./components/Navbar.jsx";
import Cart  from "./pages/Cart.jsx";
import Customize from "./pages/Customize.jsx"

export default function App() {
  return (
    <CartProvider>
      <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shop/:gender" element={<Shop />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/Customize" element={<Customize />} />
    </Routes>
    </CartProvider>

  );
}
