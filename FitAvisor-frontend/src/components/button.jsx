import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { loginUserContext } from "../context/loginUserContext";

export default function Button() {
    const loginUser = useContext(loginUserContext);
    const loginUserNavigate = useNavigate();

    const handleClick = () => {
        if(loginUser) {
            loginUserNavigate('/diet');
            
        } else {
            loginUserNavigate('/login');
        }
    }
  return (
    <div>
      <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full transition" onClick={handleClick}>맞춤형 루틴 신청하기</button>
    </div>
  );
}
