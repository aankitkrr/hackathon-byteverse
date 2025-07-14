const ProfileCard = ({ name, email, avatar, bio }) => {
  return (
    <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center transition hover:shadow-xl">
      <img
        src={avatar}
        alt={name}
        className="w-24 h-24 rounded-full object-cover border-4 border-blue-500 dark:border-blue-400 shadow-md"
      />

      <h2 className="mt-4 text-xl font-semibold text-gray-800 dark:text-white">{name}</h2>
      <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">{email}</p>

      {bio && (
        <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 px-4">{bio}</p>
      )}

      <div className="mt-4 flex space-x-4">
        <button className="text-sm font-medium text-blue-600 hover:underline">View Profile</button>
        <button className="text-sm font-medium text-red-500 hover:underline">Logout</button>
      </div>
    </div>
  );
};

export default ProfileCard;
