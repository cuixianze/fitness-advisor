import React from 'react';
import { CiDumbbell } from 'react-icons/ci';
import { FcGoogle } from 'react-icons/fc'; // 구글 아이콘
import { RiKakaoTalkFill } from 'react-icons/ri'; // 카카오 아이콘

export default function Login() {
  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-lg p-8 space-y-6">
        {/* 1. 로고 및 헤더 */}
        <div className="text-center">
          <CiDumbbell className="mx-auto text-green-500 w-12 h-12 mb-2" />
          <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
          <p className="text-gray-400">로그인하고 맞춤형 루틴을 받아보세요</p>
        </div>

        {/* 2. 로그인 폼 */}
        <form className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              이메일
            </label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </form>
        
        {/* 3. 로그인 및 추가 옵션 */}
        <div className="space-y-4">
          <button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300">
            로그인
          </button>
          <div className="text-center">
            <a href="#" className="text-sm text-green-400 hover:underline">
              비밀번호를 잊으셨나요?
            </a>
          </div>
        </div>

        {/* 4. 소셜 로그인 (구분선 포함) */}
        <div className="flex items-center justify-center space-x-2">
          <hr className="w-full border-gray-600" />
          <span className="text-gray-500 text-xs font-semibold">OR</span>
          <hr className="w-full border-gray-600" />
        </div>

        <div className="space-y-3">
          <button className="w-full flex items-center justify-center bg-white text-gray-800 font-medium py-2.5 px-4 rounded-lg hover:bg-gray-200 transition duration-300">
            <FcGoogle className="w-5 h-5 mr-3" />
            Google 계정으로 계속하기
          </button>
          <button className="w-full flex items-center justify-center bg-[#FEE500] text-[#392020] font-medium py-2.5 px-4 rounded-lg hover:bg-yellow-400 transition duration-300">
            <RiKakaoTalkFill className="w-5 h-5 mr-3" />
            Kakao 계정으로 계속하기
          </button>
        </div>

        {/* 5. 회원가입 링크 */}
        <div className="text-center text-sm text-gray-400">
          계정이 없으신가요?{' '}
          <a href="#" className="font-medium text-green-400 hover:underline">
            회원가입
          </a>
        </div>
      </div>
    </div>
  );
}