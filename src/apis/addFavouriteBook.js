import axios from "axios";

export default async function getFavouriteBook(id) {
  const token = localStorage.getItem("jwt");
  if (!token) {
    throw new Error("JWT not found. Please log in again.");
  }

  console.log(token);

  axios
    .post(
      "http://localhost:8080/api/v1/books/add",
      { id: id },
      {
        headers: {
          Authorization: `Bearer ${token.slice(1, -1)}`,
        },
      }
    )
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error("API Error: ", error.response?.data || error.message);
    });
}
