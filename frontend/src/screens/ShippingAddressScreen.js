import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { Store } from "../Store";
import CheckoutSteps from "../components/CheckoutSteps";
import Navbar from "../components/Navbar";

export default function ShippingAddressScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    userInfo,
    cart: { shippingAddress },
  } = state;
  const [fullName, setFullName] = useState(shippingAddress.fullName || "");
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );
  useEffect(() => {
    if (!userInfo) {
      navigate("/signin?redirect=/shipping");
    }
  }, [userInfo, navigate]);
  const [country, setCountry] = useState(shippingAddress.country || "");
  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({
      type: "SAVE_SHIPPING_ADDRESS",
      payload: {
        fullName,
        address,
        city,
        postalCode,
        country,
      },
    });
    localStorage.setItem(
      "shippingAddress",
      JSON.stringify({
        fullName,
        address,
        city,
        postalCode,
        country,
      })
    );
    navigate("/payment");
  };
  return (
    <div>
      <Navbar />
      <div className="container mt-3">
        <Helmet>
          <title>Shipping Address</title>
        </Helmet>

        <CheckoutSteps step1 step2></CheckoutSteps>
        <div className="container small-container">
          <h1 className="my-3">Shipping Address</h1>
          <form onSubmit={submitHandler}>
            <div className="mb-3">
              <label htmlFor="fullName" className="form-label">
                Full Name
              </label>
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="form-control"
                id="fullName"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="form-control"
                id="address"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="city" className="form-label">
                City
              </label>
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="form-control"
                id="city"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="postalCode" className="form-label">
                Postal Code
              </label>
              <input
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                className="form-control"
                id="postalCode"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="country" className="form-label">
                Country
              </label>
              <input
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="form-control"
                id="country"
                required
              />
            </div>
            <div className="mb-3">
              <button type="submit" className="btn btn-primary">
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
