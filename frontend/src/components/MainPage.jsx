import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeScreen from "../screens/HomeScreen";
import ProductScreen from "../screens/ProductScreen";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CartScreen from "../screens/CartScreen";
import SigninScreen from "../screens/SigninScreen";
import SignupScreen from "../screens/SignupScreen";
import ShippingAddressScreen from "../screens/ShippingAddressScreen";
import PaymentMethodScreen from "../screens/PaymentMethodScreen";

export default function MainPage() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-wrapper">
        <Navbar />
        <main>
          <div className="container mt-3">
            <Routes>
              <Route path="/:category/:slug" element={<ProductScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/signin" element={<SigninScreen />} />
              <Route path="/signup" element={<SignupScreen />} />
              <Route
                path="/shipping"
                element={<ShippingAddressScreen />}
              ></Route>
              <Route path="/payment" element={<PaymentMethodScreen />}></Route>
              <Route path="/" element={<HomeScreen />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
