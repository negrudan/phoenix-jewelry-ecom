import Axios from "axios";
import React, { useContext, useEffect, useReducer } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getError } from "../utils";
import { Store } from "../Store";
import CheckoutSteps from "../components/CheckoutSteps";
import LoadingBox from "../components/LoadingBox";

const reducer = (state, action) => {
  switch (action.type) {
    case "CREATE_REQUEST":
      return { ...state, loading: true };
    case "CREATE_SUCCESS":
      return { ...state, loading: false };
    case "CREATE_FAIL":
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default function PlaceOrderScreen() {
  const navigate = useNavigate();

  const [{ loading }, dispatch] = useReducer(reducer, {
    loading: false,
  });

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
  cart.itemsPrice = round2(
    cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? round2(0) : round2(10);
  cart.taxPrice = round2(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  const placeOrderHandler = async () => {
    try {
      dispatch({ type: "CREATE_REQUEST" });

      const { data } = await Axios.post(
        "/api/orders",
        {
          orderItems: cart.cartItems,
          shippingAddress: cart.shippingAddress,
          paymentMethod: cart.paymentMethod,
          itemsPrice: cart.itemsPrice,
          shippingPrice: cart.shippingPrice,
          taxPrice: cart.taxPrice,
          totalPrice: cart.totalPrice,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      ctxDispatch({ type: "CART_CLEAR" });
      dispatch({ type: "CREATE_SUCCESS" });
      localStorage.removeItem("cartItems");
      navigate(`/order/${data.order._id}`);
    } catch (err) {
      dispatch({ type: "CREATE_FAIL" });
      toast.error(getError(err));
    }
  };

  useEffect(() => {
    if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart, navigate]);

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <Helmet>
        <title>Preview Order</title>
      </Helmet>
      <h1 className="my-3">Preview Order</h1>
      <div className="row">
        <div className="col-md-8">
          <div className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">Shipping</h5>
              <p className="card-text">
                <strong>Name:</strong> {cart.shippingAddress.fullName} <br />
                <strong>Address: </strong> {cart.shippingAddress.address},
                {cart.shippingAddress.city}, {cart.shippingAddress.postalCode},
                {cart.shippingAddress.country}
              </p>
              <Link to={`/shipping`} className="link-style">
                Edit
              </Link>
            </div>
          </div>

          <div className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">Payment</h5>
              <p className="card-text">
                <strong>Method:</strong> {cart.paymentMethod}
              </p>
              <Link to={`/payment`} className="link-style">
                Edit
              </Link>
            </div>
          </div>

          <div className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">Items</h5>
              <ul className="list-group list-group-flush">
                {cart.cartItems.map((item) => (
                  <li className="list-group-item" key={item._id}>
                    <div className="row align-items-center">
                      <div className="col-md-6">
                        <img
                          src={require(`../images/products${item.image}`)}
                          alt={item.name}
                          className="img-fluid rounded img-thumbnail"
                        ></img>{" "}
                        <Link
                          to={`/product/${item.slug}`}
                          className="product-link"
                        >
                          {item.name}
                        </Link>
                      </div>
                      <div className="col-md-3">
                        <span>{item.quantity}</span>
                      </div>
                      <div className="col-md-3">${item.price}</div>
                    </div>
                  </li>
                ))}
              </ul>
              <Link to={`/cart`} className="link-style">
                Edit
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Order Summary</h5>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <div className="row">
                    <div className="col">Items</div>
                    <div className="col">${cart.itemsPrice.toFixed(2)}</div>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="row">
                    <div className="col">Shipping</div>
                    <div className="col">${cart.shippingPrice.toFixed(2)}</div>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="row">
                    <div className="col">Tax</div>
                    <div className="col">${cart.taxPrice.toFixed(2)}</div>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="row">
                    <div className="col">
                      <strong> Order Total</strong>
                    </div>
                    <div className="col">
                      <strong>${cart.totalPrice.toFixed(2)}</strong>
                    </div>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="d-grid">
                    <button
                      className="btn btn-primary"
                      type="button"
                      onClick={placeOrderHandler}
                      disabled={cart.cartItems.length === 0}
                    >
                      Place Order
                    </button>
                  </div>
                  {loading && <LoadingBox></LoadingBox>}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
