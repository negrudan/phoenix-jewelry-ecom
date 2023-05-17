import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import { Store } from "../Store";
import Navbar from "../components/Navbar";

export default function PaymentMethodScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { shippingAddress, paymentMethod },
  } = state;

  const [paymentMethodName, setPaymentMethod] = useState(
    paymentMethod || "PayPal"
  );

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);
  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({ type: "SAVE_PAYMENT_METHOD", payload: paymentMethodName });
    localStorage.setItem("paymentMethod", paymentMethodName);
    navigate("/placeorder");
  };
  return (
    <div>
      <Navbar />
      <div className="container mt-3">
        <CheckoutSteps step1 step2 step3></CheckoutSteps>
        <div className="container small-container">
          <Helmet>
            <title>Payment Method</title>
          </Helmet>
          <h1 className="my-3">Payment Method</h1>
          <form onSubmit={submitHandler}>
            <div className="mb-3 form-check">
              <input
                type="radio"
                className="form-check-input"
                id="PayPal"
                label="PayPal"
                value="PayPal"
                checked={paymentMethodName === "PayPal"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label class="form-check-label" htmlFor="PayPal">
                Paypal
              </label>
            </div>
            {/* <div className="mb-3 form-check">
            <input
              type="radio"
              className="form-check-input"
              id="Stripe"
              label="Stripe"
              value="Stripe"
              checked={paymentMethodName === "Stripe"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label class="form-check-label" htmlFor="Stripe">
              Stripe
            </label>
          </div> */}
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
