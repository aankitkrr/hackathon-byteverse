import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import RoadmapCard from "../components/RoadmapCard";
import { useAuth } from "../context/AuthContext";

const MyRoadmaps = () => {
  const [roadmaps, setRoadmaps] = useState([]);
  const { isLoggedIn } = useAuth();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) return;

    const fetchRoadmaps = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/roadmap`,
          {
            headers: { authorization: token },
          }
        );
        setRoadmaps(res.data.roadmap);
      } catch (err) {
        console.error("Error fetching roadmaps", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmaps();
  }, [isLoggedIn]);

  const deleteRoadmap = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/roadmap/${id}`,
        {
          headers: { authorization: localStorage.getItem("token") },
        }
      );
      setRoadmaps((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const goToDashboard = (id) => navigate(`/dashboard/${id}`);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-800 dark:to-gray-900 text-gray-800 dark:text-white">
      <Navbar />
      <div className="flex-1">
        {!isLoggedIn ? (
          <div className="flex flex-col items-center justify-center h-[80vh] text-center px-4">
            <h1 className="text-2xl sm:text-3xl font-bold mb-4">
              You need to be logged in
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm sm:text-base">
              Please sign in to view and manage your roadmaps.
            </p>
            <Button onClick={() => navigate("/signin")}>Login Now</Button>
          </div>
        ) : loading ? (
          <div className="flex justify-center items-center h-[60vh]">
            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-600 border-solid"></div>
          </div>
        ) : (
          <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 ">
            <h1 className="text-3xl sm:text-4xl font-extrabold mb-10 text-center tracking-tight">
              Your Roadmaps
            </h1>

            <div className="flex justify-center">
              {roadmaps.length > 0 ? (
                <div className="grid gap-6 sm:gap-8 justify-items-center sm:grid-cols-2 md:grid-cols w-full max-w-6xl">
                  {roadmaps.map((roadmap) => (
                    <RoadmapCard
                      key={roadmap._id}
                      roadmap={roadmap}
                      onClick={() => goToDashboard(roadmap._id)}
                      onDelete={deleteRoadmap}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center mt-20 px-4 animate-fade-in">
                  <p className="text-base sm:text-lg font-medium text-gray-600 dark:text-gray-400">
                    You haven't generated any roadmaps yet.
                  </p>
                  <Button
                    onClick={() => navigate("/input-form")}
                    className="mt-6"
                  >
                    Generate Now 🚀
                  </Button>
                </div>
              )}
            </div>
          </main>
        )}
      </div>
      <footer className="w-full py-6  bg-slate-400 dark:bg-gray-900 text-center text-white">
        © 2025 RoadMapr. All rights reserved.
      </footer>
    </div>
  );
};

export default MyRoadmaps;
