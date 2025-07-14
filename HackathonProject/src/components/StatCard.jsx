const StatCard = ({ title, value, icon }) => {
  return (
    <div className="flex items-center gap-4 bg-white dark:bg-gray-900 rounded-2xl shadow-md px-5 py-4 sm:px-6 hover:shadow-blue-400/40 transition duration-200">
      {icon && (
        <div className="text-3xl sm:text-4xl text-blue-600 dark:text-blue-400 shrink-0">
          {icon}
        </div>
      )}
      <div className="flex flex-col">
        <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
          {title}
        </p>
        <p className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white">
          {value}
        </p>
      </div>
    </div>
  );
};

export default StatCard;
