import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import axios from "axios";
import { Store } from "../Store";

export default function Product(props) {
  const { product } = props;
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
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

  return (
    <div className="card text-center">
      <Link to={`/product/${product.slug}`}>
        <img
          src={require(`../images/products${product.image}`)}
          className="card-img-top"
          alt={product.name}
        />
      </Link>
      <div className="card-body">
        <Link to={`/product/${product.slug}`} className="product-link">
          <p className="card-title">{product.name}</p>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <p className="card-text">${product.price}</p>
        {product.countInStock === 0 ? (
          <button disabled className="btn btn-light">
            Out of stock
          </button>
        ) : (
          <button
            onClick={() => addToCartHandler(product)}
            className="btn btn-primary btn-large"
          >
            Add to cart
          </button>
        )}
      </div>
    </div>
  );
}
