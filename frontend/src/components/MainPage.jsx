import React from "react";
import data from "../data";

export default function MainPage() {
  return (
    <div className="main">
      <h1>Featured Products</h1>
      <div className="featured-products">
        {data.products.map((product) => (
          <div className="product" key={product.slug}>
            <a href={`/product/${product.slug}`}>
              <img
                src={require(`../images/products${product.image}`)}
                alt={product.name}
              />
            </a>
            <div className="product-info">
              <a href={`/product/${product.slug}`}>
                <p>{product.name}</p>
              </a>
              <p>${product.price}</p>
              <button>Add to cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
