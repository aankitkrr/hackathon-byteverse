import { FaLinkedin, FaGithub } from "react-icons/fa";

const TeamMemberCard = ({ name, email, image, description, github, linkedin }) => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md overflow-hidden text-center p-6 transition-transform duration-300 hover:shadow-lg hover:scale-[1.03] max-w-sm w-full">
      <img
        src={image}
        alt={name}
        className="w-24 h-24 mx-auto rounded-full mb-4 object-cover shadow-sm"
      />
      <h2 className="text-base sm:text-lg font-semibold mb-1 text-gray-900 dark:text-white">
        {name}
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-3 px-2">
        {description}
      </p>

      {(github || linkedin) && (
        <div className="flex justify-center gap-3 mb-2 text-blue-600 dark:text-blue-400">
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${name}'s GitHub`}
              className="hover:text-gray-800 dark:hover:text-white transition-colors"
            >
              <FaGithub className="w-5 h-5" />
            </a>
          )}
          {linkedin && (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${name}'s LinkedIn`}
              className="hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              <FaLinkedin className="w-5 h-5" />
            </a>
          )}
        </div>
      )}

      <a
        href={`mailto:${email}`}
        className="text-blue-600 dark:text-blue-400 hover:underline text-sm break-all"
      >
        {email}
      </a>
    </div>
  );
};

export default TeamMemberCard;
