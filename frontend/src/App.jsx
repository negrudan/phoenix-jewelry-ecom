import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import Footer from "./components/Footer";
import CartScreen from "./screens/CartScreen";
import SigninScreen from "./screens/SigninScreen";
import SignupScreen from "./screens/SignupScreen";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import ProfileScreen from "./screens/ProfileScreen";

export default function App() {
  return (
    <>
      <React.Fragment>
        <BrowserRouter>
          <div className="d-flex flex-column site-wrapper">
            <main>
              <Routes>
                <Route path="/product/:slug" element={<ProductScreen />} />
                <Route path="/cart" element={<CartScreen />} />
                <Route path="/signin" element={<SigninScreen />} />
                <Route path="/signup" element={<SignupScreen />} />
                <Route path="/profile" element={<ProfileScreen />} />
                <Route path="/placeorder" element={<PlaceOrderScreen />} />
                <Route path="/order/:id" element={<OrderScreen />}></Route>
                <Route
                  path="/orderhistory"
                  element={<OrderHistoryScreen />}
                ></Route>
                <Route
                  path="/shipping"
                  element={<ShippingAddressScreen />}
                ></Route>
                <Route
                  path="/payment"
                  element={<PaymentMethodScreen />}
                ></Route>
                <Route path="/" element={<HomeScreen />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </React.Fragment>
    </>
  );
}
