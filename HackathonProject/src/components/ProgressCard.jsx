import Button from "./Button";

const ProgressCard = ({ level, title, status, onComplete, onUndo }) => {
  const statusColor = {
    locked: "bg-gray-600",
    current: "bg-blue-600",
    complete: "bg-green-600",
  }[status];

  return (
    <div
      className={`
        w-full sm:min-w-[280px] max-w-md
        flex flex-col justify-between
        rounded-2xl p-5 shadow-lg text-white
        ${statusColor}
      `}
    >
      <div>
        <h3 className="text-lg font-semibold">Level {level}</h3>
        <p className="text-sm text-white/90 mt-1">{title}</p>
      </div>

      <div className="mt-4 flex flex-col md:flex-row gap-2 md:gap-3">
        {status !== "complete" && (
          <Button
            onClick={onComplete}
            className="bg-green-700 hover:bg-green-800 text-sm px-4 py-1 whitespace-nowrap"
          >
            Complete
          </Button>
        )}
        {status !== "locked" && (
          <Button
            onClick={onUndo}
            className="bg-yellow-600 hover:bg-yellow-700 text-sm px-4 py-1 whitespace-nowrap"
          >
            Undo
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProgressCard;
