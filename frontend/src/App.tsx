import { useState, useEffect, useCallback } from "react";
import "./App.css";
import { API_ENDPOINT } from "./api";
import { type Workout } from "./types";
import { Week } from "./Week";

function App() {
  const [data, setData] = useState<Workout[]>([]);

  const refreshData = useCallback(async () => {
    try {
      const response = await fetch(API_ENDPOINT);
      if (!response.ok) throw new Error("Błąd pobierania danych");

      const workouts = await response.json();
      console.log("Pobrano dane:", workouts);
      setData(workouts);
    } catch (err) {
      console.error("Błąd połączenia z API:", err);
      setData([]);
    }
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Week workouts={data} onRefresh={refreshData} />
    </div>
  );
}

export default App;
