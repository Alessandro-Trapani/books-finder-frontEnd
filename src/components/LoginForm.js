import { useState } from "react";
import register from "../apis/register";
import login from "../apis/login";
import Notification from "./Notification";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../hooks/AuthContext";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const navigate = useNavigate();

  const navigateToMyBooks = () => {
    navigate(`/myBooks`);
  };

  const { saveJwt, jwt, clearJwt } = useAuth();

  const [isRegistering, setIsRegistering] = useState(false);
  const [notification, setNotification] = useState({ color: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  var response = "";
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegistering) {
        response = await register(
          formData.firstName,
          formData.lastName,
          formData.email,
          formData.password
        );
        setFormData({ firstName: "", lastName: "", email: "", password: "" });
      } else {
        response = await login(formData.email, formData.password);
        setFormData({ firstName: "", lastName: "", email: "", password: "" });
      }
      const confirmation = response?.confirmation;
      const jwt = response?.jwt;

      let message = confirmation || "Success!";
      if (jwt) {
        saveJwt(jwt);
        message = `Welcome ${jwtDecode(jwt).firstName}!`;
      }

      setNotification({
        color: "green",
        message: message,
      });
      setIsRegistering(false);
    } catch (error) {
      setNotification({
        color: "red",
        message: error.response?.data?.error || "An error occurred",
      });
    }
  };
  const handleDismiss = () => {
    setNotification({ color: "", message: "" });
  };

  var isLoggedIn = false;
  try {
    if (jwt && jwt.split(".").length === 3) {
      isLoggedIn = jwtDecode(jwt).firstName > "";
    }
  } catch (error) {
    console.error("Invalid JWT:", error);
  }
  return (
    <>
      {notification.message && (
        <Notification
          color={notification.color}
          message={notification.message}
          onDismiss={handleDismiss}
        />
      )}

      {!isLoggedIn ? (
        <div className="d-flex justify-content-center align-items-center ">
          <form onSubmit={handleSubmit}>
            {isRegistering && (
              <>
                <div className="mb-3">
                  <label htmlFor="firstName" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    className="form-control"
                    required={isRegistering}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="lastName" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    className="form-control"
                    required={isRegistering}
                  />
                </div>
              </>
            )}
            <span style={{ color: "red", border: "1px solid red" }}>
              This form will not work since the backend is not currently hosted
              anywhere
            </span>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="form-control"
                required
              />
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                {isRegistering ? "Register" : "Login"}
              </button>
              <button
                type="button"
                className="btn btn-link"
                onClick={() => setIsRegistering(!isRegistering)}
              >
                {isRegistering
                  ? "Already have an account? Login"
                  : "New here? Register"}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <ul className="list-group">
          <li className="list-group-item text-white border-0">
            <a
              onClickCapture={() => navigateToMyBooks()}
              href="/myBooks"
              className="text-white text-decoration-none d-block"
            >
              View favorite books
            </a>
          </li>

          <li className="list-group-item text-white border-0">
            <a
              onClickCapture={() => clearJwt()}
              href="#"
              className="text-danger text-decoration-none d-block"
            >
              Logout
            </a>
          </li>
        </ul>
      )}
    </>
  );
}

export default LoginForm;
