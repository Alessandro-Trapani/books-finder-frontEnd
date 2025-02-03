import { useState } from "react";
import register from "../apis/register";
import login from "../apis/login";
import Notification from "./Notification";

function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const [isRegistering, setIsRegistering] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegistering) {
      register(
        formData.firstName,
        formData.lastName,
        formData.email,
        formData.password
      );
    } else {
      login(formData.email, formData.password);
    }
  };

  return (
    <>
      <Notification color="red" message="hello" show={true} />

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
    </>
  );
}

export default LoginForm;
