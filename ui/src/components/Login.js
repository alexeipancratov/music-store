import React, { useState } from "react";
import axios from "axios";
import "./Login.css";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3001/users/authenticate", {
        username: username,
        password: password,
      })
      .then(
        (res) => onLogin(res.data),
        (err) => {
          setAuthError(err.response.data.message);
        }
      );
  };

  const onUsernameChange = (e) => {
    setUsername(e.target.value);
    setAuthError('');
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
    setAuthError('');
  };

  return (
    <div className="login-container col-md">
      <h2>Admin Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            value={username}
            required={true}
            autoComplete="off"
            onChange={onUsernameChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={password}
            required={true}
            autoComplete="off"
            onChange={onPasswordChange}
          />
        </div>
        <div className="align-center-horizontal">
          <button type="submit" className="btn btn-primary">
            Log In
          </button>
        </div>

        {authError &&
        <div className="alert alert-danger offset-top" role="alert">
          {authError}
        </div>}
      </form>
    </div>
  );
};

export default Login;
