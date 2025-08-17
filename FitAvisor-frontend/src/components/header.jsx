import React from "react";
import { Link } from "react-router-dom";
import LoginBtn from "./LoginBtn";

export default function Header() {
  return (
    <header
      className="sticky top-0 z-50 flex items-center justify-between 
             h-25 px-8 bg-white border-b border-gray-200"
    >
      <div className="flex items-center space-x-2"> 
        <Link to="/">
          <img
            src="https://plus.unsplash.com/premium_photo-1673326630925-d4bad5958baa?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGZpdG5lc3MlMjBsb2dvfGVufDB8fDB8fHww"
            className="w-8 h-8"
            alt="logo"
          />
        </Link>
        <Link to="/" className="text-xl font-bold text-gray-800">
          Preview
        </Link>
      </div>

      
      <nav className="absolute left-1/2 -translate-x-1/2">
        <Link
          to="/home"
      
          className="rounded-md px-3 py-2 text-base font-medium text-black-500 
             hover:bg-gray-100 hover:text-black transition-colors"
        >
          Home
        </Link>
      </nav>

      <div>
        <LoginBtn />
      </div>
    </header>
  );
}
