import React, { useState } from "react";
import axios from "axios";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:3001/authenticate', {
      username: username,
      password: password
    }).then(
      res => onLogin(res.data.token),
      err => console.log(err)
    );
  };

  const onUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" name="username" value={username} onChange={onUsernameChange} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={password} onChange={onPasswordChange} />
        </div>
        <div>
          <input type="submit" value="Log In" />
        </div>
      </form>
    </div>
  );
};

export default Login;
