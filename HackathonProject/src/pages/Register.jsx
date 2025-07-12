import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import FormBox from "../components/FormBox";
import GoogleLoginButton from "../components/GoogleButton";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [globalError, setGlobalError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFieldErrors("");
    setGlobalError("");
  };

  const validatePasswordsMatch = () => {
    if (formData.password !== formData.confirmPassword) {
      setFieldErrors((prev) => ({
        ...prev,
        confirmPassword: "Passwords do not match",
      }));
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validatePasswordsMatch()) return;
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();
      setLoading(false);
      if (res.ok) return navigate("/signin");
      if (data.details) {
        const errors = {};
        for (let key in data.details) {
          errors[key] = data.details[key]._errors?.[0] || "Invalid";
        }
        setFieldErrors(errors);
      }else if(data.error || data.message) {
        setGlobalError(data.error || data.message);
      }else{
        setGlobalError("Registration failed");
      }
    } catch (err) {
      setGlobalError("Something went wrong. Please try again later.");
    }
  };

  const fields = [
    {
      label: "Enter Your Username",
      type: "text",
      name: "username",
      placeholder: "Your username",
    },
    {
      label: "Your email",
      type: "email",
      name: "email",
      placeholder: "name@company.com",
    },
    {
      label: "Password",
      type: "password",
      name: "password",
      placeholder: "••••••••",
    },
    {
      label: "Confirm password",
      type: "password",
      name: "confirmPassword",
      placeholder: "••••••••",
    },
  ];

  return (
    <div className="flex flex-col h-screen">
      <Navbar />

      <main className="flex-1 flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-800 dark:to-gray-900 text-gray-800 dark:text-white py-8">
        {(loading ? <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-600 border-solid"></div>
          </div> : 
        <div className="w-full max-w-md px-6">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 space-y-6 dark:border dark:border-gray-700">
            <header className="text-center space-y-2">
              <div className="flex justify-center items-center gap-3">
                <img
                  className="w-8 h-8"
                  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                  alt="logo"
                />
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Sign Up Here
                </h2>
              </div>
              <h1 className="text-xl font-bold text-gray-800 dark:text-white">
                Create an account
              </h1>
            </header>

            {globalError && (
              <div className="text-center text-red-600 text-sm font-medium">
                {globalError}
              </div>
            )}

            <GoogleLoginButton />
            <div className="text-sm text-center text-gray-500 dark:text-gray-400">or</div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {fields.map((field) => (
                <FormBox
                  key={field.name}
                  {...field}
                  value={formData[field.name]}
                  onChange={handleChange}
                  error={fieldErrors[field.name]}
                />
              ))}

              <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 
                focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm 
                px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 
                dark:focus:ring-blue-800"
              >
                Register
              </button>

              <p className="text-sm text-center font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <a
                  href="/signin"
                  className="font-medium text-blue-600 hover:underline"
                >
                  Login here
                </a>
              </p>
            </form>
          </div>
        </div> )}
      </main>

      <footer className="mt-auto py-6 bg-slate-400 dark:bg-gray-900">
        <p className="text-center dark:text-white">
          © 2025 RoadMapr. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default RegisterPage;
