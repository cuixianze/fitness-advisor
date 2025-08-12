import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function DietStep1() {
  const exerciseTime = [
    { id: "dietStepId1", label: "30분", value: "30분" },
    { id: "dietStepId2", label: "30분~1시간", value: "30분~1시간" },
    { id: "dietStepId3", label: "1시간 이상", value: "1시간 이상" },
  ];

  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    // 2) formData를 post로 보내기
    try {
      const res = await axios.post(`http://localhost:8080/workouts/`, formData);
      console.log("사용자 데이터", res.data);
      navigate("/dietLastStep", { state: { mock: res.data } });
    } catch (err) {
      console.error("NotFound!!!", err);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext();

  const handlePrevClick = () => {
    navigate("/diet/dietStep6");
  };

  const onError = (errors) => {
    console.log(errors);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow"
    >
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
        오늘 운동할 수 있는 시간은 어떻게 되사나요?
      </h1>
      <div className="space-y-4">
        {exerciseTime.map(({ label, value, id }) => (
          <label
            key={id}
            className="flex items-center p-3 border border-gray-300 rounded-lg hover:border-blue-400 transition-colors"
          >
            <input
              type="radio"
              value={value}
              {...register("exerciseTime", {
                required: "금일 운동 가능 시간을 선택해주세요",
              })}
              className="form-radio text-blue-500 accent-blue-500 mr-3"
            />
            <span className="text-gray-700">{label}</span>
          </label>
        ))}
      </div>
      {errors.bodyFat && (
        <p className="text-red-500 text-sm mt-2">{errors.bodyFat.message}</p>
      )}

      <div className="mt-6 flex gap-4">
        <button
          type="submit"
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md font-semibold transition-colors"
        >
          제출
        </button>
        <button
          type="button"
          onClick={handlePrevClick}
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md font-semibold transition-colors"
        >
          previous
        </button>
      </div>
    </form>
  );
}
