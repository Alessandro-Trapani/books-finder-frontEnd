import React, { useRef, useCallback } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import getBooks from "../apis/getBooks";
import coverNotFound from "../assets/coverNotFound.jpg";
import { Tooltip, OverlayTrigger } from "react-bootstrap";

export default function BookSection({ searchQuery, filters }) {
  const renderTooltip = (props, text) => (
    <Tooltip id="button-tooltip" {...props}>
      {text}
    </Tooltip>
  );

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
    enabled: !!searchQuery, // Ensures the query runs only when there is a search query
  });

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
            return <div className="text-light infoText">No books found</div>; // If no items, skip this page
          }

          return page.items.map((book, bookIndex) => {
            const isLastItem =
              pageIndex === data.pages.length - 1 &&
              bookIndex === page.items.length - 1;

            return (
              <OverlayTrigger
                key={book.id}
                placement="bottom"
                overlay={renderTooltip(
                  "",
                  book.accessInfo.viewability +
                    " " +
                    book.saleInfo.isEbook +
                    " " +
                    book.saleInfo.saleability +
                    " " +
                    book.volumeInfo.language
                )}
              >
                <div
                  className="card"
                  ref={isLastItem ? lastBookRef : null} // Attach ref to the last item
                >
                  <img
                    src={book.volumeInfo.imageLinks?.thumbnail || coverNotFound}
                    className="card-img"
                    alt={book.volumeInfo.title || "Book cover"}
                  />
                </div>
              </OverlayTrigger>
            );
          });
        })}
      </ul>
      {isFetchingNextPage && <div>Loading more...</div>}
    </div>
  );
}
