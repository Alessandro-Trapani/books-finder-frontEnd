import React, { useState, useEffect } from "react";

export default function Navbar({ setSearchQuery, setFilters }) {
  const [query, setQuery] = useState("");
  const [filtersVisible, setFiltersVisible] = useState(false); // Toggle visibility of filters
  const [selectedFilters, setSelectedFilters] = useState({
    genres: "",
    bookType: "",
    language: "",
  });

  // Handle search query changes
  const handleSearch = () => {
    setSearchQuery(query);
  };

  // Handle filter changes
  const handleFilterChange = (type, value) => {
    setSelectedFilters((prev) => {
      const updatedFilters = { ...prev, [type]: value };
      setFilters(updatedFilters); // Pass updated filters to parent
      return updatedFilters;
    });
  };

  // Trigger search when query or filters change
  useEffect(() => {
    setSearchQuery(query);
    setFilters(selectedFilters); // Update filters
  }, [query, selectedFilters, setSearchQuery, setFilters]);

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        <div className="container-fluid">
          <a className="navbar-brand text-white" href="#">
            Book Finder
          </a>
          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setFiltersVisible(!filtersVisible)} // Toggle filters visibility
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <input
            className="searchBar form-control me-2"
            type="search"
            placeholder="Search books"
            aria-label="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)} // Update search query
          />
          <button
            className="searchButton btn btn-outline-light"
            type="submit"
            onClick={handleSearch}
          >
            Search
          </button>

          <button
            className="btn btn-outline-light ms-3" // Filters button
            onClick={() => setFiltersVisible(!filtersVisible)} // Toggle filters visibility
          >
            {filtersVisible ? "Hide Filters" : "Show Filters"}
          </button>
        </div>
      </nav>

      {/* Filters Panel with Custom Transition */}
      <div className={`filter-panel ${filtersVisible ? "show" : ""}`}>
        <div className="bg-dark p-4">
          <h5 className="text-body-emphasis h4">Filters:</h5>
          <div className="filters-container">
            {/* Subject Filters */}
            <div>
              <h6 className="text-light">Subject</h6>
              <div className="row g-1 mb-3 gx-0">
                {[
                  "none",
                  "Computers",
                  "History",
                  "Fiction",
                  "Science",
                  "Art",
                  "Biography",
                  "Business",
                  "Children's Books",
                  "Classics",
                  "Comics",
                  "Cooking",
                  "Crime",
                  "Drama",
                  "Education",
                  "Fantasy",
                  "Health & Fitness",
                  "Horror",
                  "Humor",
                  "Law",
                  "Literature",
                  "Mathematics",
                  "Mystery",
                  "Philosophy",
                  "Poetry",
                  "Politics",
                  "Psychology",
                  "Religion",
                  "Romance",
                  "Science Fiction",
                  "Social Sciences",
                  "Sports",
                  "Technology",
                  "Travel",
                  "True Crime",
                  "Young Adult",
                ].map((subject, index) => (
                  <div className="col-sm-5 col-md-2" key={index}>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="subject"
                        id={`subject-${subject.toLowerCase()}`}
                        value={subject.toLowerCase()}
                        checked={
                          selectedFilters.genres === subject.toLowerCase()
                        } // Check if selected
                        onChange={(e) =>
                          handleFilterChange("genres", e.target.value)
                        }
                      />
                      <label
                        className="form-check-label text-light"
                        htmlFor={`subject-${subject.toLowerCase()}`}
                      >
                        {subject}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Book Type Filters */}
            <div>
              <h6 className="text-light">Book Type</h6>
              {[
                { id: "", label: "all" },
                { id: "free-ebooks", label: "Free Ebooks" },
                { id: "paid-ebooks", label: "Paid Ebooks" },
                { id: "full", label: "Full Ebooks" },
                { id: "ebooks", label: "Only Ebooks" },
              ].map((type) => (
                <div className="form-check" key={type.id}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="bookType"
                    id={type.id}
                    value={type.id}
                    checked={selectedFilters.bookType === type.id} // Check if selected
                    onChange={(e) =>
                      handleFilterChange("bookType", e.target.value)
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
              {[
                { id: "", label: "none" },
                { id: "en", label: "English" },
                { id: "es", label: "Spanish" },
                { id: "fr", label: "French" },
                { id: "it", label: "Italian" },
              ].map((type) => (
                <div className="form-check" key={type.id}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="language"
                    id={type.id}
                    value={type.id}
                    checked={selectedFilters.language === type.id} // Check if selected
                    onChange={(e) =>
                      handleFilterChange("language", e.target.value)
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
          </div>
        </div>
      </div>
    </div>
  );
}
