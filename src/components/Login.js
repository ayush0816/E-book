import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = (props) => {
  const port = "http://localhost:5000";
  let navigate = useNavigate();
  const [creds, setcreds] = useState({ email: "", password: "" });
  const handleChange = (e) => {
    setcreds({ ...creds, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${port}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: creds.email, password: creds.password }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem("token", json.token);
      props.showAlert("Logged In", "Success");
      navigate("/");
    }
    console.log(json);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label for="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            name="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            value={creds.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label for="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="password"
            value={creds.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};
