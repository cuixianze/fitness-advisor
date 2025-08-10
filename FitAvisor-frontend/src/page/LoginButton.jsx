import React, { useEffect, useId, useState } from "react";
import { emailSignIn, login, sendSignInLink } from "../api/firebase";
import { FcGoogle } from "react-icons/fc";
import "../css/login.css";

export default function LoginButton() {
  const [email, setEmail] = useState("");
  const emailId = useId();
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleClick = () => {
    sendSignInLink(email);
  };

  useEffect(() => {
    emailSignIn(email);
  }, []);

  return (
    // <div>
    //   <h2>로그인</h2>

    //   <button onClick={login}>
    //     <FcGoogle />
    //     Google로 계속하기
    //   </button>
    //   <p>----------------또는----------------</p>
    //     <form onSubmit={handleSubmit}>
    //       <input
    //         id = {emailId}
    //         name="userEmail"
    //         type="email"
    //         placeholder="이메일을 입력해주세요"
    //         autoComplete="email"
    //         value={email}
    //         onChange={handleChange}
    //       />
    //     <button type="button" onClick={handleClick}>
    //       전송
    //     </button>
    //   </form>
    // </div>

    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">로그인</h2>
        
        <button
          onClick={login}
          className="
            w-full flex items-center justify-center
            border border-gray-300 rounded-md
            py-2 hover:bg-gray-100 transition mb-4
          "
        >
          <FcGoogle className="mr-2 w-6 h-6" />
          <span className="text-gray-700 font-medium">Google로 계속하기</span>
        </button>

        <div className="text-center text-gray-500 text-sm my-4">----------------또는----------------</div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor={emailId} className="sr-only">이메일</label>
            <input
              id={emailId}
              name="userEmail"
              type="email"
              placeholder="이메일을 입력해주세요"
              autoComplete="email"
              value={email}
              onChange={handleChange}
              className="
                w-full px-4 py-2 border border-gray-300 rounded-md
                focus:outline-none focus:ring-2 focus:ring-green-500
                transition
              "
              required
            />
          </div>
          <button
            type="button"
            onClick={handleClick}
            className="
              w-full bg-green-500 text-white font-semibold
              py-2 rounded-md shadow hover:bg-green-600
              focus:outline-none focus:ring-4 focus:ring-green-300
              transition
            "
          >
            전송
          </button>
        </form>
      </div>
    </div>
  );
}
