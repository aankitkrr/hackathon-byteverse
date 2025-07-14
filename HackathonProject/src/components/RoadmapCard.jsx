import Button from "./Button";
import { FaTrash } from "react-icons/fa";

const RoadmapCard = ({ roadmap, onClick, onDelete }) => {
  return (
    <div className="relative w-full max-w-sm bg-white dark:bg-gray-700 rounded-2xl shadow-md overflow-hidden transition-transform duration-200 hover:scale-[1.02] hover:shadow-blue-400/40 flex flex-col">
      
      {/* Delete Button */}
      {onDelete && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(roadmap._id);
          }}
          className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow z-10"
          title="Delete Roadmap"
        >
          <FaTrash className="w-4 h-4" />
        </button>
      )}

      <div className="p-6 flex flex-col h-full">
        <h3 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-white mb-2 line-clamp-2">
          {roadmap.goal}
        </h3>

        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          Continue where you left off and track your progress.
        </p>

        <div className="mt-auto">
          <Button onClick={onClick} className="w-full text-sm md:text-base">
            Continue Learning
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RoadmapCard;
