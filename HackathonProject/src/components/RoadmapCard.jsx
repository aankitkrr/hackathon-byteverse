import Button from "./Button";
import { FaTrash } from "react-icons/fa";

const RoadmapCard = ({ roadmap, onClick, onDelete }) => {
  return (
    <div className="relative w-full max-w-sm bg-white dark:bg-gray-700 rounded-xl shadow-md overflow-hidden transition transform hover:scale-[1.02] hover:shadow-blue-400/40">
      
      {onDelete && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(roadmap._id);
          }}
          className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-sm z-10"
          title="Delete Roadmap"
        >
          <FaTrash className="h-4 w-4" />
        </button>
      )}

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
          {roadmap.goal}
        </h3>

        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          Continue where you left off and track your progress.
        </p>

        <Button onClick={onClick} className="w-full mt-auto">
          Continue Learning
        </Button>
      </div>
    </div>
  );
};

export default RoadmapCard;
