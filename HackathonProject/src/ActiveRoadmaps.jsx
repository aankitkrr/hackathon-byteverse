import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const MyRoadmaps = () => {
  const [roadmaps, setRoadmaps] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoadmaps = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:3000/api/v1/roadmap", {
          headers: {
            "authorization": token,
          },
        });
        setRoadmaps(res.data.roadmap);
      } catch (err) {
        console.error("Error fetching roadmaps", err);
      }
    };

    fetchRoadmaps();
  }, []);

  const goToDashboard = (id) => {
    navigate(`/dashboard/${id}`);
  };

  return (
<div>
  <Navbar />
  <div className="h-screen bg-gray-100 dark:bg-gray-800 p-6 dark:text-white text-gray-900">
    <h1 className="text-3xl font-bold mb-6 text-center">My Roadmaps</h1>
    <div className="flex flex-wrap justify-center gap-6">
      {roadmaps.map((roadmap) => (
        <div
          key={roadmap._id}
          className="cursor-pointer bg-white dark:bg-gray-600 rounded-lg shadow-md p-6 w-80 transition-transform transform hover:scale-105 hover:shadow-xl"
          onClick={() => goToDashboard(roadmap._id)}
        >
          <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{roadmap.goal}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-300 mb-4">
          </p>
          <button
            type="button"
            className="w-full text-white bg-blue-800 hover:bg-blue-700 focus:ring-4 
              focus:outline-none focus:ring-blue-700 font-medium rounded-lg 
              text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 
              dark:focus:ring-blue-800 transition-colors duration-200"
          >
            Continue Learning
          </button>
        </div>
      ))}
    </div>
    {roadmaps.length === 0 && (
      <p className="text-center text-gray-400 mt-10">
        No roadmaps generated yet.
      </p>
    )}
  </div>
</div>

  );
};

export default MyRoadmaps;
