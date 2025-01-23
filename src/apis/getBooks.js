import axios from "axios";
export default async function getBooks(
  query,
  genres = "",
  bookType = "",
  languages = "",
  order = "relevance",
  startIndex = 0
) {
  const finalquery = `https://www.googleapis.com/books/v1/volumes?q=${query}${
    genres && genres !== "none" ? `+subject:${genres}` : ""
  }&startIndex=${startIndex}&maxResults=10${
    languages ? `&langRestrict=${languages}` : ""
  }&orderBy=${order}${bookType ? "&filter=" + bookType : ""}`;

  try {
    const response = await axios.get(finalquery);

    return {
      items: response.data.items,
      nextPageToken: startIndex + 10,
    };
  } catch (error) {
    console.error(
      "Error fetching books:",
      error.response?.data || error.message
    );
    throw error;
  }
}
