import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="nav-link" to="/eventhistory">Event History</Link>
      <Link className="nav-link" to="/downloadhistory">Download History</Link>
    </nav>
  );
};

export default Navigation;
