
import { useNavigate } from "react-router-dom";
import { useFormContext } from "react-hook-form";
import { genderOptions } from "../../constants/formData.js";
import SurveyStepLayout from "../common/SurveyStepLayout.jsx";
import FormInput from "../common/FormInput.jsx";

export default function DietStep1() {
  const navigate = useNavigate();
  const { register } = useFormContext();

  // 내부 흐름 1: 이 컴포넌트는 SurveyStepLayout이라는 '틀'을 사용합니다.
  // 필요한 정보(title, fieldName 등)를 props로 전달합니다.
  return (
    <SurveyStepLayout
      title="성별을 선택해주세요"
      fieldName="gender"  
      onValid={() => navigate("/diet/dietStep2")}
      isFirstStep={true} // 첫 페이지이므로 isFirstStep을 true로 설정
    >
      {/* 내부 흐름 2: genderOptions 배열을 순회하며 각 항목을 FormInputOption 부품으로 만듭니다. */}
      {genderOptions.map((option) => (
        <FormInput
          key={option.id}
          type="radio" // 이 단계는 라디오 버튼을 사용합니다.
          {...option} // id, label, value를 한 번에 전달
          register={register}
          fieldName="gender"
          validationRules={{ required: "성별을 선택해주세요" }}
        />
      ))}
    </SurveyStepLayout>
  );
}
