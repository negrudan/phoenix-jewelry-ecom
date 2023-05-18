import { useEffect, useReducer } from "react";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import Product from "../components/Product";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Navbar from "../components/Navbar";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, products: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function HomeScreen() {
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    products: [],
    loading: true,
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get("/api/products");
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <img
        className="poster mb-4"
        src={require("../images/products/posterimg.jpg")}
        alt="hero"
      />
      <div className="container-fluid">
        {/* <div className="shop">
        <div className="shop-gradient">
          <h1 className="shop-title">Category</h1>
        </div>
        <img
          className="woman"
          src={require("../images/products/posterimg.jpg")}
          alt="hero"
        />
      </div> */}
        <div className="main">
          <Helmet>
            <title>Phoenix Jewelry</title>
          </Helmet>

          <h1>Featured Products</h1>
          <div className="featured-products" id="all-featured-products">
            {loading ? (
              <LoadingBox />
            ) : error ? (
              <MessageBox variant="alert alert-danger">{error}</MessageBox>
            ) : (
              <div className="row">
                {products.map((product) => (
                  <div
                    key={product.slug}
                    className="col-6 col-sm-6 col-md-4 col-lg-3 mb-3"
                  >
                    <Product product={product} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
