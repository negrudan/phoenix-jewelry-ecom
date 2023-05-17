import React, { useContext } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { Link } from "react-router-dom";
import { Store } from "../Store";

export default function Navbar() {
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
    <React.Fragment>
      {/* bg-black bg-gradient */}
      <ToastContainer position="bottom-center" limit={1} />
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to={`/`}>
            <img
              src={require("../images/logo/phoenix5.png")}
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
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  EARRINGS
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  LINK
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled">DISABLED</a>
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
                      <Link className="dropdown-item" to={`/orderhistory`}>
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
    </React.Fragment>
  );
}
