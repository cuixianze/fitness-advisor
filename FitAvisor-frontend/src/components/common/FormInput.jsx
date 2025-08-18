// src/components/common/FormInputOption.jsx

/**
 * 설문조사에서 사용되는 라디오 또는 체크박스 입력 필드 컴포넌트
 * @param {string} type - 'radio' 또는 'checkbox'
 * @param {string} fieldName - react-hook-form에 등록될 필드 이름
 * @param {object} register - react-hook-form의 register 함수
 * @param {object} validationRules - 유효성 검사 규칙
 * @param {any} props - id, label, value 등 나머지 props
 */
export default function FormInputOption({ type, fieldName, register, validationRules, ...props }) {
  const { id, label, value } = props;

  return (
    <label
      key={id}
      className="flex items-center p-3 border border-gray-300 rounded-lg hover:border-blue-400 transition-colors cursor-pointer"
    >
      <input
        type={type}
        value={value}
        {...register(fieldName, validationRules)}
        className="form-radio text-blue-500 accent-blue-500 mr-3"
      />
      <span className="text-gray-700">{label}</span>
    </label>
  );
}
