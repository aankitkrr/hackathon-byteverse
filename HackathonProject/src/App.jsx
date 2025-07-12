import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/Register";
import InputForm from "./pages/InputForm";
import Dashboard from "./pages/Dashboard";
import LoginForm from "./pages/LoginForm";
import MyRoadmaps from "./pages/ActiveRoadmaps";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AdminPage from "./pages/AdminPage";
import HomePage from "./pages/HomePage";
import Profile from "./pages/Profile";
import GoogleSuccess from "./pages/GoogleSucess";
import CompleteProfile from "./pages/CompleteProfile";
import { Toaster } from "react-hot-toast";
import "./Main.css";

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/input-form" element={<InputForm />} />
        <Route path="/dashboard/:roadmapId" element={<Dashboard />} />
        <Route path="/signin" element={<LoginForm />} />
        <Route path="/active" element={<MyRoadmaps />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/google-success" element={<GoogleSuccess />} />
        <Route path="/complete-profile" element={<CompleteProfile />} />
        <Route path="*" element={<div className="p-4 text-center">404: Page not found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
