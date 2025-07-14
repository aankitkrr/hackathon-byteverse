import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const GoogleSuccess = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token");

    if (token) {
      try {
        localStorage.setItem("token", token);
        setIsLoggedIn(true);
        toast.success("Logged in via Google successfully!");
        setTimeout(() => navigate("/"), 1000);
      } catch (err) {
        console.error("Token error", err);
        toast.error("Failed to log in");
        navigate("/signin");
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Missing token in URL");
      navigate("/signin");
      setLoading(false);
    }
  }, [navigate, setIsLoggedIn]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-gray-800 dark:text-white px-4">
      {loading ? (
        <>
          <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full mb-4"></div>
          <p className="text-lg font-medium">Logging you in via Google...</p>
        </>
      ) : (
        <p className="text-lg font-medium animate-pulse">Redirecting...</p>
      )}
    </div>
  );
};

export default GoogleSuccess;
