import { useContext } from "react";
import { Store } from "../Store";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import MessageBox from "../components/MessageBox";
import axios from "axios";

export default function CartScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const updateCartHandler = async (item, quantity) => {
    const { data } = await axios.get(`api/products/${item._id}`);

    if (data.countInStock < quantity) {
      window.alert(
        "We apologize, the product you've requested is out of stock."
      );
      return;
    }

    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });
  };

  const removeItemHandler = (item) => {
    ctxDispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };

  const checkoutHandler = () => {
    navigate("/signin?redirect=/shipping");
  };

  return (
    <div>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <h1>Shopping Cart</h1>
      <div className="row">
        <div className="col-md-8">
          {cartItems.length === 0 ? (
            <MessageBox>
              Cart is empty. <Link to={`/`}>Go Shopping!</Link>
            </MessageBox>
          ) : (
            <ul className="list-group">
              {cartItems.map((item) => (
                <li key={item._id} className="list-group-item">
                  <div className="row align-items-center">
                    <div className="col-md-4">
                      <img
                        src={require(`../images/products${item.image}`)}
                        alt={item.name}
                        className="img-fluid rounded img-thumbnail"
                      />{" "}
                      <Link
                        to={`/product/${item.slug}`}
                        className="product-link"
                      >
                        {item.name}
                      </Link>
                    </div>
                    <div className="col-md-3">
                      <button
                        className="btn btn-light"
                        onClick={() =>
                          updateCartHandler(item, item.quantity - 1)
                        }
                        disabled={item.quantity === 1}
                      >
                        <i className="fas fa-minus-circle"></i>
                      </button>{" "}
                      <span>{item.quantity}</span>{" "}
                      <button
                        className="btn btn-light"
                        onClick={() =>
                          updateCartHandler(item, item.quantity + 1)
                        }
                        disabled={item.quantity === item.countInStock}
                      >
                        <i className="fas fa-plus-circle"></i>
                      </button>
                    </div>
                    <div className="col-md-3">${item.price}</div>
                    <div className="col-md-2">
                      <button
                        onClick={() => removeItemHandler(item)}
                        className="btn btn-light"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <h3>
                    Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{" "}
                    items) : $
                    {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                  </h3>
                </li>
                <li className="list-group-item">
                  <div className="d-grid">
                    <button
                      className="btn btn-primary"
                      type="button"
                      onClick={checkoutHandler}
                      disabled={cartItems.length === 0}
                    >
                      Proceed to Checkout
                    </button>
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
