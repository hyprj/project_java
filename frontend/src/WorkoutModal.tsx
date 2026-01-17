import { useState, useEffect } from "react";
import { type Workout } from "./types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (workout: Partial<Workout>) => void;
  onDelete: (id: string) => void;
  initialData?: Workout | null;
  preselectedDate?: Date | null;
}

export const WorkoutModal = ({
  isOpen,
  onClose,
  onSave,
  onDelete,
  initialData,
  preselectedDate,
}: Props) => {
  const [formData, setFormData] = useState<Partial<Workout>>({
    title: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        startDate: new Date(initialData.startDate).toISOString().slice(0, 16),
        endDate: new Date(initialData.endDate).toISOString().slice(0, 16),
      });
    } else if (preselectedDate && isOpen) {
      const start = new Date(preselectedDate);
      start.setHours(10, 0, 0);
      const end = new Date(preselectedDate);
      end.setHours(11, 0, 0);

      setFormData({
        title: "",
        startDate: start.toISOString().slice(0, 16),
        endDate: end.toISOString().slice(0, 16),
      });
    }
  }, [initialData, preselectedDate, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div
        className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-gray-900 p-6 text-white">
          <h2 className="text-xl font-black uppercase tracking-tight">
            {initialData ? "Edycja Treningu" : "Nowy Trening"}
          </h2>
          <p className="text-gray-400 text-xs mt-1">
            {initialData
              ? "Zmień parametry istniejącej sesji"
              : "Zaplanuj nową aktywność w kalendarzu"}
          </p>
        </div>
        <div className="p-6 space-y-5">
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
              Nazwa aktywności
            </label>
            <input
              type="text"
              placeholder="np. Trening FBW, Bieganie..."
              className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl p-3 focus:border-blue-500 focus:outline-none transition-all font-medium"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                Start
              </label>
              <input
                type="datetime-local"
                className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl p-3 focus:border-blue-500 focus:outline-none transition-all font-medium text-sm"
                value={formData.startDate}
                onChange={(e) =>
                  setFormData({ ...formData, startDate: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                Koniec
              </label>
              <input
                type="datetime-local"
                className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl p-3 focus:border-blue-500 focus:outline-none transition-all font-medium text-sm"
                value={formData.endDate}
                onChange={(e) =>
                  setFormData({ ...formData, endDate: e.target.value })
                }
              />
            </div>
          </div>
        </div>
        <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
          {initialData?.id ? (
            <button
              onClick={() => onDelete(initialData.id!)}
              className="text-red-500 hover:bg-red-50 px-4 py-2 rounded-xl transition-all text-xs font-black uppercase tracking-widest"
            >
              Usuń
            </button>
          ) : (
            <div />
          )}

          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-black uppercase tracking-widest text-gray-400 hover:text-gray-600 transition-colors"
            >
              Anuluj
            </button>
            <button
              onClick={() => onSave(formData)}
              className="px-6 py-2 bg-blue-600 text-white rounded-xl font-black uppercase tracking-widest text-xs shadow-lg shadow-blue-200 hover:bg-blue-700 active:scale-95 transition-all"
            >
              Zapisz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
