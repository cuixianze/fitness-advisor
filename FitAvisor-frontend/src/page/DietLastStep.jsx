import { useLocation, useNavigate } from "react-router-dom";
import { FiAlertTriangle, FiArrowLeft, FiPlayCircle } from "react-icons/fi";

export default function DietLastStep() {
  const location = useLocation();
  const navigate = useNavigate();

  const routineData = location.state?.mock?.map(item => ({
    ...item,
    sets: "3-4",
    reps: "12-15"
  }));

  if (!routineData || routineData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-center text-gray-200 p-6">
        <FiAlertTriangle className="w-14 h-14 text-yellow-400 mb-5" />
        <h2 className="text-2xl font-bold text-white mb-2">
          앗! 운동 루틴을 찾을 수 없어요.
        </h2>
        <p className="max-w-md text-gray-400 mb-8">
          데이터를 불러오는 중 문제가 발생했습니다. 설문을 다시 시작해주세요.
        </p>
        <button
          onClick={() => navigate("/diet/dietStep1")}
          className="flex items-center gap-2 px-6 py-2.5 text-md font-semibold text-white bg-green-600 rounded-lg shadow-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-transform transform hover:scale-105"
        >
          <FiArrowLeft />
          설문 다시 시작하기
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 font-sans p-4 md:p-6">
      <div className="max-w-2xl mx-auto"> 
        <header className="text-center mb-10">
          <p className="text-md font-semibold text-green-400 tracking-wider">
            AI CUSTOMIZED ROUTINE
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-white mt-2">
            당신을 위한 오늘의 운동 루틴
          </h1>
        </header>
        <div className="space-y-6">
          {routineData.map((exercise) => (
            <div
              key={exercise.id}

              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl shadow-lg overflow-hidden transition-all duration-300 group hover:border-green-400/50 hover:shadow-green-500/10"
            >
              <div className="overflow-hidden h-56 relative"> {/* 이미지 높이 살짝 조정 */}
                <img
                  src={exercise.imageUrl}
                  alt={exercise.name}
                  className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              </div>
              
              <div className="p-5">
                <h3 className="text-2xl font-bold text-white">
                  {exercise.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-400 h-20 overflow-hidden">
                  {exercise.description}
                </p>
                <div className="mt-4 flex justify-end gap-4 text-center">
                  <div>
                    <p className="text-xs text-green-400 font-semibold">SETS</p>
                    <p className="text-xl font-bold text-white">{exercise.sets}</p>
                  </div>
                  <div>
                    <p className="text-xs text-green-400 font-semibold">REPS</p>
                    <p className="text-xl font-bold text-white">{exercise.reps}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <footer className="text-center mt-12">
          <button className="inline-flex items-center gap-3 px-10 py-4 font-bold text-lg text-gray-900 bg-green-400 rounded-full shadow-lg transition-all duration-300 hover:bg-white hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-400/50">
            <FiPlayCircle className="w-6 h-6" />
            오늘의 운동 시작하기
          </button>
        </footer>
      </div>
    </div>
  );
}