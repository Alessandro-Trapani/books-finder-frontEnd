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
    queryKey: ["books", searchQuery],
    queryFn: ({ pageParam = 0 }) =>
      getBooks(searchQuery, "", "", filters.language, "relevance", pageParam),
    getNextPageParam: (lastPage, allPages) => {
      // Determine next page (adjust based on your API response)
      return lastPage?.nextPageToken || undefined;
    },
    enabled: !!searchQuery,
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
      <div class="d-flex justify-content-center">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (isError) {
    return <div className="text-danger infoText">Error: {error.message}</div>;
  }

  if (searchQuery === "") {
    return <div className="text-light infoText">Search for books</div>;
  }
  if (!data) {
    return <div className="text-ligh infoTextt">No books found</div>;
  }
  return (
    <div>
      <ul className="books-list">
        {data.pages.map((page, pageIndex) =>
          page.items.map((book, bookIndex) => {
            const isLastItem =
              pageIndex === data.pages.length - 1 &&
              bookIndex === page.items.length - 1;

            return (
              <OverlayTrigger
                placement="bottom"
                overlay={renderTooltip("", book.volumeInfo.language)}
              >
                <div
                  className="card "
                  key={book.id}
                  ref={isLastItem ? lastBookRef : null} // Attach ref to the last item
                >
                  <img
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    data-bs-custom-class="custom-tooltip"
                    data-bs-title="This top tooltip is themed via CSS variables."
                    src={book.volumeInfo.imageLinks?.thumbnail || coverNotFound}
                    className="card-img"
                    alt={book.volumeInfo.title || "Book cover"}
                  />
                </div>
              </OverlayTrigger>
            );
          })
        )}
      </ul>
      {isFetchingNextPage && <div>Loading more...</div>}
    </div>
  );
}
