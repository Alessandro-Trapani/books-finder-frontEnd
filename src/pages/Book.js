import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import getBook from "../apis/getBook";
import coverNotFound from "../assets/coverNotFound.jpg";

const Book = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: book,
    error,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["book", id],
    queryFn: () => getBook(id),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh", backgroundColor: "#343a40" }}
      >
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="alert alert-danger text-light" role="alert">
        Error: {error.message}
      </div>
    );
  }

  if (!book) {
    return (
      <div className="alert alert-warning text-light" role="alert">
        No book found.
      </div>
    );
  }

  return (
    <div className="container my-5 text-light">
      <div className="mb-4">
        <button onClick={() => navigate(-1)} className="btn btn-secondary">
          &#8592; Back
        </button>
      </div>

      <div className="row">
        <div className="col-md-4">
          {}
          <img
            src={
              book.volumeInfo.imageLinks?.thumbnail
                ? book.volumeInfo.imageLinks.thumbnail
                : coverNotFound
            }
            alt={book.volumeInfo.title}
            className="bookThumbnail img-fluid rounded mb-4"
            style={{
              maxWidth: "300px",
              maxHeight: "450px",
              objectFit: "cover",
            }}
          />
        </div>

        <div className="col-md-8">
          {}
          <h2 className="text-white">{book.volumeInfo.title}</h2>
          <h5 className="text-muted">{book.volumeInfo.authors?.join(", ")}</h5>

          {}
          <div className="mb-3">
            <h4>Description:</h4>
            <p
              dangerouslySetInnerHTML={{
                __html:
                  book.volumeInfo.description || "No description available.",
              }}
            />
          </div>

          {}
          <p>
            <strong>Published Date:</strong>{" "}
            {book.volumeInfo.publishedDate || "N/A"}
          </p>
          <p>
            <strong>Publisher:</strong> {book.volumeInfo.publisher || "N/A"}
          </p>
          <p>
            <strong>Page Count:</strong> {book.volumeInfo.pageCount || "N/A"}
          </p>
          <p>
            <strong>Categories:</strong>{" "}
            {book.volumeInfo.categories?.join(", ") || "N/A"}
          </p>
          <p>
            <strong>Language:</strong> {book.volumeInfo.language || "N/A"}
          </p>
          <p>
            <strong>Print Type:</strong> {book.volumeInfo.printType || "N/A"}
          </p>
          <p>
            <strong>Maturity Rating:</strong>{" "}
            {book.volumeInfo.maturityRating || "N/A"}
          </p>

          {}
          {book.volumeInfo.averageRating ? (
            <p>
              <strong>Average Rating:</strong> {book.volumeInfo.averageRating} (
              {book.volumeInfo.ratingsCount || 0} ratings)
            </p>
          ) : (
            <p>
              <strong>No ratings available</strong>
            </p>
          )}

          {}
          <p>
            <strong>ISBN:</strong>{" "}
            {book.volumeInfo.industryIdentifiers
              ? book.volumeInfo.industryIdentifiers[0].identifier
              : "N/A"}
          </p>

          {}
          <div>
            <a
              href={book.volumeInfo.canonicalVolumeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary me-2"
            >
              View on Google Books
            </a>
            {book.volumeInfo.previewLink && (
              <a
                href={book.volumeInfo.previewLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                Preview the Book
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Book;
