import React from "react";
import { useDrag } from "react-dnd";

function EventCard({ event, setEvents, events, onEdit }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "event",
    item: { ...event },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className="event-card"
      style={{
        backgroundColor: event.color || "#ccc",
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
      }}
      onClick={onEdit}
    >
      <strong>{event.title}</strong>
      <div>{event.time}</div>
    </div>
  );
}

export default EventCard;
