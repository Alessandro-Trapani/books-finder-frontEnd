import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import BookSection from "./components/BookSection";
import Book from "./pages/Book";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./style.css";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({});

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar setSearchQuery={setSearchQuery} setFilters={setFilters} />
              <BookSection searchQuery={searchQuery} filters={filters} />
            </>
          }
        />

        <Route path="/book/:id" element={<Book />} />
      </Routes>
    </Router>
  );
}

export default App;
