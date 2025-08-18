
import { useNavigate } from "react-router-dom";
import { useFormContext } from "react-hook-form";
import { lastExerciseOptions } from "../../constants/formData";
import SurveyStepLayout from "../common/SurveyStepLayout";
import FormInput from "../common/FormInput";

export default function DietStep1() {
  const navigate = useNavigate();
  const { register } = useFormContext();

  // 내부 흐름 1: 이 컴포넌트는 SurveyStepLayout이라는 '틀'을 사용합니다.
  // 필요한 정보(title, fieldName 등)를 props로 전달합니다.
  return (
    <SurveyStepLayout
      title="가장 최근에 한 운동은 무엇인가요??"
      fieldName="lastExercise"  
      onValid={() => navigate("/diet/dietStep5")}
      onPrevClick= {() => navigate("/diet/dietStep3")}
      isFirstStep={false}
    >
      {/* 내부 흐름 2: genderOptions 배열을 순회하며 각 항목을 FormInputOption 부품으로 만듭니다. */}
      {lastExerciseOptions.map((option) => (
        <FormInput
          key={option.id}
          type="radio" // 이 단계는 라디오 버튼을 사용합니다.
          {...option} // id, label, value를 한 번에 전달
          register={register}
          fieldName="lastExerciseOptions"
          validationRules={{ required: "가장 최근에 한 운동을 선택해주세요" }}
        />
      ))}
    </SurveyStepLayout>
  );
}
