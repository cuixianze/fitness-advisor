// src/components/common/SurveyStepLayout.jsx

import { useFormContext } from "react-hook-form";
import StepNavigation from "./StepNavigation";

/**
 * 설문 단계의 전체적인 레이아웃을 담당하는 컴포넌트
 * @param {string} title - 페이지 상단에 표시될 질문
 * @param {string} fieldName - 이 단계에서 사용하는 react-hook-form 필드 이름 (에러 메시지 표시용)
 * @param {React.ReactNode} children - 렌더링할 입력 옵션들 (FormInputOption)
 * @param {function} onValid - 'next' 또는 '제출' 버튼 클릭 및 유효성 검사 통과 시 실행될 함수
 * @param {function} onPrevClick - 'previous' 버튼 클릭 시 실행될 함수
 * @param {boolean} isFirstStep - 첫 단계인지 여부
 * @param {boolean} isLastStep - 마지막 단계인지 여부
 */

export default function SurveyStepLayout({ title, fieldName, children, onValid, onPrevClick, isFirstStep, isLastStep }) {
  // 내부 흐름 1: FormProvider로부터 handleSubmit과 formState를 가져옵니다.
  const { handleSubmit, formState: { errors } } = useFormContext();

  // 내부 흐름 2: 유효성 검사 실패 시 에러를 콘솔에 출력하는 함수입니다.
  const onError = (errors) => console.log(errors);

  // 내부 흐름 3: form 태그가 submit될 때 handleSubmit이 onValid 또는 onError를 실행합니다.
  return (
    <form
      onSubmit={handleSubmit(onValid, onError)}
      className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow"
    >
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">{title}</h1>
      
      <div className="space-y-4">
        {children} {/* DietStep 파일에서 전달한 FormInputOption들이 여기에 렌더링됩니다. */}
      </div>

      {/* 해당 필드에 에러가 있으면 메시지를 표시합니다. */}
      {errors[fieldName] && (
        <p className="text-red-500 text-sm mt-2">{errors[fieldName].message}</p>
      )}

      {/* 네비게이션 버튼 컴포넌트를 렌더링합니다. */}
      <StepNavigation
        onPrevClick={onPrevClick}
        isFirstStep={isFirstStep}
        isLastStep={isLastStep}
      />
    </form>
  );
}
