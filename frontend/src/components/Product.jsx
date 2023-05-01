import React from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";

export default function Product(props) {
  const { product } = props;

  return (
    <div className="card">
      <Link to={`/${product.category}/${product.slug}`}>
        <img
          src={require(`../images/products${product.image}`)}
          className="card-img-top"
          alt={product.name}
        />
      </Link>
      <div className="card-body">
        <Link to={`/${product.category}/${product.slug}`}>
          <p className="card-title">{product.name}</p>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <p className="card-text">${product.price}</p>
        <button className="btn btn-primary">Add to cart</button>
      </div>
    </div>
  );
}
