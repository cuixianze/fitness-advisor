import React from 'react';
import { CiDumbbell } from 'react-icons/ci';
import { FcGoogle } from 'react-icons/fc'; // 구글 아이콘
import { RiKakaoTalkFill } from 'react-icons/ri'; // 카카오 아이콘

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/api/login", {
        email,
        password,
      });
      console.log("로그인 성공", response);
      const { token, userName } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("username", userName);
      navigate('/')
    } catch (error) {
      console.error("로그인 요청 중 오류 발생:", error);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-lg p-8 space-y-6">
        {/* 아이콘 및 헤더 */}
        <div className="text-center">
          {/* 아이콘 라이브러리 대신 간단한 이모지를 사용하거나 비워둘 수 있습니다. */}
          <span role="img" aria-label="dumbbell" className="text-5xl mb-2">
            🏋️
          </span>
          <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
          <p className="text-gray-400">로그인하고 맞춤형 루틴을 받아보세요</p>
        </div>

        {/* 로그인 폼 */}
        <form className="space-y-4" onSubmit={handleSubmit}>
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* 로그인 버튼 */}
          <div className="space-y-4 pt-2">
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300"
            >
              로그인
            </button>
            <div className="text-center">
              <a href="#" className="text-sm text-green-400 hover:underline">
                비밀번호를 잊으셨나요?
              </a>
            </div>
          </div>
        </form>

        {/* 구분선 */}
        <div className="flex items-center justify-center space-x-2">
          <hr className="w-full border-gray-600" />
          <span className="text-gray-500 text-xs font-semibold">OR</span>
          <hr className="w-full border-gray-600" />
        </div>

        {/* 소셜 로그인 버튼 */}
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

        {/* 회원가입 링크 */}
        <div className="text-center text-sm text-gray-400">
          계정이 없으신가요?{" "}
          <a href="#" className="font-medium text-green-400 hover:underline">
            회원가입
          </a>
        </div>
      </div>
    </div>
  );
}
