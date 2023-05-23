import { useEffect, useReducer } from "react";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import Product from "../components/Product";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

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
      <div className="poster-gradient">
        <h1 className="poster-title">
          Rise above the ordinary with{" "}
          <span className="poster-title-em">Phoenix Jewelry</span>
        </h1>
        <img
          className="poster mb-4"
          src={require("../images/products/posterimg.jpg")}
          alt="hero"
        />
      </div>
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

          <h1 className="mt-2">Featured Products</h1>
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

          <h1 className="mb-4">Shop by Category</h1>
          <div className="container featured-products">
            <div className="row center-categories">
              <div className="col-8 col-sm-6 col-md-4 col-lg-3 mb-3">
                <div className="item">
                  <Link to={`/search?category=earrings`}>
                    <div className="card text-bg-dark photo">
                      <img
                        src={require(`../images/thumbnails/earrings-category.jpg`)}
                        className="card-img"
                        alt="earrings category"
                      />
                      <div className="item-text">
                        <div className="item-text-wrap">
                          <p className="item-text-category">Phoenix</p>
                          <h2 className="item-text-tile">Earrings</h2>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>

              <div className="col-8 col-sm-6 col-md-4 col-lg-3 mb-3">
                <div className="item">
                  <Link to={`/search?category=necklaces`}>
                    <div className="card text-bg-dark photo">
                      <img
                        src={require(`../images/thumbnails/necklaces-category3.jpg`)}
                        className="card-img"
                        alt="necklaces category"
                      />
                      <div className="item-text">
                        <div className="item-text-wrap">
                          <p className="item-text-category">Phoenix</p>
                          <h2 className="item-text-tile">Necklaces</h2>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>

              <div className="col-8 col-sm-6 col-md-4 col-lg-3 mb-3">
                <div className="item">
                  <Link to={`/search?category=rings`}>
                    <div className="card text-bg-dark photo">
                      <img
                        src={require(`../images/thumbnails/rings-category.jpg`)}
                        className="card-img"
                        alt="rings category"
                      />
                      <div className="item-text">
                        <div className="item-text-wrap">
                          <p className="item-text-category">Phoenix</p>
                          <h2 className="item-text-tile">Rings</h2>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>

              <div className="col-8 col-sm-6 col-md-4 col-lg-3 mb-3">
                <div className="item">
                  <Link to={`/search?category=watches`}>
                    <div className="card text-bg-dark photo">
                      <img
                        src={require(`../images/thumbnails/watches-category5.jpg`)}
                        className="card-img"
                        alt="watches category"
                      />
                      <div className="item-text">
                        <div className="item-text-wrap">
                          <p className="item-text-category">Phoenix</p>
                          <h2 className="item-text-tile">Watches</h2>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
