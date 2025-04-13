import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";

const Dashboard = () => {
  const [progressData, setProgressData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { roadmapId } = useParams();

  const fetchProgress = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:3000/api/v1/roadmap/${roadmapId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setProgressData(response.data.roadmap.progress || []);
    } catch (err) {
      console.error("Error fetching progress:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (roadmapId) {
      fetchProgress();
    }
  }, [roadmapId]);

  const handleAction = async (action, title = null) => {
    try {
      const token = localStorage.getItem("token");
      const endpoint = `http://localhost:3000/api/v1/roadmap/${action}`;
      const payload = title ? { title } : {};
      const response = await axios.post(endpoint, payload, {
        headers: {
          Authorization: token,
        },
      });
      setProgressData(response.data.userProgress.progress || []);
    } catch (err) {
      console.error(`Error during ${action}:`, err);
    }
  };

  if (loading) {
    return (
      <div className="dark:bg-gray-800 h-screen text-white flex justify-center items-center">
        <p>Loading roadmap...</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="dark:bg-gray-800 h-screen text-white">
        <h2 className="text-3xl font-bold text-center pt-10 text-gray-900 dark:text-white">
          Your Learning Progress
        </h2>

        <div className="mt-8 overflow-x-auto px-6">
          {progressData.length === 0 ? (
            <p className="text-center text-gray-300 mt-10">
              No progress found
            </p>
          ) : (
            <div className="flex flex-col items-center space-y-6">
              <button
                onClick={() => handleAction("reset")}
                className="mb-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
              >
                Reset Progress
              </button>
              <div className="flex space-x-6 w-max mx-auto">
                {progressData.map((item, index) => {
                  let bgColor = "bg-gray-600";
                  let isLocked = true;

                  if (item.status === "complete") {
                    bgColor = "bg-green-500";
                    isLocked = false;
                  } else if (item.status === "current") {
                    bgColor = "bg-blue-500";
                    isLocked = false;
                  }

                  return (
                    <div
                      key={index}
                      className={`min-w-[300px] h-48 p-4 rounded-xl shadow-lg text-white ${bgColor} flex flex-col justify-center items-center transition duration-300`}
                    >
                      <h3 className="text-xl font-bold mb-2">Level {index + 1}</h3>
                      <p className="text-center">{item.title}</p>
                      <div className="mt-4 flex space-x-2">
                        {item.status !== "complete" && (
                          <button
                            onClick={() => handleAction("complete", item.title)}
                            className="px-3 py-1 bg-green-700 hover:bg-green-800 text-white rounded"
                          >
                            Complete
                          </button>
                        )}
                        {item.status !== "locked" && (
                          <button
                            onClick={() => handleAction("undo", item.title)}
                            className="px-3 py-1 bg-yellow-600 hover:bg-yellow-700 text-white rounded"
                          >
                            Undo
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
