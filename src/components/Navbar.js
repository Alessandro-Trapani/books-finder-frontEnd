import React, { useState, useEffect } from "react";
import searchIcon from "../assets/detective.png";
import LoginForm from "./LoginForm";

export default function Navbar({ setSearchQuery, setFilters }) {
  const [query, setQuery] = useState("");
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    genres: "",
    bookType: "",
    language: "",
  });

  const handleSearch = () => {
    setSearchQuery(query);
  };

  const handleFilterChange = (type, value) => {
    setSelectedFilters((prev) => {
      const updatedFilters = { ...prev, [type]: value };
      setFilters(updatedFilters);
      return updatedFilters;
    });
  };

  useEffect(() => {
    setSearchQuery(query);
    setFilters(selectedFilters);
  }, [query, selectedFilters, setSearchQuery, setFilters]);

  return (
    <div>
      {}
      <nav className="navbar sticky-top">
        <div className="container-fluid">
          <a className="navbar-brand text-white" href="#">
            Book Finder
          </a>

          <input
            className="searchBar form-control me-2"
            type="search"
            placeholder="Search books"
            aria-label="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <img
            className="detective"
            src={searchIcon}
            onClick={handleSearch}
          ></img>
          <button
            className="btn btn-outline-light filtersButton  ms-3 "
            onClick={() => setFiltersVisible(!filtersVisible)}
          >
            {filtersVisible ? "Hide Filters" : "Show Filters"}
          </button>
          <button
            class="navbar-toggler d-block"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div
            className="offcanvas offcanvas-end"
            tabIndex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                Login
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <LoginForm />
            </div>
          </div>
        </div>
      </nav>

      {}
      <div className={`filter-panel ${filtersVisible ? "show" : ""}`}>
        <div className="p-4">
          <h5 className=" h4">Filters:</h5>
          <div className="filters-container">
            {}
            <div>
              <h6 className="text-light">Subject</h6>
              <div className="subjectFilterContainer row g-1 mb-3 gx-0">
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
                  <div className=" col-5 col-sm-5 col-md-2" key={index}>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="subject"
                        id={`subject-${subject.toLowerCase()}`}
                        value={subject.toLowerCase()}
                        checked={
                          selectedFilters.genres === subject.toLowerCase()
                        }
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

            {}
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
                    checked={selectedFilters.bookType === type.id}
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

            {}
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
                    checked={selectedFilters.language === type.id}
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
