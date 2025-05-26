import React, { useState } from "react";
import { format, isToday } from "date-fns";
import { useDrop } from "react-dnd";
import EventCard from "./EventCard";
import EventForm from "./EventForm";

function Day({ date, events, setEvents }) {
  const [showForm, setShowForm] = useState(false);
  const [editEvent, setEditEvent] = useState(null);

  const dailyEvents = events.filter(
    (e) => format(new Date(e.date), "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
  );

  const [, drop] = useDrop(() => ({
    accept: "event",
    drop: (draggedEvent) => {
      const newDate = format(date, "yyyy-MM-dd") + "T" + draggedEvent.time;
      const updated = {
        ...draggedEvent,
        date: newDate,
        id: draggedEvent.id.split("-")[0],
      };

      setEvents((prev) => [
        ...prev.filter((e) => e.id !== updated.id),
        updated,
      ]);
    },
  }));

  return (
    <div ref={drop} className={`day ${isToday(date) ? "today" : ""}`}>
      <div
        onClick={() => {
          setEditEvent(null);
          setShowForm(true);
        }}
        className="day-header"
      >
        {format(date, "d")}
      </div>

      <div className="event-list">
        {dailyEvents.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            setEvents={setEvents}
            events={events}
            onEdit={() => {
              setEditEvent(event);
              setShowForm(true);
            }}
          />
        ))}
      </div>

      {showForm && (
        <EventForm
          date={date}
          event={editEvent}
          setShowForm={setShowForm}
          setEvents={setEvents}
          events={events}
        />
      )}
    </div>
  );
}

export default Day;
