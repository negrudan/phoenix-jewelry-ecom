import { Link } from "react-router-dom";
import data from "../data";

export default function HomeScreen() {
  return (
    <div>
      <div className="main">
        <h1>Featured Products</h1>
        <div className="featured-products">
          {data.products.map((product) => (
            <div className="product" key={product.slug}>
              <Link to={`/${product.category}/${product.slug}`}>
                <img
                  src={require(`../images/products${product.image}`)}
                  alt={product.name}
                />
              </Link>
              <div className="product-info">
                <Link to={`/product/${product.slug}`}>
                  <p>{product.name}</p>
                </Link>
                <p>${product.price}</p>
                <button>Add to cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
