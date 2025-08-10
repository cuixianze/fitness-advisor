import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function DietStep1() {
  const exerciseLevel = [
    { id: "dietStepId1", label: "왕초보, 입문", value: "초보자, 입문자" },
    { id: "dietStepId2", label: "초보", value: "초보" },
    { id: "dietStepId3", label: "중급", value: "중급" },
    { id: "dietStepId4", label: "고급", value: "고급" },
    { id: "dietStepId5", label: "전문가", value: "전문가" },
  ];

  const nextDietStep2 = useNavigate();

  const prevStep = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext();

  const onValid = (data) => {
    nextDietStep2("/diet/dietStep6");
  };

  const handlePrevClick = () => {
    prevStep("/diet/dietStep4");
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
        본인의 운동 수준은 어떻게 되시나요?
      </h1>
      <div className="space-y-4">
        {exerciseLevel.map(({ label, value, id }) => (
          <label
            key={id}
            className="flex items-center p-3 border border-gray-300 rounded-lg hover:border-blue-400 transition-colors"
          >
            <input
              type="radio"
              value={value}
              {...register("exerciseLevel", {
                required: "본인의 운동 수준을 선택해주세요",
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
