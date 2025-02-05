import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import BookSection from "./components/BookSection";
import Book from "./pages/Book";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { AuthProvider } from "./hooks/AuthContext";
import "./style.css";
import FavouriteBooks from "./pages/FavouriteBooks";

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
              <AuthProvider>
                <Navbar
                  setSearchQuery={setSearchQuery}
                  setFilters={setFilters}
                />
                <BookSection searchQuery={searchQuery} filters={filters} />
              </AuthProvider>
            </>
          }
        />

        <Route path="/book/:id" element={<Book />} />
        <Route
          path="/myBooks"
          element={
            <AuthProvider>
              <FavouriteBooks />
            </AuthProvider>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
