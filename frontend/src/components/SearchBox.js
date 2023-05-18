import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBox() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    navigate(query ? `/search/?query=${query}` : "/search");
    e.target.reset();
  };

  return (
    <form className="d-flex" role="search" onSubmit={submitHandler}>
      <input
        type="text"
        name="q"
        id="q"
        className="form-control me-2"
        onChange={(e) => setQuery(e.target.value)}
        placeholder="search products..."
        aria-label="Search Products"
        aria-describedby="button-search"
      />
      <button
        className="btn btn-outline-success"
        type="submit"
        id="button-search"
      >
        <SearchIcon />
      </button>
    </form>
  );
}
