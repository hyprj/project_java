import type { Workout } from "./types";

interface DayProps {
  date: Date;
  data: Workout[];
  onEdit: (workout: Workout) => void;
  onAdd: (date: Date) => void;
}

export const Day = ({ date, data, onEdit, onAdd }: DayProps) => {
  const dayData = data
    .filter((workout) => {
      const workoutDate = new Date(workout.startDate);
      return workoutDate.toDateString() === date.toDateString();
    })
    .sort(
      (a, b) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
    );

  const formatTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      className="group relative border-r last:border-r-0 p-2 h-full bg-white hover:bg-gray-50/50 transition-colors flex flex-col cursor-pointer"
      onClick={() => onAdd(date)}
    >
      <div
        className={`text-sm font-black mb-2 select-none ${
          new Date().toDateString() === date.toDateString()
            ? "text-blue-600"
            : "text-gray-400"
        }`}
      >
        {date.getDate()}
      </div>
      <div className="flex flex-col gap-1.5 flex-grow">
        {dayData.map((workout) => (
          <div
            key={workout.id}
            onClick={(e) => {
              e.stopPropagation();
              onEdit(workout);
            }}
            className="z-10 text-[10px] md:text-xs bg-white border-l-4 border-l-blue-500 shadow-sm border-y border-r border-gray-200 p-2 rounded-r hover:border-l-blue-700 hover:bg-blue-50 transition-all cursor-pointer"
          >
            <div className="font-bold text-gray-700 truncate">
              {workout.title}
            </div>
            <div className="text-gray-500 font-medium">
              {formatTime(workout.startDate)} - {formatTime(workout.endDate)}
            </div>
          </div>
        ))}
        <div className="opacity-0 group-hover:opacity-100 mt-auto transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
          <div className="flex items-center justify-center gap-2 py-2 border-2 border-dashed border-gray-200 rounded-lg text-gray-400 hover:border-blue-300 hover:text-blue-500 hover:bg-blue-50/50 transition-all">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span className="text-[10px] font-bold uppercase tracking-wider">
              Dodaj
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
