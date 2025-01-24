import axios from "axios";

export default async function getBook(volumeId) {
  if (!volumeId) {
    throw new Error("No volume ID provided.");
  }

  const url = `https://www.googleapis.com/books/v1/volumes/${volumeId}`;
  console.log("Requesting URL:", url);

  try {
    const response = await axios.get(url);

    console.log("API Response:", response);
    console.log("Response Data:", response.data);

    if (response.data && response.data.volumeInfo) {
      return response.data;
    } else {
      throw new Error("No book found in the response.");
    }
  } catch (error) {
    if (error.response) {
      console.error("API Error:", error.response.data);
      throw new Error(
        `Failed to fetch book: ${error.response.data.error.message}`
      );
    } else if (error.request) {
      console.error("Network Error:", error.request);
      throw new Error("Network error occurred. Please try again later.");
    } else {
      console.error("Error:", error.message);
      throw new Error(`Error occurred: ${error.message}`);
    }
  }
}
