import React, { useEffect, useRef, useCallback, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import getBooks from "../apis/getBooks";
import emptyStar from "../assets/star.png";
import fullStar from "../assets/starFull.png";
import coverNotFound from "../assets/coverNotFound.jpg";
import addFavouriteBook from "../apis/addFavouriteBook";
import removeFromFavourite from "../apis/removeFromFavourite";
import { useNavigate } from "react-router-dom";
import getFavouriteBook from "../apis/getFavoureiteBooks";

export default function BookSection({ searchQuery, filters }) {
  const [favouriteBooks, setFavouriteBooks] = useState([]);

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["books", searchQuery, filters],
    queryFn: ({ pageParam = 0 }) =>
      getBooks(
        searchQuery,
        filters.genres,
        filters.bookType,
        filters.language,
        "relevance",
        pageParam
      ),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage?.nextPageToken || undefined;
    },
    enabled: !!searchQuery,
  });

  function includes(array, value) {
    return array.includes(value);
  }

  useEffect(() => {
    async function fetchFavouriteBooks() {
      try {
        const books = await getFavouriteBook();
        setFavouriteBooks(books.books || []);
      } catch (error) {
        console.error("Error fetching favourite books:", error);
      }
    }
    fetchFavouriteBooks();
  }, []);

  const navigate = useNavigate();

  const handleCardClick = (bookId) => {
    navigate(`/book/${bookId}`, { state: { bookId } });
  };

  const observer = useRef();
  const lastBookRef = useCallback(
    (node) => {
      if (isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage]
  );

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (isError) {
    return <div className="text-danger infoText">Error: {error.message}</div>;
  }

  if (searchQuery === "") {
    return <div className="infoText text-light ">Search for books</div>;
  }

  if (!data || !Array.isArray(data.pages) || data.pages[0].items === null) {
    return <div className="text-light infoText">No books found</div>;
  }

  return (
    <div>
      <ul className="books-list">
        {data.pages.map((page, pageIndex) => {
          if (!Array.isArray(page.items) || page.items.length === 0) {
            return <div className="text-light infoText">No books found</div>;
          }

          return page.items.map((book, bookIndex) => {
            const isLastItem =
              pageIndex === data.pages.length - 1 &&
              bookIndex === page.items.length - 1;

            return (
              <div
                key={book.id}
                className="card"
                onClick={() => handleCardClick(book.id)}
                ref={isLastItem ? lastBookRef : null}
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
            );
          });
        })}
      </ul>
      {isFetchingNextPage && <div>Loading more...</div>}
    </div>
  );
}
