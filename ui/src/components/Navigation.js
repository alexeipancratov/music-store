import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav>
      <Link to="/eventhistory">Event History</Link>
      <Link to="/downloadhistory">Download History</Link>
    </nav>
  );
};

export default Navigation;
