const StatCard = ({ title, value, icon }) => {
  return (
    <div className="flex items-center gap-4 bg-white dark:bg-gray-900 rounded-xl shadow-md px-6 py-4 hover:shadow-blue-400/40 transition">
      {icon && (
        <div className="text-3xl text-blue-600 dark:text-blue-400">
          {icon}
        </div>
      )}
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
        <p className="text-2xl font-semibold text-gray-800 dark:text-white">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;
