import axios from "axios";

export default async function register(firstName, lastName, email, password) {
  const url = "http://localhost:8080/api/v1/registration/register";

  const requestBody = {
    firstName,
    lastName,
    email,
    password,
  };

  try {
    console.log(email);
    const response = await axios.post(url, requestBody, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Server responded with an error:", error.response.data);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error in setting up request:", error.message);
    }
    throw error;
  }
}
