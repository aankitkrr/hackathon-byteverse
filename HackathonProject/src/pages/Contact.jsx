import Navbar from "../components/Navbar";
import TeamMemberCard from "../components/TeamMemberCard";

const teamMembers = [
  {
    name: "Ankit Kumar",
    email: "ankitk.ug22.ee@nitp.ac.in",
    image: "/pic3.jpg",
    description: "Backend Developer focusing on scalable APIs, database design and frontend integration",
  },
  {
    name: "Nandini Kumari",
    email: "nandinik.ug22.ee@nitp.ac.in",
    image: "/Nandini.jpeg",
    description: "Frontend Developer passionate about building sleek, user-friendly interfaces.",
  },
  {
    name: "Vansh Gupta",
    email: "vanshg.ug22.ee@nitp.ac.in",
    image: "/Vansh.jpeg",
    description: "CP Enthusiast and focus on optimizing code.",
  },
];

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-800 dark:to-gray-900 text-gray-800 dark:text-white">
      <Navbar />

      <main className="flex-grow px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-12">
          Meet Our Team
        </h1>

        <div className="flex justify-center">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto px-4">
            {teamMembers.map((member, idx) => (
              <TeamMemberCard key={idx} {...member} />
            ))}
          </div>
        </div>
      </main>

      <footer className="w-full py-6 bg-slate-400 dark:bg-gray-900 text-center text-white">
        © 2025 RoadMapr. All rights reserved.
      </footer>
    </div>
  );
};

export default Contact;
