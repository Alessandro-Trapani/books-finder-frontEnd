# Books Search App

A React-based web application that allows users to search for books using the Google Books API, apply filters, authenticate via a login form, unlock their account after registration, and manage favorite books.

---
Check it out at : https://alessandro-trapani.github.io/books-finder-frontend/

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [API Endpoints](#api-endpoints)
- [Usage Steps](#usage-steps)
- [Running the Application](#running-the-application)
- [Testing](#testing)

---

## Features

- **Book Search:** Search for books using the Google Books API.
- **Filters:** Filter books by genre, language, and book type.
- **Authentication:** Users can register, unlock their accounts via email confirmation, and log in.
- **Favorite Books:** Users can add and view favorite books on the "Favorite Books" page.
- **Protected Routes:** Only logged-in users can add/view favorite books.
- **Custom Backend:** The app interacts with a custom backend for user authentication and favorite book management.

---

## Technologies Used

- **Frontend:** React 19, React Router, React Bootstrap
- **State Management & API Calls:** `@tanstack/react-query`, `axios`
- **Authentication:** JWT-based login (`jwt-decode`), email-based account unlocking
- **UI Components:** `react-bootstrap`, `bootstrap`
- **Google Books API:** Fetching books

---

## API Endpoints for user authentication (Custom Backend)
- check repositories



## Usage Steps

1. **Register a New User:**
   - Fill out the registration form.
   - A confirmation email will be sent to the registered email address.

2. **Confirm Email:**
   - Click on the confirmation link in the email to unlock your account.

3. **User Login:**
   - Log in with your credentials.
   - Receive a JWT token for authentication.

4. **Search for Books:**
   - Use the search bar to find books.
   - Apply filters like genre, language, and book type.

5. **Add a Favorite Book:**
   - Click the "star" button.
   - Only available to logged-in users.

6. **View Favorite Books:**
   - Navigate to the "Favorite Books" page to see saved books.

7. **Remove a Favorite Book:**
   - Click the "star" button on a saved book to remove it from saved books.

---

## Testing
- APIs tested using Postman.
- Ensure authentication, book search, and favorite book management work as expected.

