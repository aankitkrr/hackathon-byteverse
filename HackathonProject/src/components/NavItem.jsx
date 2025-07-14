import { Link } from "react-router-dom";

const NavItem = ({ to, children }) => {
  return (
    <li className="w-full md:w-auto">
      <Link
        to={to}
        className="
          block w-full text-center md:text-left
          py-2 px-3 text-sm sm:text-base font-medium
          text-gray-900 dark:text-white
          hover:text-blue-700 dark:hover:text-blue-400
          transition-colors duration-200
        "
      >
        {children}
      </Link>
    </li>
  );
};

export default NavItem;
