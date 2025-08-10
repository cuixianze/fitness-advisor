import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export default function DietStep1() {
  const exerciseTime = [
    { id: "dietStepId1", label: "30분", value: "30분" },
    { id: "dietStepId2", label: "30분~1시간", value: "30분~1시간" },
    { id: "dietStepId3", label: "1시간 이상", value: "1시간 이상" },
  ];

  const [formData, setFormData] = useState(false);

  // const nextDietStep2 = useNavigate();

  const prevStep = useNavigate();

  const onSubmit = async () => {
    // 1) 현재 폼의 모든 값 가져오기
    const values = getValues();
    // const formServerData = getValues();
    const formServerData = {
      userId: "u-1233", // 예시, 로그인 사용자 ID
      experienceLevel: values.exerciseLevel,
      goals: values.goals || [],
      availableDays: values.availableDays || [],
      injuriesOrLimitations: values.injuriesOrLimitations || [],
      preferredEnvironment: values.preferredEnvironment,
      exerciseTime: values.exerciseTime,
    };
    // 디버깅: 제출 전에 콘솔로 확인해보세요
    console.log("formData", formServerData);

    try {
      setFormData(true);

      // 2) axios 인스턴스로 POST 전송
      const res = await axios.post(
        "http://localhost:4000/api/generate-workout"
      );
      console.log(res.data);

      // 3) 성공 처리: 결과 페이지로 이동하거나 모달로 보여주기
      // 여기서는 결과 페이지로 navigate 하면서 상태로 전달
      // navigate("/diet", { state: { plan: result } });
    } catch (err) {
      console.error("notfound", err);
    }
  };

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useFormContext();

  // const onValid = (data) => {
  //   nextDietStep2("/diet/dietStep6");
  // };

  const handlePrevClick = () => {
    prevStep("/diet/dietStep6");
  };

  const onError = (errors) => {
    console.log(errors);
  };

  return (
    <form
      onSubmit={handleSubmit(onError)}
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
          onClick={onSubmit}
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
