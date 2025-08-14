import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function DietStep1() {
  const gender = [
    { id: "dietStepId1", label: "남자", value: "남자" },
    { id: "dietStepId2", label: "여자", value: "여자" },
    
  ];

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext();

  const onValid = (data) => {
    navigate("/diet/dietStep2");
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
      성별을 선택해주세요
    </h1>
    <div className="space-y-4">
      {gender.map(({ label, value, id }) => (
        <label
          key={id}
          className="flex items-center p-3 border border-gray-300 rounded-lg hover:border-blue-400 transition-colors"
        >
          <input
            type="radio"
            value={value}
            {...register("gender", { required: "성별을 선택해주세요" })}
            className="form-radio text-blue-500 accent-blue-500 mr-3"
          />
          <span className="text-gray-700">{label}</span>
        </label>
      ))}
    </div>
    {errors.gender && (
      <p className="text-red-500 text-sm mt-2">{errors.gender.message}</p>
    )}
    <button
      type="submit"
      className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md font-semibold transition-colors"
    >
      next
    </button>
    
    
  </form>
)
};
