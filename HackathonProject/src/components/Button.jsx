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
        inline-flex items-center justify-center whitespace-nowrap
        text-sm sm:text-base px-4 sm:px-5 py-2 font-medium rounded-lg 
        transition text-white bg-blue-700 hover:bg-blue-800
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
