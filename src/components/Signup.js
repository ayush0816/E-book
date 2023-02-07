import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Signup = (props) => {
  const port = "http://localhost:5000";
  let navigate = useNavigate();
  const [creds, setcreds] = useState({ name: "", email: "", password: "" });
  const handleChange = (e) => {
    console.log(creds);
    setcreds({ ...creds, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = creds;
    const response = await fetch(`${port}/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const json = await response.json();

    localStorage.setItem("token", json);
    props.showAlert("Successfully Registered", "Success");
    navigate("/");

    console.log(json);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            name="name"
            className="form-control"
            id="name"
            aria-describedby="emailHelp"
            value={creds.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
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
          <label htmlFor="password" className="form-label">
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
