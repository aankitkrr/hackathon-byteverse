const Button = ({
  children,
  onClick,
  className = "",
  type = "button",
  disabled = false,
  ...props
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`
        text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2
        dark:bg-blue-600 dark:hover:bg-blue-700
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
