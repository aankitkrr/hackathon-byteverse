const FormBox = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  error,
  options = [],
  required = true,
}) => {
  const inputClasses = `
    w-full p-2.5 text-sm sm:text-base rounded-lg
    bg-gray-50 text-gray-900 border
    focus:ring-primary-600 focus:border-primary-600
    dark:bg-gray-700 dark:text-white dark:placeholder-gray-400
    dark:focus:ring-blue-500 dark:focus:border-blue-500
    ${error ? "border-red-500 dark:border-red-500" : "border-gray-300 dark:border-gray-600"}
  `;

  return (
    <div className="mb-4 w-full">
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>

      {type === "select" ? (
        <select
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          required={required}
          className={inputClasses}
        >
          <option value="" hidden>
            {placeholder || "Select an option"}
          </option>
          {options.map((opt, idx) => (
            <option key={idx} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={inputClasses}
        />
      )}

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default FormBox;
