import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/Register";
import InputForm from "./pages/InputForm";
import Dashboard from "./pages/Dashboard";
import LoginForm from "./pages/LoginForm"
import MyRoadmaps from "./pages/ActiveRoadmaps";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AdminPage from "./pages/AdminPage";
import HomePage from "./pages/HomePage";
import Profile from "./pages/Profile";
import "./Main.css";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/input-form" element={<InputForm/>}/>
          <Route path="/dashboard/:roadmapId" element={<Dashboard/>}/>
          <Route path="/signin" element={<LoginForm/>}/>
          <Route path="/active" element={<MyRoadmaps/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/dashboard" element={<MyRoadmaps/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/admin" element={<AdminPage/>}/>
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
  );
}

export default App;

