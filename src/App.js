import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import Products from "./pages/products";
import Cart from "./pages/cart";
import Details from "./pages/details";
import Wishlist from "./pages/wishlist";
import Login from "./pages/login";
import Register from "./pages/register";
import ForgotPassword from "./pages/forgot";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {

  // 📱 PRODUCTS DATA
  const products = [
    { id: 1, name: "iPhone 14", oldPrice: 90000, price: 80000, image: "https://m.media-amazon.com/images/I/61bK6PMOC3L._SX679_.jpg" },
    { id: 2, name: "Samsung Galaxy S23", oldPrice: 85000, price: 75000, image: "https://m.media-amazon.com/images/I/61RZDb2mQxL._SX679_.jpg" },
    { id: 3, name: "OnePlus 11", oldPrice: 70000, price: 60000, image: "https://m.media-amazon.com/images/I/61amb0CfMGL._SX679_.jpg" },
    { id: 4, name: "iPhone 13", oldPrice: 75000, price: 65000, image: "https://m.media-amazon.com/images/I/61VuVU94RnL._SX679_.jpg" },
    { id: 5, name: "Samsung Galaxy A54", oldPrice: 45000, price: 35000, image: "https://m.media-amazon.com/images/I/71V--WZVUIL._SX679_.jpg" },
    { id: 6, name: "OnePlus Nord CE 3", oldPrice: 35000, price: 28000, image: "https://m.media-amazon.com/images/I/61QRgOgBx0L._SX679_.jpg" },
    { id: 7, name: "Redmi Note 12 Pro", oldPrice: 30000, price: 25000, image: "https://m.media-amazon.com/images/I/81ZSn2rk9WL._SX679_.jpg" },
    { id: 8, name: "Realme Narzo 60", oldPrice: 25000, price: 18000, image: "https://m.media-amazon.com/images/I/81WPIz1l5wL._SX679_.jpg" },
    { id: 9, name: "Vivo V27", oldPrice: 40000, price: 32000, image: "/images/vivo.jpg" },
    { id: 10, name: "Oppo Reno 10", oldPrice: 45000, price: 38000, image: "/images/opporeno.jpg" },
    { id: 11, name: "Google Pixel 7", oldPrice: 80000, price: 70000, image: "https://m.media-amazon.com/images/I/71niXI3lxlL._SX679_.jpg" },
    { id: 12, name: "iQOO Neo 7", oldPrice: 35000, price: 30000, image: "https://m.media-amazon.com/images/I/61JS7lF2aqL._SX679_.jpg" }
  ];

  // 🔥 STATES
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState(null);

  // 🔐 AUTO LOGIN
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("loggedUser"));
    if (savedUser) setUser(savedUser);
  }, []);

  // 🌙 DARK MODE APPLY
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  // 📦 LOAD USER DATA
  useEffect(() => {
    if (user) {
      const userCart = JSON.parse(localStorage.getItem(`cart_${user.email}`)) || [];
      const userWishlist = JSON.parse(localStorage.getItem(`wishlist_${user.email}`)) || [];

      setCart(userCart);
      setWishlist(userWishlist);
    }
  }, [user]);

  // 🔒 PROTECTED ROUTE
  const ProtectedRoute = ({ children }) => {
    return user ? children : <Navigate to="/login" />;
  };

  // 🛒 CART STORAGE HELPER
  const updateCartStorage = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem(`cart_${user.email}`, JSON.stringify(updatedCart));
  };

  // ❤️ WISHLIST STORAGE HELPER
  const updateWishlistStorage = (updated) => {
    setWishlist(updated);
    localStorage.setItem(`wishlist_${user.email}`, JSON.stringify(updated));
  };

  // 🛒 ADD TO CART
  const addToCart = (product) => {
    let updatedCart;

    const exist = cart.find(i => i.id === product.id);

    if (exist) {
      updatedCart = cart.map(i =>
        i.id === product.id ? { ...i, qty: i.qty + 1 } : i
      );
    } else {
      updatedCart = [...cart, { ...product, qty: 1 }];
    }

    updateCartStorage(updatedCart);

    setToast("Item added to cart 🛒");
    setTimeout(() => setToast(""), 2000);
  };

  const removeFromCart = (id) => {
    const updated = cart.filter(i => i.id !== id);
    updateCartStorage(updated);
  };

  const clearCart = () => updateCartStorage([]);

  const increaseQty = (id) => {
    const updated = cart.map(item =>
      item.id === id ? { ...item, qty: item.qty + 1 } : item
    );
    updateCartStorage(updated);
  };

  const decreaseQty = (id) => {
    const updated = cart
      .map(item =>
        item.id === id ? { ...item, qty: item.qty - 1 } : item
      )
      .filter(item => item.qty > 0);

    updateCartStorage(updated);
  };

  // ❤️ WISHLIST
  const addToWishlist = (product) => {
    let updated;

    const exist = wishlist.find(i => i.id === product.id);

    if (exist) {
      updated = wishlist.filter(i => i.id !== product.id);
    } else {
      updated = [...wishlist, product];
    }

    updateWishlistStorage(updated);
  };

  const removeFromWishlist = (id) => {
    const updated = wishlist.filter(i => i.id !== id);
    updateWishlistStorage(updated);
  };

  // 🔍 SEARCH FILTER
  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <BrowserRouter>

      <Navbar
        setSearch={setSearch}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        user={user}
        setUser={setUser}
      />

      <Routes>

        <Route path="/" element={<Home user={user} darkMode={darkMode} />} />

        <Route path="/products" element={
          <ProtectedRoute>
            <Products
              products={filtered}
              addToCart={addToCart}
              addToWishlist={addToWishlist}
              wishlist={wishlist}
              darkMode={darkMode}
            />
          </ProtectedRoute>
        } />

        <Route path="/cart" element={
          <ProtectedRoute>
            <Cart
              cart={cart}
              removeFromCart={removeFromCart}
              clearCart={clearCart}
              search={search}
              increaseQty={increaseQty}
              decreaseQty={decreaseQty}
              darkMode={darkMode}
            />
          </ProtectedRoute>
        } />

        <Route path="/wishlist" element={
          <ProtectedRoute>
            <Wishlist
              wishlist={wishlist}
              removeFromWishlist={removeFromWishlist}
              search={search}
              darkMode={darkMode}
            />
          </ProtectedRoute>
        } />

        <Route path="/details/:id" element={
          <ProtectedRoute>
            <Details
              products={products}
              addToCart={addToCart}
              darkMode={darkMode}
            />
          </ProtectedRoute>
        } />

        <Route path="/login" element={<Login setUser={setUser} darkMode={darkMode} />} />
        <Route path="/register" element={<Register darkMode={darkMode} />} />
        <Route path="/forgot" element={<ForgotPassword />} />

      </Routes>

      {toast && <div className="toast-box">{toast}</div>}

    </BrowserRouter>
  );
}

export default App;