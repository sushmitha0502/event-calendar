import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";
import { hasConflict } from "../utils/conflicts";

function EventForm({ date, event, setShowForm, setEvents, events }) {
  const [title, setTitle] = useState(event?.title || "");
  const [time, setTime] = useState(event?.time || "12:00");
  const [description, setDescription] = useState(event?.description || "");
  const [recurrence, setRecurrence] = useState(event?.recurrence || "none");
  const [color, setColor] = useState(event?.color || "#1e90ff");

  const saveEvent = () => {
    const newEvent = {
      id: event?.id || uuidv4(),
      title,
      date: format(date, "yyyy-MM-dd") + "T" + time,
      time,
      description,
      recurrence,
      color,
    };

    if (hasConflict(events, newEvent)) {
      alert("⚠️ Conflict: Another event is already scheduled at that time.");
      return;
    }

    if (event) {
      setEvents(events.map(e => (e.id === event.id ? newEvent : e)));
    } else {
      setEvents([...events, newEvent]);
    }

    setShowForm(false);
  };

  const deleteEvent = () => {
    if (event) {
      setEvents(events.filter(e => e.id !== event.id));
      setShowForm(false);
    }
  };

  return (
    <div className="modal">
      <h3>{event ? "Edit Event" : "Add Event"}</h3>
      <input placeholder="Event Title" value={title} onChange={e => setTitle(e.target.value)} />
      <input type="time" value={time} onChange={e => setTime(e.target.value)} />
      <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
      <select value={recurrence} onChange={e => setRecurrence(e.target.value)}>
        <option value="none">None</option>
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
        <option value="custom">Custom</option>
      </select>
      <label>
        Event Color:
        <input type="color" value={color} onChange={e => setColor(e.target.value)} />
      </label>
      <button onClick={saveEvent}>{event ? "Update" : "Save"}</button>
      {event && <button className="delete" onClick={deleteEvent}>Delete</button>}
      <button onClick={() => setShowForm(false)}>Cancel</button>
    </div>
  );
}

export default EventForm;
