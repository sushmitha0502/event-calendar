// src/components/Search.js
import React from "react";

function Search({ query, setQuery }) {
  return (
    <input
      type="text"
      placeholder="Search events by title or description..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className="search-input"
    />
  );
}

export default Search;
