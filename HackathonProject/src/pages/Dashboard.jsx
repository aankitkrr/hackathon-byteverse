import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import ProgressCard from "../components/ProgressCard";
import StatCard from "../components/StatCard";

const Dashboard = () => {
  const [progressData, setProgressData] = useState([]);
  const [totalXP, setTotalXP] = useState(0);
  const [loading, setLoading] = useState(true);
  const { roadmapId } = useParams();

  const fetchProgress = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/roadmap/${roadmapId}`, {
        headers: { Authorization: token },
      });

      setProgressData(res.data.roadmap.progress || []);
      setTotalXP(res.data.roadmap.progress.reduce((acc, step) => acc + step.xp, 0));
    } catch (err) {
      console.error("Error fetching progress:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (roadmapId) fetchProgress();
  }, [roadmapId]);

  const handleAction = async (action, title = null) => {
    try {
      const token = localStorage.getItem("token");
      const endpoint = `${import.meta.env.VITE_BACKEND_URL}/api/v1/roadmap/${action}`;
      const payload = title ? { title, roadmapId } : { roadmapId };

      const res = await axios.post(endpoint, payload, {
        headers: { Authorization: token },
      });

      setProgressData(res.data.userProgress.progress || []);
      setTotalXP(res.data.userProgress.totalXP || 0);
    } catch (err) {
      console.error(`Error during ${action}:`, err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen px-4 py-8 bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-800 dark:to-gray-900 text-gray-800 dark:text-white">
        <h2 className="text-3xl font-bold text-center mb-6">Your Learning Progress</h2>

        <div className="grid gap-4 sm:grid-cols-2 justify-center max-w-xl mx-auto mb-10">
          <StatCard title="XP Earned" value={totalXP} />
          <StatCard title="Total Levels" value={progressData.length} />
        </div>


        {loading ? (
          <div className="flex justify-center items-center h-[60vh]">
            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-600 border-solid"></div>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-6">
            <div className="flex justify-center mb-8">
              <Button
                onClick={() => handleAction("reset")}
                className="bg-red-600 hover:bg-red-700 px-5 py-2 text-white rounded text-sm sm:text-base"
              >
                Reset Progress
              </Button>
            </div>


            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto mt-4 px-4">
              {progressData.map((step, index) => (
                <ProgressCard
                  key={index}
                  level={index + 1}
                  title={step.title}
                  status={step.status}
                  onComplete={() => handleAction("complete", step.title)}
                  onUndo={() => handleAction("undo", step.title)}
                />
              ))}
            </div>

          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
