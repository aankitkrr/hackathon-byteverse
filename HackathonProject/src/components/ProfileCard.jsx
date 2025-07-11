const ProfileCard = ({ name, email, avatar, bio }) => {
  return (
    <div className="flex items-center gap-6 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md w-full max-w-xs">
      <img
        src={avatar}
        alt={name}
        className="w-20 h-20 rounded-full object-cover shadow-sm"
      />

      <div className="flex-1 min-w-0 ">
        <div className="relative group">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white truncate w-full">
            {name}
          </h2>
          <div className="absolute left-0 top-full mt-1 w-max max-w-xs text-xs bg-black text-white px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10">
            {name}
          </div>
        </div>

        <div className="relative group">
          <p className="text-sm text-gray-500 dark:text-gray-300 truncate w-full">
            {email}
          </p>
          <div className="absolute left-0 top-full mt-1 w-max max-w-xs text-xs bg-black text-white px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10">
            {email}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
