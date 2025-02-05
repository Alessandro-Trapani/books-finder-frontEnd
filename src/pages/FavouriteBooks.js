import coverNotFound from "../assets/coverNotFound.jpg";
import React, { useEffect, useState } from "react";
import getFavouriteBooks from "../apis/getFavoureiteBooks";
import { useAuth } from "../hooks/AuthContext";
import getBook from "../apis/getBook";
import emptyStar from "../assets/star.png";
import fullStar from "../assets/starFull.png";
import { useNavigate } from "react-router-dom";
import addFavouriteBook from "../apis/addFavouriteBook";
import removeFromFavourite from "../apis/removeFromFavourite";

export default function FavouriteBooks() {
  const { jwt } = useAuth();
  const [favouriteBooks, setFavouriteBooks] = useState([]);
  const [fetchedBooks, setFetchedBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchFavouriteBooks() {
      try {
        const response = await getFavouriteBooks(jwt);
        console.log("Fetched Favourite Books:", response);

        const books = Array.isArray(response.books) ? response.books : [];
        setFavouriteBooks(books);

        const bookDetailsPromises = books.map((bookId) => getBook(bookId));
        const fetchedBooks = await Promise.all(bookDetailsPromises);
        setFetchedBooks(fetchedBooks);
      } catch (error) {
        console.error("Error fetching favourite books:", error);
      }
    }

    if (jwt) {
      fetchFavouriteBooks();
    }
  }, [jwt]);

  function includes(array, value) {
    return array.includes(value);
  }

  const handleCardClick = (bookId) => {
    navigate(`/book/${bookId}`, { state: { bookId } });
  };

  return (
    <div>
      <div className=" text-center mt-4">
        {}
        <div className="mb-4">
          <button
            onClick={() => navigate(-1)}
            className="btn btn-outline-secondary"
          >
            &#8592; Back
          </button>
        </div>

        {}
        <h2 className="text-light mb-4">My Favourite Books</h2>

        <div>
          <ul className="books-list">
            {fetchedBooks.length === 0 ? (
              <div>No favourite books found.</div>
            ) : (
              fetchedBooks.map((book) => (
                <div
                  key={book.id}
                  className="card"
                  onClick={() => handleCardClick(book.id)}
                >
                  <img
                    src={book.volumeInfo.imageLinks?.thumbnail || coverNotFound}
                    className="card-img"
                    alt={book.volumeInfo.title || "Book cover"}
                  />
                  <strong className="text-light bookTitle">
                    {book.volumeInfo.title.length > 50
                      ? book.volumeInfo.title.substring(0, 50) + "..."
                      : book.volumeInfo.title}
                  </strong>
                  <div>
                    <img
                      onClick={(e) => {
                        e.stopPropagation();
                        if (includes(favouriteBooks, book.id)) {
                          removeFromFavourite(book.id);
                          setFavouriteBooks(
                            favouriteBooks.filter((id) => id !== book.id)
                          );
                        } else {
                          setFavouriteBooks([...favouriteBooks, book.id]);
                          addFavouriteBook(book.id);
                        }
                      }}
                      className="starIcon"
                      src={
                        includes(favouriteBooks, book.id) ? fullStar : emptyStar
                      }
                      alt="Favourite"
                    />
                  </div>
                </div>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
