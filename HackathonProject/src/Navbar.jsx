import React, { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import { useNavigate } from "react-router-dom";

const Navbar = ({ isLoggedIn }) => {
  const navigate=useNavigate();
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  const handleClick=()=>{
    navigate("/signin")
  }
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
  <path fill-rule="evenodd" d="M11.906 1.994a8.002 8.002 0 0 1 8.09 8.421 7.996 7.996 0 0 1-1.297 3.957.996.996 0 0 1-.133.204l-.108.129c-.178.243-.37.477-.573.699l-5.112 6.224a1 1 0 0 1-1.545 0L5.982 15.26l-.002-.002a18.146 18.146 0 0 1-.309-.38l-.133-.163a.999.999 0 0 1-.13-.202 7.995 7.995 0 0 1 6.498-12.518ZM15 9.997a3 3 0 1 1-5.999 0 3 3 0 0 1 5.999 0Z" clip-rule="evenodd"/>
</svg>

          <span className="self-center text-2xl font-serif font-bold whitespace-nowrap dark:text-white">
            CareerCraft
          </span>
        </a>

        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button
            onClick={toggleTheme}
            className="bg-gray-200 px-3 py-3 mr-2 rounded dark:text-white dark:bg-gray-600"
          >
            <i className="fa-solid fa-circle-half-stroke"></i>
            <span> {darkMode ? " Light" : " Dark"}</span>
          </button>

          <button
            type="button"
            onClick={handleClick}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 
              focus:outline-none focus:ring-blue-300 font-medium rounded-lg 
              text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 
              dark:focus:ring-blue-800"
          >
            Login/SignUp
          </button>

        <button
          type="button"
          onClick={() => {
            localStorage.removeItem("token"); // or localStorage.clear(); to clear everything
            navigate("/"); // redirect to home or login
          }}
          className="text-white bg-blue-700 ml-3 hover:bg-blue-800 focus:ring-4 
            focus:outline-none focus:ring-blue-300 font-medium rounded-lg 
            text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 
            dark:focus:ring-blue-800"
        >
          LogOut
        </button>

          <button
            data-collapse-toggle="navbar-cta"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center 
              text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 
              focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 
              dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-cta"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-cta"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 
            rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 
            md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
          >
            <li>
              <a
                href="/"
                className="block py-2 px-3 md:p-0 text-white bg-blue-700 rounded-sm 
                  md:bg-transparent md:text-blue-700 md:dark:text-blue-500"
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/about"
                className="block py-2 px-3 md:p-0 text-gray-900 rounded-sm hover:bg-gray-100 
                  md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 
                  dark:text-white dark:hover:bg-gray-700 dark:hover:text-white 
                  md:dark:hover:bg-transparent dark:border-gray-700"
              >
                About
              </a>
            </li>
            
            <li>
              <a
                href="/contact"
                className="block py-2 px-3 md:p-0 text-gray-900 rounded-sm hover:bg-gray-100 
                  md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 
                  dark:text-white dark:hover:bg-gray-700 dark:hover:text-white 
                  md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
