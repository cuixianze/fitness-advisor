import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import "../css/header.css";

export default function Header() {

  return (
    <header className="header">
        <div className="header-left">
          <a href="/">
            <img
              src="https://plus.unsplash.com/premium_photo-1673326630925-d4bad5958baa?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGZpdG5lc3MlMjBsb2dvfGVufDB8fDB8fHww"
              width="35px"
              height="35px"
              alt="logo"
            />
          </a>
          <Link to="/">
            Preview
          </Link>
        </div>

        <nav className="header-center">
          <Link to="/home" className="nav-link">
            Home
          </Link>
        </nav>

        <div className="header-right">
        </div>
    </header>
  );
}
