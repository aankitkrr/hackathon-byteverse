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

  const [formData, setFormData] = useState({ username: "", password: ""});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/v1/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      
      const data = await res.json();
      if(!res.ok){
        setError(data.message || "Login failed");
        return;
      }

      localStorage.setItem("token", data.token);
      toast.success("Logged In sucessfully");
      setIsLoggedIn(true);
      setLoading(false);
      navigate("/");
    } catch (error) {
      setError("Something went wrong. Try again.");
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-200">
      <Navbar />
      <section className="flex-1 flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-800 dark:to-gray-900 text-gray-800 dark:text-white pb-4">
        {(loading ? <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-600 border-solid"></div>
          </div> :
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto sm:max-w-md">
          <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
            Login Here    
          </div>

          <div className="bg-white rounded-lg shadow dark:border dark:bg-gray-900 dark:border-gray-700 w-full p-6 space-y-6">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Enter into your account
            </h1>

            <GoogleLoginButton />
            <div className="text-sm text-center text-gray-500 dark:text-gray-400">or</div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <FormBox label="Username"
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
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 
                focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 
                dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Login
              </button>

              {error && (
                <p className="text-sm text-red-500 text-center">
                  {error}
                </p>
              )}

              <p className="text-sm font-light text-gray-500 dark:text-gray-400 text-center">
                Don’t have an account?{" "}
                <a href="/register" className="font-medium text-blue-600 hover:underline">
                  Register here
                </a>
              </p>
            </form>
          </div>
        </div>)}
      </section>

      <footer className="mt-auto py-6 pt-3 bg-slate-400 dark:bg-gray-900">
        <p className="dark:text-white text-center">© 2025 RoadMapr. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LoginPage;