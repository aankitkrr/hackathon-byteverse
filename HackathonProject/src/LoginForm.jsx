import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make backend API call to register user
      const res = await fetch("http://localhost:3000/api/v1/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        // After successful registration, redirect to Home
        const token= await res.json();
        localStorage.setItem("token", token.token);
        navigate("/");
      } else {
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-200">
    <Navbar/>
    <section class="flex-1 flex items-center bg-gray-100 dark:bg-gray-800 pb-4">
        
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" class="flex items-center pt-4 mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"/>
          Login Here    
      </a>
      <div class=" bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-900 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Enter into your account
              </h1>
              <form onSubmit={handleSubmit} class="space-y-4 md:space-y-20" action="#">
              <div>
                      <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                      <input 
                      type="text" 
                      name="username" 
                      id="username" 
                      onChange={handleChange}
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                      placeholder="name@company.com" required=""/>
                  </div>
                  
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input 
                      type="password" 
                      name="password" 
                      id="password" placeholder="••••••••"
                      onChange={handleChange} 
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                  </div>
                  
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 
                      focus:outline-none focus:ring-blue-300 font-medium rounded-lg 
                      text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 
                      dark:focus:ring-blue-800"
                  >
                  Login
                  </button>
                  <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                      Do not have an account? <a href="/register" class="font-medium text-blue-600 hover:underline ">Register here</a>
                  </p>
              </form>
              
          </div>
      </div>
  </div>
</section>
<footer className="mt-auto py-6 pt-3 bg-slate-400 dark:bg-gray-900">
        <p className="dark:text-white text-center">© 2025 RoadMapr. All rights reserved.</p>
      </footer>
</div>
);
};

export default LoginPage;
