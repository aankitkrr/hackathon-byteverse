import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import FormBox from "../components/FormBox";
import { useAuth } from "../context/AuthContext";
import GoogleLoginButton from "../components/GoogleButton";
import toast from "react-hot-toast";

const LoginPage = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();

  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Login failed");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", data.token);
      toast.success("Logged in successfully");
      setIsLoggedIn(true);
      navigate("/");
    } catch (error) {
      setError("Something went wrong. Try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-800 dark:to-gray-900 text-gray-800 dark:text">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 py-8">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-600 border-solid"></div>
          </div>
        ) : (
          <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow p-6 sm:p-8 space-y-6">
            <div className="text-center">
              <img
                className="mx-auto w-10 h-10 mb-4"
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                alt="logo"
              />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Login Here</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Enter into your account
              </p>
            </div>

            <GoogleLoginButton />
            <div className="text-sm text-center text-gray-500 dark:text-gray-400">or</div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <FormBox
                label="Username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
              />
              <FormBox
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
              />
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition"
              >
                Login
              </button>

              {error && (
                <p className="text-sm text-red-500 text-center">{error}</p>
              )}

              <p className="text-sm text-center text-gray-600 dark:text-gray-400">
                Don’t have an account?{" "}
                <a
                  href="/register"
                  className="font-medium text-blue-600 hover:underline dark:text-blue-400"
                >
                  Register here
                </a>
              </p>
            </form>
          </div>
        )}
      </main>

      <footer className="py-4 bg-slate-400 dark:bg-gray-900 text-center text-white">
        © 2025 RoadMapr. All rights reserved.
      </footer>
    </div>
  );
};

export default LoginPage;
