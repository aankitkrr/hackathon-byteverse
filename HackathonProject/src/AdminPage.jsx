import React, { useState } from "react";
import Navbar from "./Navbar";

const AdminPage = () => {
  const [goal, setGoal] = useState("");
  const [title, setTitle] = useState([]);
  const [titleInput, setTitleInput] = useState("");
  const [level, setLevel] = useState("");

  const handleAddTitle = (e) => {
    if (e.key === "Enter" && titleInput.trim()) {
      e.preventDefault();
      if (!title.includes(titleInput.trim())) {
        setTitle([...title, titleInput.trim()]);
        setTitleInput("");
      }
    }
  };

  const removeTitle = (index) => {
    setTitle(title.filter((_, i) => i !== index));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!goal.trim() || title.length === 0 || !level.trim()) {
        alert("Please fill in all fields before submitting.");
        return;
      }

    const token = localStorage.getItem("token"); // adjust if stored differently

    try {
      const response = await fetch("http://localhost:3000/api/v1/admin/roadmap", {
        method: "POST",
        headers: {
          
          "authorization": token
        },
        body: JSON.stringify({ goal, title, level })
      });

      const data = await response.json();
      if (response.ok) {
        alert("Roadmap created successfully");
        setGoal("");
        setTitle("");
        setLevel("");
      } else {
        alert(data.message || "Failed to create roadmap");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
    <Navbar/>
    <div className="h-screen bg-gray-100 dark:bg-gray-800 flex justify-center items-center p-6 text-white">
        
      <form  onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md space-y-6">
        <h2 className="text-2xl font-bold text-center">Add Roadmap Info</h2>

        <div>
          <label className="block mb-2  text-gray-900 dark:text-white">Goal</label>
          <input
            type="text"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            required
            placeholder="Enter your goal"
            className="w-full p-3 rounded bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white "
          />
        </div>

        <div>
            <label className="block mb-2 text-sm text-gray-900 dark:text-white font-semibold">
              Title
            </label>

            <div className="min-h-[80px] w-full p-3 mb-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-600 flex flex-wrap gap-2">
              {title.length === 0 && (
                <span className="text-gray-400 dark:text-gray-500">No skills added yet</span>
              )}
              {title.map((title, index) => (
                <span
                  key={index}
                  required
                  className="bg-blue-500 px-3 py-1 rounded-full text-white flex items-center gap-2 text-sm"
                >
                  {title}
                  <button
                    type="button"
                    onClick={() => removeTitle(index)}
                    className="text-black font-bold hover:text-red-700"
                  >
                    x
                  </button>
                </span>
              ))}
            </div>

            <input
              type="text"
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
              onKeyDown={handleAddTitle}
              placeholder="Type a skill and press Enter"
              className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-600"
            />
          </div>

        <div>
          <label className="block mb-2">Level</label>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            required
            className="w-full p-3 rounded bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-600"
          >
            <option value="" hidden>Select Level</option>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </div>

        <button  type="submit" className="w-full bg-blue-600 py-3 rounded hover:bg-blue-500">
          Submit
        </button>
      </form>
    </div>
    </>
  );
};

export default AdminPage;
