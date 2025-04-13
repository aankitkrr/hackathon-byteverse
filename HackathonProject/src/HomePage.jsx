import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
const HomePage = ({ isLoggedIn }) => {
  const navigate=useNavigate();

const handleSubmit=()=>{
  navigate("/active");
}
  const handleClick=()=>{
    navigate("/input-form");
  }
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-200 ">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-5 pb-3 text-center flex flex-col items-center justify-center py-20 px-4 bg-blue-500 dark:bg-gray-800">
        <div className="absolute inset-0 bg-opacity-40 backdrop-blur-md"></div>
        <h2 className="text-5xl font-extrabold mb-4 text-white z-10 drop-shadow-[0_0_10px_rgba(0,0,0,0.5)]">
          Your Personalized Learning Roadmap
        </h2>
        <p className="text-xl mb-8 max-w-2xl text-white z-10">
          Whether you're just starting out or want to switch careers — we’ll guide you step by step.
        </p>
        <button
      onClick={handleClick}
      className="text-white bg-blue-700 font-medium rounded-lg text-sm px-4 py-2 text-center 
                 transition duration-300 ease-in-out transform hover:scale-105 hover:bg-blue-800"
    >
      Start Learning
      </button>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 pt-5 pb-5 bg-slate-400 dark:bg-gray-900">
        <h3 className="text-3xl text-center font-bold mb-8 dark:text-white drop-shadow-md">Why Choose Us?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            { title: "AI-Powered", desc: "Smart suggestions tailored to your interests." },
            { title: "Progress Tracking", desc: "Keep track of what you’ve learned." },
            { title: "Goal-Oriented", desc: "Set a goal and get a clear path to achieve it." },
          ].map((f, i) => (
            <div
              key={i}
              className="bg-gray-300 dark:bg-gray-800 rounded-xl p-6 "
            >
              <h5 className="text-xl font-bold text-blue-600 dark:text-blue-700 mb-2">{f.title}</h5>
              <p className="text-gray-700 dark:text-white">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Roadmap Previews */}
      <section className="py-16 px-4 pt-5 pb-5 bg-slate-400 dark:bg-gray-900 ">
        <h3 className="text-3xl font-bold text-center mb-10 text-gray-800 dark:text-white">Popular Roadmaps</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            { name: "Full Stack Developer", desc: "HTML, CSS, JS, React, Node, MongoDB" },
            { name: "Blockchain Enthusiast", desc: "Solidity, Ethereum, Web3.js" },
            { name: "Data Structures & Algorithms", desc: "Master problem-solving and coding rounds" },
          ].map((roadmap, i) => (
            <div
              key={i}
              className="p-6 bg-gray-300 dark:bg-gray-800  rounded-lg shadow-lg hover:shadow-blue-500/30 transition duration-300"
            >
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-blue-600 dark:text-blue-700">{roadmap.name}</h5>
              <p className="mb-3 text-gray-700 dark:text-white">{roadmap.desc}</p>
              
            </div>
          ))}
        </div>
        <button
                    type="button"
                    onClick={handleSubmit}
                    className="text-white flex justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 
                      focus:outline-none focus:ring-blue-300 font-medium rounded-lg 
                      text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 
                      dark:focus:ring-blue-800"
                  >
                  Continue Learning
                  </button>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-6 bg-slate-400 dark:bg-gray-900">
        <p className="dark:text-white text-center">©️ 2025 RoadMapr. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;