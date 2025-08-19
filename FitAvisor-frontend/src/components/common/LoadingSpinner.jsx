import { CiDumbbell } from "react-icons/ci";

export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex flex-col justify-center items-center z-50">
      <CiDumbbell className="w-16 h-16 text-green-500 animate-spin mb-6" />

      <h2 className="text-2xl font-bold text-gray-100 mb-2">
        🏋️‍♀️ 루틴 생성중입니다...
      </h2>
      <p className="text-lg text-gray-300">
        최적의 운동 루틴을 찾고 있습니다. 잠시만 기다려주세요!
      </p>
    </div>
  );
}
