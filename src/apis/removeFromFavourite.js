import axios from "axios";

export default async function getFavouriteBook(id) {
  const token = localStorage.getItem("jwt");
  if (!token) {
    throw new Error("JWT not found. Please log in again.");
  }

  try {
    const response = await axios.delete(
      "http://localhost:8080/api/v1/books/remove",
      {
        headers: {
          Authorization: `Bearer ${token.slice(1, -1)}`,
        },
        data: { id },
      }
    );

    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    return [];
  }
}
