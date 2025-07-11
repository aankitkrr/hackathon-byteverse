import { Link } from "react-router-dom";

const NavItem = ({ to, children }) => {
  return (
    <li>
      <Link
        to={to}
        className="block py-2 px-3 text-gray-900 dark:text-white hover:text-blue-700 dark:hover:text-blue-400">
        {children}
      </Link>
    </li>
  );
};

export default NavItem;
