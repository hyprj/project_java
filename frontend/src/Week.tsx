import { useState } from "react";
import { Day } from "./Day";
import { WorkoutModal } from "./WorkoutModal";
import type { Workout } from "./types";
import { API_ENDPOINT } from "./api";

export const Week = ({
  workouts,
  onRefresh,
}: {
  workouts: Workout[];
  onRefresh: () => void;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
  const [preselectedDate, setPreselectedDate] = useState<Date | null>(null);

  const handleEditRequest = (workout: Workout) => {
    setPreselectedDate(null);
    setSelectedWorkout(workout);
    setIsModalOpen(true);
  };

  const handleAddRequest = (date: Date) => {
    setSelectedWorkout(null);
    setPreselectedDate(date);
    setIsModalOpen(true);
  };

  const handleSave = async (formData: Partial<Workout>) => {
    const isEditing = !!selectedWorkout?.id;
    const url = isEditing
      ? `${API_ENDPOINT}/${selectedWorkout.id}`
      : API_ENDPOINT;
    const method = isEditing ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        let errorMessage = "Uncaught Error";
        const contentType = response.headers.get("content-type");

        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          errorMessage = errorData.title || errorData.message || errorMessage;
        } else {
          errorMessage = await response.text();
        }

        throw new Error(errorMessage);
      }

      setIsModalOpen(false);
      onRefresh();
    } catch (error: any) {
      console.log("Error details:", error);
      alert(`Error: ${error.message}`);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Czy na pewno chcesz usunąć ten trening?")) return;

    try {
      const response = await fetch(`${API_ENDPOINT}/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setIsModalOpen(false);
        onRefresh();
      } else {
        alert("Unable to handle delete");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const [currentWeekStart, setCurrentWeekStart] = useState(() => {
    const d = new Date();
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(d.setDate(diff));
    monday.setHours(0, 0, 0, 0);
    return monday;
  });

  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(currentWeekStart);
    d.setDate(currentWeekStart.getDate() + i);
    return d;
  });

  const lastDayOfWeek = new Date(days[6]);
  const changeWeek = (offsetDays: number) => {
    const newDate = new Date(currentWeekStart);
    newDate.setDate(currentWeekStart.getDate() + offsetDays);
    setCurrentWeekStart(newDate);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("pl-PL", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto p-4 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 gap-4">
        <div>
          <h2 className="text-2xl font-black text-gray-900 capitalize mb-1">
            {currentWeekStart.toLocaleDateString("pl-PL", {
              month: "long",
              year: "numeric",
            })}
          </h2>
          <p className="text-sm font-mono text-blue-600 bg-blue-50 px-3 py-1 rounded-full inline-block">
            {formatDate(currentWeekStart)} — {formatDate(lastDayOfWeek)}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => changeWeek(-7)}
            className="p-2 bg-white border border-gray-200 hover:border-blue-400 hover:text-blue-600 rounded-xl transition-all shadow-sm active:scale-95"
          >
            <span className="px-2 font-bold">←</span>
          </button>
          <button
            onClick={() => {
              const d = new Date();
              const day = d.getDay();
              const diff = d.getDate() - day + (day === 0 ? -6 : 1);
              setCurrentWeekStart(new Date(new Date().setDate(diff)));
            }}
            className="px-6 py-2 bg-gray-900 text-white hover:bg-gray-800 rounded-xl transition-all font-medium shadow-md active:scale-95"
          >
            Dzisiaj
          </button>
          <button
            onClick={() => changeWeek(7)}
            className="p-2 bg-white border border-gray-200 hover:border-blue-400 hover:text-blue-600 rounded-xl transition-all shadow-sm active:scale-95"
          >
            <span className="px-2 font-bold">→</span>
          </button>
        </div>
      </div>
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
        <div className="grid grid-cols-7 border-b border-gray-200 bg-gray-50/50">
          {[
            "Poniedziałek",
            "Wtorek",
            "Środa",
            "Czwartek",
            "Piątek",
            "Sobota",
            "Niedziela",
          ].map((label) => (
            <div
              key={label}
              className="py-3 text-center text-[10px] md:text-xs font-black text-gray-400 uppercase tracking-widest"
            >
              {label}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 divide-x divide-gray-200 h-[600px]">
          {days.map((date) => (
            <Day
              key={date.toISOString()}
              date={date}
              data={workouts}
              onEdit={handleEditRequest}
              onAdd={handleAddRequest}
            />
          ))}
        </div>
      </div>
      <WorkoutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        initialData={selectedWorkout}
        preselectedDate={preselectedDate}
        onDelete={handleDelete}
      />
    </div>
  );
};
