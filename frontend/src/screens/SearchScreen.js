import React, { useEffect, useReducer, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { getError } from "../utils";
import { Helmet } from "react-helmet-async";
import Rating from "../components/Rating";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Product from "../components/Product";
import Navbar from "../components/Navbar";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
        countProducts: action.payload.countProducts,
        loading: false,
      };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

const prices = [
  {
    name: "$99 to $499",
    value: "99-499",
  },
  {
    name: "$500 to $1999",
    value: "500-1999",
  },
  {
    name: "$2000 to $10000",
    value: "2000-10000",
  },
];

export const ratings = [
  {
    name: "4stars & up",
    rating: 4,
  },

  {
    name: "3stars & up",
    rating: 3,
  },

  {
    name: "2stars & up",
    rating: 2,
  },

  {
    name: "1stars & up",
    rating: 1,
  },
];

export default function SearchScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search); // /search?category=Shirts
  const category = sp.get("category") || "all";
  const query = sp.get("query") || "all";
  const price = sp.get("price") || "all";
  const rating = sp.get("rating") || "all";
  const order = sp.get("order") || "newest";
  const page = sp.get("page") || 1;

  const [{ loading, error, products, pages, countProducts }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: "",
    });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `/api/products/search?page=${page}&query=${query}&category=${category}&price=${price}&rating=${rating}&order=${order}`
        );
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({
          type: "FETCH_FAIL",
          payload: getError(error),
        });
      }
    };
    fetchData();
  }, [category, error, order, page, price, query, rating]);

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/products/categories`);
        setCategories(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchCategories();
  }, [dispatch]);

  const getFilterUrl = (filter) => {
    const filterPage = filter.page || page;
    const filterCategory = filter.category || category;
    const filterQuery = filter.query || query;
    const filterRating = filter.rating || rating;
    const filterPrice = filter.price || price;
    const sortOrder = filter.order || order;
    return `/search?category=${filterCategory}&query=${filterQuery}&price=${filterPrice}&rating=${filterRating}&order=${sortOrder}&page=${filterPage}`;
  };
  return (
    <div>
      <Navbar />
      <div className="container mt-3">
        <Helmet>
          <title>Search Products</title>
        </Helmet>
        <div className="row">
          <div className="col-md-3">
            <h3 className="sort-title">Category</h3>
            <div>
              <ul className="rm-bulletpoints">
                <li className="sort-list">
                  <Link
                    className={
                      "all" === category
                        ? "text-bold product-link"
                        : "product-link"
                    }
                    to={getFilterUrl({ category: "all" })}
                  >
                    All
                  </Link>
                </li>
                {categories.map((c) => (
                  <li className="sort-list" key={c}>
                    <Link
                      className={
                        c === category
                          ? "text-bold product-link"
                          : " product-link"
                      }
                      to={getFilterUrl({ category: c })}
                    >
                      {c.charAt(0).toUpperCase() + c.slice(1)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="sort-title">Price</h3>
              <ul className="rm-bulletpoints">
                <li className="sort-list">
                  <Link
                    className={
                      "all" === price
                        ? "text-bold product-link"
                        : "product-link"
                    }
                    to={getFilterUrl({ price: "all" })}
                  >
                    All
                  </Link>
                </li>
                {prices.map((p) => (
                  <li className="sort-list" key={p.value}>
                    <Link
                      to={getFilterUrl({ price: p.value })}
                      className={
                        p.value === price
                          ? "text-bold product-link"
                          : "product-link"
                      }
                    >
                      {p.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="sort-title">Avg. Customer Review</h3>
              <ul className="rm-bulletpoints">
                {ratings.map((r) => (
                  <li className="sort-list" key={r.name}>
                    <Link
                      to={getFilterUrl({ rating: r.rating })}
                      className={
                        `${r.rating}` === `${rating}`
                          ? "text-bold product-link"
                          : "product-link"
                      }
                    >
                      <Rating caption={" & up"} rating={r.rating}></Rating>
                    </Link>
                  </li>
                ))}
                <li className="sort-list">
                  <Link
                    to={getFilterUrl({ rating: "all" })}
                    className={
                      rating === "all"
                        ? "text-bold product-link"
                        : "product-link"
                    }
                  >
                    <Rating caption={" & up"} rating={0}></Rating>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-9">
            {loading ? (
              <LoadingBox></LoadingBox>
            ) : error ? (
              <MessageBox variant="danger">{error}</MessageBox>
            ) : (
              <>
                <div className="row justify-content-between mb-3">
                  <div className="col-md-6">
                    <div>
                      {countProducts === 0 ? "No" : countProducts} Results
                      {query !== "all" && " : " + query}
                      {category !== "all" && " : " + category}
                      {price !== "all" && " : Price " + price}
                      {rating !== "all" && " : Rating " + rating + " & up"}
                      {query !== "all" ||
                      category !== "all" ||
                      rating !== "all" ||
                      price !== "all" ? (
                        <button
                          className="btn btn-light"
                          onClick={() => navigate("/search")}
                        >
                          <i className="fas fa-times-circle"></i>
                        </button>
                      ) : null}
                    </div>
                  </div>
                  <div className="col text-end">
                    Sort by{" "}
                    <select
                      value={order}
                      className="sortby"
                      onChange={(e) => {
                        navigate(getFilterUrl({ order: e.target.value }));
                      }}
                    >
                      <option value="newest">Newest Arrivals</option>
                      <option value="lowest">Price: Low to High</option>
                      <option value="highest">Price: High to Low</option>
                      <option value="toprated">Avg. Customer Reviews</option>
                    </select>
                  </div>
                </div>
                {products.length === 0 && (
                  <MessageBox>No Product Found</MessageBox>
                )}

                <div className="row">
                  {products.map((product) => (
                    <div
                      className="col-mb-3 col-sm-6 col-lg-4"
                      key={product._id}
                    >
                      <Product product={product}></Product>
                    </div>
                  ))}
                </div>

                <div>
                  {[...Array(pages).keys()].map((x) => (
                    <Link
                      key={x + 1}
                      className="mx-1"
                      to={getFilterUrl({ page: x + 1 })}
                    >
                      <button
                        className={
                          Number(page) === x + 1
                            ? "text-bold btn btn-light"
                            : "btn"
                        }
                      >
                        {x + 1}
                      </button>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
