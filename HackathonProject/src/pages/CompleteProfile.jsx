import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import FormBox from "../components/FormBox";
import toast from "react-hot-toast";
import Button from "../components/Button";

const CompleteProfile = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState({});
  const [globalError, setGlobalError] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();

  useEffect(() => {
    const t = searchParams.get("token");
    if (t) setToken(t);
    else navigate("/signin");
  }, [searchParams, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError({});
    setGlobalError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({});
    setGlobalError("");
    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/api/v1/oauth/set-username", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        localStorage.setItem("token", data.token);
        toast.success("Username set successfully!");
        setIsLoggedIn(true);
        navigate("/");
      } else if (data.details) {
        const fieldErrors = {};
        for (let key in data.details) {
          fieldErrors[key] = data.details[key]._errors?.[0] || "Invalid";
        }
        setError(fieldErrors);
      } else if (data.error || data.message) {
        setGlobalError(data.error || data.message);
      } else {
        setGlobalError("Something went wrong");
      }
    } catch (err) {
      setGlobalError("Network error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-800 dark:to-gray-900 text-gray-800 dark:text-white py-12">
        <div className="w-full max-w-md px-6">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 space-y-6 dark:border dark:border-gray-700">
            <h2 className="text-2xl font-bold text-center">Complete Your Profile</h2>

            {globalError && (
              <div className="text-center text-red-600 text-sm font-medium">
                {globalError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <FormBox
                label="Username"
                type="text"
                name="username"
                placeholder="Choose your username"
                value={formData.username}
                onChange={handleChange}
                error={error.username}
              />
              <FormBox
                label="Password"
                type="password"
                name="password"
                placeholder="Set a secure password"
                value={formData.password}
                onChange={handleChange}
                error={error.password}
              />
              <Button
                type="submit"
                disabled={loading}
                className="w-full"
              >
                {loading ? "Saving..." : "Save & Continue"}
              </Button>
            </form>
          </div>
        </div>
      </main>
      <footer className="mt-auto py-6 bg-slate-400 dark:bg-gray-900 text-center text-white">
        © 2025 RoadMapr. All rights reserved.
      </footer>
    </div>
  );
};

export default CompleteProfile;
