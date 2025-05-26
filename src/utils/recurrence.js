import { addDays, addWeeks, addMonths, isWithinInterval, format } from "date-fns";

export function expandRecurringEvents(events, viewStart, viewEnd) {
  const expanded = [];

  events.forEach(event => {
    const eventDate = new Date(event.date);
    if (!event.recurrence || event.recurrence === "none") {
      if (isWithinInterval(eventDate, { start: viewStart, end: viewEnd })) {
        expanded.push(event);
      }
      return;
    }

    let nextDate = eventDate;
    while (nextDate <= viewEnd) {
      if (nextDate >= viewStart) {
        expanded.push({
          ...event,
          id: `${event.id}-${format(nextDate, "yyyyMMdd")}`,
          date: nextDate.toISOString()
        });
      }

      switch (event.recurrence) {
        case "daily":
          nextDate = addDays(nextDate, 1);
          break;
        case "weekly":
          nextDate = addWeeks(nextDate, 1);
          break;
        case "monthly":
          nextDate = addMonths(nextDate, 1);
          break;
        case "custom":
          nextDate = addWeeks(nextDate, event.customEvery || 2); // default: every 2 weeks
          break;
        default:
          nextDate = addDays(nextDate, 999); // stop
      }
    }
  });

  return expanded;
}
