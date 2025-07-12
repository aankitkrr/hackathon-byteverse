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
  const[loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!isLoggedIn) return;

      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/profile`, {
          headers: { authorization: token }
        });
        setUserStats(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch profile data", err);
      }
    };

    fetchProfile();
  }, [isLoggedIn]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-400 dark:from-gray-800 dark:to-gray-900 text-gray-800 dark:text-white">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-red-400 dark:from-indigo-300 dark:via-pink-300 dark:to-yellow-200 mb-12">
          Your Profile
        </h1>

        <div className="flex flex-col md:flex-row gap-10 items-center justify-center">
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl shadow-xl p-6 hover:shadow-2xl transition w-[320px]">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <StatCard title="Total XP" value={`${userStats.totalXP} XP`} icon="🔥" />
            <StatCard title="Roadmaps Generated" value={userStats.totalRoadmaps} icon="🗺️" />
          </div>
        </div>

        <p className="mt-10 text-center text-lg text-gray-700 dark:text-gray-300 max-w-xl mx-auto">
          Keep learning and progressing 🚀 — the more steps you complete, the more XP you earn. Your personalized journey awaits!
        </p>
      </div>
    </div>
  );
};

export default Profile;
