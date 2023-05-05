import axios from "axios";
import React, { useContext, useEffect, useReducer } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { Store } from "../Store";
import { getError } from "../utils";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, order: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
}
export default function OrderScreen() {
  const { state } = useContext(Store);
  const { userInfo } = state;

  const params = useParams();
  const { id: orderId } = params;
  const navigate = useNavigate();

  const [{ loading, error, order }, dispatch] = useReducer(reducer, {
    loading: true,
    order: {},
    error: "",
  });

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/orders/${orderId}`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };

    if (!userInfo) {
      return navigate("/signin");
    }
    if (!order._id || (order._id && order._id !== orderId)) {
      fetchOrder();
    }
  }, [order, userInfo, orderId, navigate]);
  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="alert alert-danger">{error}</MessageBox>
  ) : (
    <div>
      <Helmet>
        <title>Order {orderId}</title>
      </Helmet>
      <h1 className="my-3">Order {orderId}</h1>
      <div className="row">
        <div className="col" md={8}>
          <div className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">Shipping</h5>
              <p className="card-text">
                <strong>Name:</strong> {order.shippingAddress.fullName} <br />
                <strong>Address: </strong> {order.shippingAddress.address},
                {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                ,{order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <MessageBox variant="alert alert-success">
                  Delivered at {order.deliveredAt}
                </MessageBox>
              ) : (
                <MessageBox variant="alert alert-danger">
                  Not Delivered
                </MessageBox>
              )}
            </div>
          </div>
          <div className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">Payment</h5>
              <p className="card-text">
                <strong>Method:</strong> {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <MessageBox variant="alert alert-success">
                  Paid at {order.paidAt}
                </MessageBox>
              ) : (
                <MessageBox variant="alert alert-danger">Not Paid</MessageBox>
              )}
            </div>
          </div>

          <div className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">Items</h5>
              <ul className="list-group list-group-flush">
                {order.orderItems.map((item) => (
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
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">Order Summary</h5>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <div className="row">
                    <div className="col">Items</div>
                    <div className="col">${order.itemsPrice.toFixed(2)}</div>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="row">
                    <div className="col">Shipping</div>
                    <div className="col">${order.shippingPrice.toFixed(2)}</div>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="row">
                    <div className="col">Tax</div>
                    <div className="col">${order.taxPrice.toFixed(2)}</div>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="row">
                    <div className="col">
                      <strong> Order Total</strong>
                    </div>
                    <div className="col">
                      <strong>${order.totalPrice.toFixed(2)}</strong>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
