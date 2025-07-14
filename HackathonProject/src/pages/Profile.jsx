import Navbar from "../components/Navbar";
import ProfileCard from "../components/ProfileCard";
import StatCard from "../components/StatCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { isLoggedIn } = useAuth();
  const [userStats, setUserStats] = useState({
    username: "",
    email: "Loading...",
    totalXP: 0,
    totalRoadmaps: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!isLoggedIn) return;

      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/profile`, {
          headers: { authorization: token }
        });
        setUserStats(res.data);
      } catch (err) {
        console.error("Failed to fetch profile data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [isLoggedIn]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-800 dark:to-gray-900 text-gray-800 dark:text-white">
      <Navbar />

      <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-extrabold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-red-400 dark:from-indigo-300 dark:via-pink-300 dark:to-yellow-200">
          Your Profile
        </h1>

        <div className="flex flex-col lg:flex-row gap-10 items-center justify-center">
          <div className="w-full max-w-sm bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-2xl p-6 transition">
            <ProfileCard
              name={userStats.username}
              email={userStats.email}
              avatar={
                !loading
                  ? `https://ui-avatars.com/api/?name=${userStats.username}&background=random`
                  : ""
              }
            />
          </div>

          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-md">
            <StatCard title="Total XP" value={`${userStats.totalXP} XP`} icon="🔥" />
            <StatCard title="Roadmaps Generated" value={userStats.totalRoadmaps} icon="🗺️" />
          </div>
        </div>

        <p className="mt-10 text-center text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
          Keep learning and progressing 🚀 — the more steps you complete, the more XP you earn. Your personalized journey awaits!
        </p>
      </main>

      <footer className="mt-auto py-6 bg-slate-400 dark:bg-gray-900 text-center text-white">
        © 2025 RoadMapr. All rights reserved.
      </footer>
    </div>
  );
};

export default Profile;
