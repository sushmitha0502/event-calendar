
export function hasConflict(events, newEvent) {
  return events.some(e =>
    e.date === newEvent.date &&
    e.time === newEvent.time &&
    e.id !== newEvent.id
  );
}
