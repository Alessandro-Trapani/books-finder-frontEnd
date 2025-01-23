import React, { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import BookSection from "./components/BookSection";
function App() {
  const [searchQuery, setSearchQuery] = useState(""); // To hold the search term
  const [filters, setFilters] = useState({}); // To hold filter options

  return (
    <div>
      <Navbar setSearchQuery={setSearchQuery} setFilters={setFilters} />
      <BookSection searchQuery={searchQuery} filters={filters} />
    </div>
  );
}
export default App;
