import React from "react";
import { useNavigate } from "react-router-dom";

export default function LoginBtn() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/login");
  };

  

  return (
    <button 
      onClick={handleClick}
      className="bg-green-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-300"
    >
      Login
    </button>
  );
}