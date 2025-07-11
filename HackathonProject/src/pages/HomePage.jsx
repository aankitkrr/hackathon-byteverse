import Navbar from "../components/Navbar";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const handleStartLearning = () => navigate("/input-form");
  const handleContinueLearning = () => navigate("/active");

  const features = [
    { title: "AI-Powered", desc: "Smart suggestions tailored to your interests." },
    { title: "Progress Tracking", desc: "Keep track of what you’ve learned." },
    { title: "Goal-Oriented", desc: "Set a goal and get a clear path to achieve it." },
  ];

  const popularRoadmaps = [
    { name: "Full Stack Developer", desc: "HTML, CSS, JS, React, Node, MongoDB" },
    { name: "Blockchain Enthusiast", desc: "Solidity, Ethereum, Web3.js" },
    { name: "Data Structures & Algorithms", desc: "Master problem-solving and coding rounds" },
  ];

  return (
    <div className="flex flex-col">
      <Navbar />
      <section className="flex flex-col items-center justify-center text-center py-20 px-4 bg-blue-500 dark:bg-gray-800 relative">
        <div className="absolute inset-0 bg-black opacity-30 backdrop-blur-sm"></div>
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-white drop-shadow-lg">
            Your Personalized Learning Roadmap
          </h1>
          <p className="text-lg md:text-xl mb-6 text-white">
            Whether you're just starting out or want to switch careers — we’ll guide you step by step.
          </p>
          <Button onClick={handleContinueLearning} className="text-sm px-6 py-3 rounded-full">
            Continue Learning
          </Button>
        </div>
      </section>

      <section className="py-16 px-4 bg-gray-100 dark:bg-gray-900">
        <h2 className="text-3xl font-bold text-center mb-10 transition hover:scale-[1.04]">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow hover:shadow-lg hover:cursor-pointer hover:shadow-blue-400/40 transition hover:scale-[1.01] flex flex-col justify-between"
            >
              <h4 className="text-xl font-bold mb-2 text-blue-700 dark:text-blue-500">{feature.title}</h4>
              <p className="text-gray-700 dark:text-gray-300">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-4 bg-gray-200 dark:bg-gray-900">
        <h2 className="text-3xl font-bold text-center mb-10 transition hover:scale-[1.04]">Popular Roadmaps</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {popularRoadmaps.map((roadmap, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-l hover:cursor-pointer hover:shadow-blue-400/40 transition  hover:scale-[1.01]"
            >
              <h5 className="text-2xl font-bold mb-2 text-blue-700 dark:text-blue-400">
                {roadmap.name}
              </h5>
              <p className="text-gray-700 dark:text-gray-200">{roadmap.desc}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-10">
          <Button onClick={handleStartLearning} className="text-sm px-6 py-3 rounded-full">
            Start Learning
          </Button>
        </div>
      </section>

      <footer className="mt-auto py-6 bg-slate-400 dark:bg-gray-900 text-center">
        <p className="dark:text-white">©️ 2025 RoadMapr. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;