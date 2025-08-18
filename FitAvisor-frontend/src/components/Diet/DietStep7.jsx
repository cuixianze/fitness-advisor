import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { exerciseTimeOptions } from "../../constants/formData";
import { submitWorkoutData } from "../../api/workoutApi.js";
import SurveyStepLayout from "../common/SurveyStepLayout";
import FormInput from "../common/FormInput";


export default function DietStep7() {
  const {
    register,
    reset,
  } = useFormContext();

  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    try {
      const responseData = await submitWorkoutData(formData);
      localStorage.removeItem("saveFormData");
      reset({
        gender: "",
        exerciseNumber: "",
        goToExercise: [],
        lastExercise: "",
        exerciseLevel: "",
        exercisePart: "",
        exerciseTime: "",
      });
      navigate("/dietLastStep", { state: { mock: responseData } });
    } catch (err) {
      console.error("제출 실패:", err);
    }
  };
  
  return (
    <SurveyStepLayout
         title="운동 가능 시간은 어떻게 되사나요??"
         fieldName="lastExercise"  
         onValid={onSubmit}
         onPrevClick= {() => navigate("/diet/dietStep6")}
         isFirstStep={true}
       >
         {/* 내부 흐름 2: genderOptions 배열을 순회하며 각 항목을 FormInputOption 부품으로 만듭니다. */}
         {exerciseTimeOptions.map((option) => (
           <FormInput
             key={option.id}
             type="radio" // 이 단계는 라디오 버튼을 사용합니다.
             {...option} // id, label, value를 한 번에 전달
             register={register}
             fieldName="lastExerciseOptions"
             validationRules={{ required: "운동 가능 시간을 선택해주세요" }}
           />
         ))}
       </SurveyStepLayout>
  );
}
