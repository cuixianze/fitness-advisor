import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function Button() {
  const navigate = useNavigate();

  const handleClick = () =>{
    const token = localStorage.getItem("token");

    if (token) {
      // VIP 카드가 있다면, '스카이 라운지'(/diet) 층 버튼을 눌러줍니다.
      console.log("로그인 확인! Diet 페이지로 이동합니다.");
      navigate("/diet");
    } else {
      // VIP 카드가 없다면, '1층 안내 데스크'(/login) 층 버튼을 눌러줍니다.
      console.log("로그인 필요! 로그인 페이지로 이동합니다.");
      navigate("/login");
    }

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
