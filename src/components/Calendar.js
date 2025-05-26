import React, { useState } from "react";
import { startOfMonth, endOfMonth, eachDayOfInterval, format, addMonths, subMonths } from "date-fns";
import Day from "./Day";

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function Calendar({ events, setEvents }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  return (
    <div className="calendar-wrapper">
      <div className="calendar-header">
        <button onClick={() => setCurrentDate(subMonths(currentDate, 1))}>Prev</button>
        <h2>{format(currentDate, "MMMM yyyy")}</h2>
        <button onClick={() => setCurrentDate(addMonths(currentDate, 1))}>Next</button>
      </div>

      <div className="calendar-weekdays">
        {weekdays.map((day, idx) => (
          <div key={idx} className="weekday">{day}</div>
        ))}
      </div>

      <div className="calendar-grid">
        {days.map((day, idx) => (
          <Day key={idx} date={day} events={events} setEvents={setEvents} />
        ))}
      </div>
    </div>
  );
}

export default Calendar;
