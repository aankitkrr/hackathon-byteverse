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
      }
    } else {
      toast.error("Missing token in URL");
      navigate("/signin");
    }

    setLoading(false);
  }, [navigate, setIsLoggedIn]);

  return (
    <div className="h-screen flex flex-col items-center justify-center text-xl text-gray-800 dark:text-white">
      {loading ? (
        <>
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-600 border-solid mb-4"></div>
          <p>Logging you in via Google...</p>
        </>
      ) : (
        <p>Redirecting...</p>
      )}
    </div>
  );
};

export default GoogleSuccess;
