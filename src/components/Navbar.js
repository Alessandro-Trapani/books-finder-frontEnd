import React, { useState } from "react";

export default function Navbar({ setSearchQuery, setFilters }) {
  const [query, setQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    subject: "",
    bookType: "",
    language: [],
    order: "",
  });

  // Handle search query changes
  const handleSearch = () => {
    setSearchQuery(query); // Pass search query to parent
  };

  // Handle filter changes
  const handleFilterChange = (type, value, isCheckbox) => {
    setSelectedFilters((prev) => {
      const updatedFilters = { ...prev };
      if (isCheckbox) {
        // Handle checkboxes for multiple values (e.g., language)
        if (updatedFilters[type].includes(value)) {
          updatedFilters[type] = updatedFilters[type].filter(
            (v) => v !== value
          );
        } else {
          updatedFilters[type].push(value);
        }
      } else {
        updatedFilters[type] = value;
      }
      return updatedFilters;
    });

    // Pass filters to parent
    setFilters(selectedFilters);
  };

  return (
    <>
      <div
        className="collapse"
        id="navbarToggleExternalContent"
        data-bs-theme="dark"
      >
        <div className="bg-dark p-4">
          <h5 className="text-body-emphasis h4">Filters:</h5>
          <div className="filters-container">
            {/* Subject Filters */}
            <div>
              <h6 className="text-light">Subject</h6>
              {["Computers", "History", "Fiction", "Science", "Art"].map(
                (subject, index) => (
                  <div className="form-check" key={index}>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="subject"
                      id={`subject-${subject.toLowerCase()}`}
                      value={subject.toLowerCase()}
                      onChange={(e) =>
                        handleFilterChange("subject", e.target.value, false)
                      }
                    />
                    <label
                      className="form-check-label text-light"
                      htmlFor={`subject-${subject.toLowerCase()}`}
                    >
                      {subject}
                    </label>
                  </div>
                )
              )}
            </div>

            <div>
              <h6 className="text-light">Book Type</h6>
              {[
                { id: "free-ebooks", label: "Free Ebooks" },
                { id: "paid-ebooks", label: "paid Ebooks" },
                { id: "full", label: "full Ebooks" },
                { id: "ebooks", label: "only Ebooks" },
              ].map((type) => (
                <div className="form-check" key={type.id}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="bookType"
                    id={type.id}
                    value={type.id}
                    onChange={(e) =>
                      handleFilterChange("bookType", e.target.value, false)
                    }
                  />
                  <label
                    className="form-check-label text-light"
                    htmlFor={type.id}
                  >
                    {type.label}
                  </label>
                </div>
              ))}
            </div>

            {/* Language Filters */}
            <div>
              <h6 className="text-light">Language</h6>
              {["English", "French", "espaniol"].map((language, index) => (
                <div className="form-check" key={index}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="language"
                    id={`language-${language.toLowerCase().substring(0, 2)}`}
                    value={language.toLowerCase().substring(0, 2)}
                    onChange={(e) =>
                      handleFilterChange("language", e.target.value, true)
                    }
                  />
                  <label
                    className="form-check-label text-light"
                    htmlFor={`language-${language.toLowerCase()}`}
                  >
                    {language}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <nav className="navbar sticky-top navbar-dark bg-dark">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarToggleExternalContent"
            aria-controls="navbarToggleExternalContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <input
            className="searchBar form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            className="searchButton btn btn-outline-light"
            type="submit"
            onClick={handleSearch}
          >
            Search
          </button>
          <a className="navbar-brand text-white" href="#">
            Book Finder
          </a>
        </div>
      </nav>
    </>
  );
}
