import React from "react";
import Navbar from "./Navbar";

const teamMembers = [
  {
    name: "Ankit Kumar",
    email: "ankit@gmail.com",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    description: "Backend Developer focusing on scalable APIs and database design.",
  },
  {
    name: "Nandini Kumari",
    email: "nandini@gmail.com",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    description: "Frontend Developer passionate about building sleek, user-friendly interfaces",
  },
  {
    name: "Vansh Gupta",
    email: "vansh@gmail.com",
    image: "https://randomuser.me/api/portraits/women/47.jpg",
    description: "Machine Learning enthusiast working on smart roadmap generation.",
  },
];

const Contact = () => {
  return (
    <div className="h-screen w-full bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Navbar />
      <div className="w-6xl mx-auto px-6 py-16 pt-5">
        <h1 className="text-4xl font-bold text-center mb-12">Meet Our Team</h1>

        <div className="grid gap-10 md:grid-cols-3 pt-5 pr-4 pl-4 mr-3 sm:grid-cols-1 h-4xl">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 pl-3 mr-3 rounded-xl shadow-lg overflow-hidden text-center p-6"
            >
              <h2 className="text-xl font-semibold mb-2">{member.name}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{member.description}</p>
              <a
                href={`mailto:${member.email}`}
                className="text-blue-500 hover:underline"
              >
                {member.email}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;
