const GoogleLoginButton = () => {
  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/google`;
  };

  return (
    <button
      type="button"
      onClick={handleGoogleLogin}
      className="
        w-full px-4 py-2 sm:px-6 sm:py-2.5
        flex items-center justify-center gap-2
        text-sm sm:text-base font-medium
        text-black dark:text-white
        bg-gray-200 hover:bg-gray-300
        dark:bg-gray-600 dark:hover:bg-gray-700
        focus:outline-none focus:ring-2 focus:ring-red-300
        rounded-lg transition duration-200 ease-in-out
      "
    >
      <img src="/google_logo.jpeg" alt="Google" className="w-5 h-5 rounded-full" />
      <span>Login with Google</span>
    </button>
  );
};

export default GoogleLoginButton;
