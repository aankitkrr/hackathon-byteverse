import { useContext, useState } from "react";
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
  const [menuOpen, setMenuOpen] = useState(false);

  const handleClick = () => navigate(isLoggedIn ? "/profile" : "/signin");
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 w-full">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <Logo className="w-8 h-8 text-gray-800 dark:text-white" />
          <span className="text-xl font-serif font-bold dark:text-white">CareerCraft</span>
        </a>

        {/* Mobile & Tablet Toggle Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden text-gray-700 dark:text-white focus:outline-none"
        >
          <i className="fas fa-bars text-xl"></i>
        </button>

        {/* Nav Links */}
        <ul
          className={`
            flex-col lg:flex lg:flex-row lg:items-center lg:gap-6
            text-sm font-medium absolute lg:static top-[70px] left-0 w-full lg:w-auto bg-white dark:bg-gray-900 z-50
            shadow-md lg:shadow-none px-4 py-4 lg:p-0
            ${menuOpen ? "flex" : "hidden"}
          `}
        >
          <NavItem to="/">Home</NavItem>
          <NavItem to="/about">About</NavItem>
          <NavItem to="/contact">Contact</NavItem>
          <NavItem to="/active">My Roadmaps</NavItem>
          <NavItem to="/input-form">New Roadmap</NavItem>

          {/* Mobile Buttons */}
          <div className="mt-4 flex flex-col gap-2 lg:hidden">
            <Button onClick={toggleTheme}>
              <i className="fa-solid fa-circle-half-stroke mr-1" />
              {darkMode ? "Light" : "Dark"}
            </Button>
            <Button onClick={handleClick}>{isLoggedIn ? "Profile" : "Sign In"}</Button>
            {isLoggedIn && <Button onClick={handleLogout}>Log Out</Button>}
          </div>
        </ul>

        {/* Desktop Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <Button onClick={toggleTheme}>
            <i className="fa-solid fa-circle-half-stroke mr-1" />
            {darkMode ? "Light" : "Dark"}
          </Button>
          <Button onClick={handleClick}>{isLoggedIn ? "Profile" : "Sign In"}</Button>
          {isLoggedIn && <Button onClick={handleLogout}>Log Out</Button>}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
