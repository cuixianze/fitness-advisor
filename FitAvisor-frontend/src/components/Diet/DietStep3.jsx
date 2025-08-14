import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function DietStep1() {
  const goToExercise = [
    { id: "dietStepId1", label: "월요일", value: "월요일" },
    { id: "dietStepId2", label: "화요일", value: "화요일" },
    { id: "dietStepId3", label: "수요일", value: "수요일" },
    { id: "dietStepId4", label: "목요일", value: "목요일" },
    { id: "dietStepId5", label: "금요일", value: "금요일" },
    { id: "dietStepId6", label: "토요일", value: "토요일" },
    { id: "dietStepId7", label: "일요일", value: "일요일" },
    { id: "dietStepId8", label: "X", value: "X" },
  ];

  const nextDietStep2 = useNavigate();

  const prevStep = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext();

  const onValid = (data) => {
    nextDietStep2("/diet/dietStep4");
  };

  const handlePrevClick = () => {
    prevStep("/diet/dietStep2");
  };

  const onError = (errors) => {
    console.log(errors);
  };

  return (
    <form
      onSubmit={handleSubmit(onValid, onError)}
      className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow"
    >
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
        이번주에는 운동을 언제 언제 가셨나요?
      </h1>
      <div className="space-y-4">
        {goToExercise.map(({ label, value, id }) => (
          <label
            key={id}
            className="flex items-center p-3 border border-gray-300 rounded-lg hover:border-blue-400 transition-colors"
          >
            <input
              type="checkbox"
              value={value}
              {...register("goToExercise", {
                required: "이번주에 운동을 언제 언제 가셨는지 선택해주세요",
              })}
              className="form-radio text-blue-500 accent-blue-500 mr-3"
            />
            <span className="text-gray-700">{label}</span>
          </label>
        ))}
      </div>
      {errors.goToExercise && (
        <p className="text-red-500 text-sm mt-2">{errors.goToExercise.message}</p>
      )}
      <div className="mt-6 flex gap-4">
        <button
          type="submit"
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md font-semibold transition-colors"
        >
          next
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
