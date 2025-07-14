import Navbar from "../components/Navbar";
import Section from "../components/Section";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-800 dark:to-gray-900 text-gray-800 dark:text-white">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-10 leading-tight">
          About Roadmap Recommender
        </h1>

        <p className="text-base sm:text-lg mb-8 text-center text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
          Welcome to <span className="font-semibold text-blue-500">Roadmap Recommender</span> — your personalized learning assistant that helps you grow based on your goals, skills, and schedule.
        </p>

        <Section title="🎯 Our Mission">
          <p>
            We aim to eliminate the guesswork from your learning journey. Instead of endlessly browsing tutorials, we provide curated roadmaps tailored to your career path — whether you're aiming to become a Software Engineer, Web Developer, Data Analyst, or AI/ML Specialist.
          </p>
        </Section>

        <Section title="⚙️ How It Works">
          <ul className="list-disc list-inside space-y-2 text-base sm:text-lg">
            <li><strong>Choose your Goal:</strong> Pick what you want to become.</li>
            <li><strong>Select your Level:</strong> Beginner, Intermediate, or Advanced.</li>
            <li><strong>Set Weekly Time:</strong> Tailored to how much time you can spend.</li>
            <li><strong>Receive Your Roadmap:</strong> Structured, trackable, and smart suggestions.</li>
          </ul>
        </Section>

        <Section title="🚀 Why Use Roadmap Recommender?">
          <ul className="list-disc list-inside space-y-2 text-base sm:text-lg">
            <li>No more confusion or information overload.</li>
            <li>Structured plans curated just for you.</li>
            <li>Track your progress and stay consistent.</li>
          </ul>
        </Section>

        <p className="mt-10 text-center text-base sm:text-lg text-gray-700 dark:text-gray-300 max-w-xl mx-auto">
          Start your journey today — let us guide you to success! 🎓✨
        </p>
      </main>
      <footer className="w-full py-6  bg-slate-400 dark:bg-gray-900 text-center text-white">
        © 2025 RoadMapr. All rights reserved.
      </footer>
    </div>
  );
};

export default About;
