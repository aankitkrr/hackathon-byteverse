import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "./Button";
import NavItem from "./NavItem";
import Logo from "../assets/logo";

const Navbar = () => {
  const navigate = useNavigate();
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  const handleClick = () => navigate(isLoggedIn ? "/profile" : "/signin");
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="min-w-screen-xl mx-auto flex p-4 justify-between items-center">
        <a href="/" className="flex items-center space-x-2">
          <Logo className="w-8 h-8 text-gray-800 dark:text-white" />
          <span className="text-2xl font-serif font-bold dark:text-white">CareerCraft</span>
        </a>

        <ul className="flex space-x-6 items-center text-sm font-medium">
          <NavItem to="/">Home</NavItem>
          <NavItem to="/about">About</NavItem>
          <NavItem to="/contact">Contact</NavItem>
          <NavItem to="/active">My Roadmaps</NavItem>
          <NavItem to="/input-form">New Roadmap</NavItem>
        </ul>

        <div className="flex items-center space-x-3">
          <Button onClick={toggleTheme} className="px-3 py-2 bg-gray-400 text-black dark:text-white dark:bg-gray-700">
            <i className="fa-solid fa-circle-half-stroke mr-1" />
            {darkMode ? "Light" : "Dark"}
          </Button>

          <Button onClick={handleClick}>
            {isLoggedIn ? "Profile" : "Sign In"}
          </Button>

          {isLoggedIn && (
            <Button onClick={handleLogout}>
              Log Out
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
