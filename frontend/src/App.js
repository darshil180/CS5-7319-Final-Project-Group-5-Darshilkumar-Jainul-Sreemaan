import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CartPage from "./pages/CartPage"; // Import CartPage
import DishDetail from "./pages/DishDetail"; // Import the new DishDetail page
import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute
import OrderPage from "./pages/OrderPage"; // Import OrderPage
import CheckoutPage from "./pages/CheckoutPage"; // Import CheckoutPage
import OrderConfirmationPage from "./pages/OrderConfirmationPage"; // Import OrderConfirmationPage

const App = () => {
  return (
    <Router>
      <Header />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dish/:id" element={<DishDetail />} />

        {/* Protected Cart Route */}
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          }
        />

        {/* Order Page Route */}
        <Route
          path="/order-summary"
          element={
            <ProtectedRoute>
              <OrderPage />
            </ProtectedRoute>
          }
        />

        {/* Checkout Page Route */}
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />

        {/* Order Confirmation Page Route */}
        <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
      </Routes>
    </Router>
  );
};

export default App;
