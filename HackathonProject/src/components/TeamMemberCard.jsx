const TeamMemberCard = ({ name, email, image, description }) => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden text-center p-6 transition duration-300 hover:shadow-xl hover:scale-105">
      <img
        src={image}
        alt={name}
        className="w-24 h-24 mx-auto rounded-full mb-4 object-cover"
      />
      <h2 className="text-lg font-semibold mb-1 text-gray-900 dark:text-white">{name}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{description}</p>
      <a
        href={`mailto:${email}`}
        className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
      >
        {email}
      </a>
    </div>
  );
};

export default TeamMemberCard;
