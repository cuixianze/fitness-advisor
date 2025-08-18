
/**
 * 설문 단계의 이전/다음 버튼을 담당하는 컴포넌트
 * @param {function} onPrevClick - 'previous' 버튼 클릭 시 실행될 함수
 * @param {boolean} isFirstStep - 첫 단계인지 여부 (previous 버튼 숨김 처리)
 * @param {boolean} isLastStep - 마지막 단계인지 여부 ('next'를 '제출'로 변경)
 */
export default function StepNavigation({ onPrevClick, isFirstStep = false, isLastStep = false }) {
  return (
    <div className="mt-6 flex gap-4">
      {!isFirstStep && (
        <button
          type="button"
          onClick={onPrevClick}
          className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md font-semibold transition-colors"
        >
          previous
        </button>
      )}
      <button
        type="submit"
        className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md font-semibold transition-colors"
      >
        {isLastStep ? "제출" : "next"}
      </button>
    </div>
  );
}
