import React, { useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const InputForm = () => {
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [goal, setGoal] = useState("");
  const [level, setLevel] = useState("");
  const [availableTime, setAvailableTime] = useState("");
  const [duration, setDuration]=useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = {
      goal,
      level,
      skills,
      availableTime,
      duration
    };
  
    try {
      const token = localStorage.getItem("token"); // Make sure your token is stored in localStorage after login
    
      await axios.post("http://localhost:3000/api/v1/roadmap/generate", formData, {
        headers: {
          "authorization": token
          
        },
      });
  
      navigate("/active");
    } catch (error) {
      console.error("Error submitting form:", error);
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
        <form onSubmit={handleSubmit} className="w-full max-w-2xl bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg space-y-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-4">Personalize Your Learning</h2>

          {/* Goal */}
          <div>
            <label className="block mb-2 text-sm text-gray-900 dark:text-white font-semibold">Your Goal</label>
            <select
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              required
              className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-600"
            >
              <option value="" hidden>Select a goal</option>
              <option>SDE</option>
              <option>Data Analyst</option>
              <option>Web Developer</option>
              <option>AI/ML Enthusiast</option>
            </select>
          </div>

          {/* Level */}
          <div>
            <label className="block mb-2 text-sm text-gray-900 dark:text-white font-semibold">Your Level</label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              required
              className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-600"
            >
              <option value="" hidden>Select Your Level</option>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>

          {/* Current Skills */}
          <div>
            <label className="block mb-2 text-sm text-gray-900 dark:text-white font-semibold">
              Current Skills
            </label>

            <div className="min-h-[80px] w-full p-3 mb-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-600 flex flex-wrap gap-2">
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

          {/* Available Time */}
          <div>
            <label className="block mb-2 text-sm text-gray-900 dark:text-white font-semibold">Available Time (per week in hours)</label>
            <input
              type="number"
              value={availableTime}
              onChange={(e) => setAvailableTime(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-600"
              placeholder="e.g., 10"
            />
          </div>

          {/* Available Months for the user */}
          <div>
            <label className="block mb-2 text-sm text-gray-900 dark:text-white font-semibold">Duration (in months)</label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-600"
              placeholder="No.of months you can dedicate"
            />
          </div>


          {/* Submit */}
          <div className="text-center">
            <button
              type="submit"
              className="px-6 py-3 mt-4 bg-blue-600 rounded-full text-white dark:text-white"
            >
              Generate My Roadmap 🚀
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InputForm;
