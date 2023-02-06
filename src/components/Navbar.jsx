import React from "react";
import { Link } from "react-router-dom";

function Navbar(props) {
  return (
    <nav className="nav">
      <ul>
        <li>
          <Link to="/EB1">EB1</Link>
        </li>
        <li>
          <Link to="/EB2">EB2</Link>
        </li>
        <li>
          <Link to="/EB3">EB3</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
