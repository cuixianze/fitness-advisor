import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function DietStep1() {
  const exerciseNumber = [
    { id: "dietStepId1", label: "1번", value: "1번" },
    { id: "dietStepId2", label: "2번", value: "2번" },
    { id: "dietStepId3", label: "3번", value: "3번" },
    { id: "dietStepId4", label: "4번", value: "4번" },
    { id: "dietStepId5", label: "5번", value: "5번" },
    { id: "dietStepId6", label: "0번", value: "0번" },
  ];

  const nextDietStep2 = useNavigate();

  const prevStep = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext();

  const onValid = (data) => {
    nextDietStep2("/diet/dietStep3");
  };

  const handlePrevClick = (data) => {
    prevStep("/diet");
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
        이번주에는 운동을 몇 번 가셨나요??
      </h1>
      <div className="space-y-4">
        {exerciseNumber.map(({ label, value, id }) => (
          <label
            key={id}
            className="flex items-center p-3 border border-gray-300 rounded-lg hover:border-blue-400 transition-colors"
          >
            <input
              type="checkbox"
              value={value}
              {...register("exerciseNumber", {
                required: "이번주에는 운동을 몇 번 가셨는지 선택해주세요",
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
