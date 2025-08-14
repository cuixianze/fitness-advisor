import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function Button() {
  const navigate = useNavigate();
  const handleClick = () =>{
    navigate("/diet")
  }
  return (
    <div>
      <button
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full transition"
        onClick={handleClick}
      >
        맞춤형 루틴 신청하기
      </button>
    </div>
  );
}
