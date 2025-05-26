const KEY = "calendar_events";

export const saveEvents = (events) => {
  localStorage.setItem(KEY, JSON.stringify(events));
};

export const loadEvents = () => {
  const stored = localStorage.getItem(KEY);
  return stored ? JSON.parse(stored) : [];
};
