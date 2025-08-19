
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
