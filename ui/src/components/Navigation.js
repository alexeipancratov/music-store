import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";

const Navigation = (props) => {
  const onLogout = (e) => {
    e.preventDefault();
    props.onLogout();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="nav-link" to="/eventhistory">Event History</Link>
      <Link className="nav-link" to="/downloadhistory">Download History</Link>

      <form className="form-inline ml-auto" onSubmit={onLogout}>
        <div className="form-group">
          <label className="button-label-left">{props.username}</label>
          <button className="btn btn-outline-secondary my-2 my-sm-0" type="submit">Log out</button>
        </div>
      </form>
    </nav>
  );
};

export default Navigation;
