import React, { useContext } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { Link } from "react-router-dom";
import { Store } from "./Store";
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
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
    window.location.href = "/signin";
  };

  return (
    <>
      <React.Fragment>
        <BrowserRouter>
          <div className="d-flex flex-column site-wrapper">
            {/* bg-black bg-gradient */}
            <ToastContainer position="bottom-center" limit={1} />
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
              <div className="container-fluid">
                <Link className="navbar-brand" to={`/`}>
                  <img
                    src={require("./images/logo/phoenix5.png")}
                    alt="phoenix jewelry logo"
                    className="d-inline-block align-text-to logo-image"
                  />
                </Link>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                      <Link
                        className="nav-link active"
                        aria-current="page"
                        to={"/"}
                      >
                        EARRINGS
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to={"/"}>
                        LINK
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link disabled">DISABLED</Link>
                    </li>
                  </ul>
                  <form className="d-flex" role="search">
                    <input
                      className="form-control me-2"
                      type="search"
                      placeholder="Search"
                      aria-label="Search"
                    />
                    <button className="btn btn-outline-success" type="submit">
                      <SearchIcon />
                    </button>
                  </form>
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    {userInfo ? (
                      <li className="nav-item dropdown">
                        <Link
                          className="nav-link dropdown-toggle"
                          id="basic-nav-dropdown"
                          href="#"
                          role="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          {userInfo.name}
                        </Link>
                        <ul className="dropdown-menu">
                          <li>
                            <Link className="dropdown-item" to={`/profile`}>
                              User Profile
                            </Link>
                          </li>
                          <li>
                            <Link
                              className="dropdown-item"
                              to={`/orderhistory`}
                            >
                              Order History
                            </Link>
                          </li>
                          <li>
                            <hr className="dropdown-divider" />
                          </li>
                          <li>
                            <Link
                              className="dropdown-item"
                              to={`#signout`}
                              onClick={signoutHandler}
                            >
                              Sign Out
                            </Link>
                          </li>
                        </ul>
                      </li>
                    ) : (
                      <Link className="nav-link" to={`/signin`}>
                        Sign In
                      </Link>
                    )}
                    <li className="nav-item">
                      <Link
                        className="nav-link active position-relative cart-responsive"
                        aria-current="page"
                        to={`/cart`}
                      >
                        <ShoppingBagOutlinedIcon fontSize="large" />
                        {cart.cartItems.length > 0 && (
                          <span className="price-indicator">
                            {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                          </span>
                        )}
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>

            <main>
              <div className="container mt-3">
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
              </div>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </React.Fragment>
    </>
  );
}
