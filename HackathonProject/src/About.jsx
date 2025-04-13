import React from "react";
import Navbar from "./Navbar";

const About = () => {
  return (
    <div className=" h-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white">
      <Navbar />
      <div className="max-w-4xl mx-auto pl-10 pt-16 pb-5">
        <h1 className="text-4xl font-bold text-center mb-8">
          About Roadmap Recommender
        </h1>

        <p className="text-lg mb-6 leading-relaxed text-gray-700 dark:text-gray-300">
          Welcome to <span className="font-semibold text-blue-500">Roadmap Recommender</span> — your personalized
          learning assistant designed to help you grow based on your unique goals,
          skill levels, and time availability.
        </p>

        <h2 className="text-2xl font-semibold mb-4 text-blue-400">🎯 Our Mission</h2>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          We aim to eliminate the guesswork from your learning journey. Instead of
          endlessly browsing for tutorials and courses, we provide curated roadmaps
          that suit your goals — whether you're aiming to become a Software Engineer,
          Web Developer, Data Analyst, or AI/ML Specialist.
        </p>

        <h2 className="text-2xl font-semibold mb-4 text-blue-400">⚙️ How It Works</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
          <li><strong>Choose your Goal:</strong> Pick what you want to become.</li>
          <li><strong>Select your Level:</strong> Beginner, Intermediate, or Advanced.</li>
          <li><strong>Set your Weekly Time:</strong> We tailor the roadmap to your availability.</li>
          <li><strong>Get a Personalized Roadmap:</strong> Structured and smart recommendations, ready to follow!</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-10 mb-4 text-blue-400">🚀 Why Use Roadmap Recommender?</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
          <li>No more confusion or information overload.</li>
          <li>Structured plans created just for you.</li>
          <li>Track your progress and stay consistent.</li>
        </ul>

        <p className="mt-8 text-center text-lg text-gray-700 dark:text-gray-300">
          Start your learning journey today and let us guide you to success! 🎓✨
        </p>
      </div>
    </div>
  );
};

export default About;
