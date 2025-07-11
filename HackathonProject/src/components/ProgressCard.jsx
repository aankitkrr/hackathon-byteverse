import Button from "./Button";

const ProgressCard = ({ level, title, status, onComplete, onUndo }) => {
  const statusColor = {
    locked: "bg-gray-600",
    current: "bg-blue-600",
    complete: "bg-green-600"
  }[status];

  return (
    <div className={`min-w-[280px] p-4 rounded-xl text-white shadow-xl ${statusColor} flex flex-col`}>
      <h3 className="text-lg font-semibold mb-2">Level {level}</h3>
      <p className="flex-grow text-sm">{title}</p>
      <div className="mt-4 flex gap-2">
        {status !== "complete" && (
          <Button onClick={onComplete} className="bg-green-700 hover:bg-green-800 px-3 py-1 text-sm">
            Complete
          </Button>
        )}
        {status !== "locked" && (
          <Button onClick={onUndo} className="bg-yellow-600 hover:bg-yellow-700 px-3 py-1 text-sm">
            Undo
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProgressCard;
