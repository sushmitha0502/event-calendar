import React, { useState, useEffect } from "react";
import Calendar from "./components/Calendar";
import Search from "./components/Search";
import { loadEvents, saveEvents } from "./utils/storage";

function App() {
  const [events, setEvents] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const stored = loadEvents();
    setEvents(stored);
  }, []);

  useEffect(() => {
    saveEvents(events); // Save anytime events change
  }, [events]);

  const filteredEvents = events.filter(
    (e) =>
      e.title.toLowerCase().includes(query.toLowerCase()) ||
      e.description?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className={`app ${darkMode ? "dark" : ""}`}>
      <div className="theme-toggle">
        <label>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
          🌙 Dark Mode
        </label>
      </div>

      <h1>Event Calendar</h1>
      <Search query={query} setQuery={setQuery} />
      <Calendar events={filteredEvents} setEvents={setEvents} />
    </div>
  );
}

export default App;
