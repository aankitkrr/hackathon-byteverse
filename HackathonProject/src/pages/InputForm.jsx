import { useState } from "react";
import Navbar from "../components/Navbar";
import FormBox from "../components/FormBox";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const InputForm = () => {
  const { isLoggedIn } = useAuth();
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [goal, setGoal] = useState("");
  const [level, setLevel] = useState("");
  const [availableTime, setAvailableTime] = useState("");
  const [duration, setDuration] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) return alert("Please login to generate roadmap.");
    if (loading) return;

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/roadmap/generate`,
        { goal, level, skills, availableTime, duration },
        { headers: { authorization: token } }
      );
      navigate("/active");
    } catch (error) {
      console.error("Error generating roadmap:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSkill = (e) => {
    if (e.key === "Enter" && skillInput.trim()) {
      e.preventDefault();
      if (!skills.includes(skillInput.trim())) {
        setSkills([...skills, skillInput.trim()]);
        setSkillInput("");
      }
    }
  };

  const removeSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-100 dark:bg-gray-800 text-white flex items-center justify-center p-6">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg space-y-6"
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-4">
            Personalize Your Learning
          </h2>

          <FormBox
            label="Your Goal"
            name="goal"
            type="select"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            options={["SDE", "Data Analyst", "Web Developer", "AI/ML Enthusiast"]}
            placeholder="Select your goal"
          />

          <FormBox
            label="Your Level"
            name="level"
            type="select"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            options={["Beginner", "Intermediate", "Advanced"]}
            placeholder="Select your level"
          />

          <div>
            <label className="block mb-2 text-sm text-gray-900 dark:text-white font-semibold">
              Current Skills
            </label>
            <div className="w-full p-3 mb-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-600 flex flex-wrap gap-2">
              {skills.length === 0 && (
                <span className="text-gray-400 dark:text-gray-500">No skills added yet</span>
              )}
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-500 px-3 py-1 rounded-full text-white flex items-center gap-2 text-sm"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(index)}
                    className="text-black font-bold hover:text-red-700"
                  >
                    x
                  </button>
                </span>
              ))}
            </div>
            <input
              type="text"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={handleAddSkill}
              placeholder="Type a skill and press Enter"
              className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-600"
            />
          </div>

          <FormBox
            label="Available Time (per week in hours)"
            type="number"
            name="availableTime"
            value={availableTime}
            onChange={(e) => setAvailableTime(e.target.value)}
            placeholder="Optional"
            required={false}
          />

          <FormBox
            label="Duration (in months)"
            type="number"
            name="duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="Optional"
            required={false}
          />

          <div className="text-center">
            <Button
              type="submit"
              className={`px-6 py-3 mt-4 inline-flex items-center justify-center gap-2 ${
                loading ? "cursor-not-allowed opacity-70" : ""
              }`}
              disabled={!isLoggedIn || loading}
            >
              {loading && (
                <span className="inline-block animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></span>
              )}
              {loading ? "Generating..." : "Generate My Roadmap 🚀"}
            </Button>

            {!isLoggedIn && (
              <p className="mt-2 text-sm text-red-500">
                Please login to generate a roadmap
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default InputForm;