import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CreateEventModal from "./CreateEventModal";

// Set up localizer
const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [showcreateEventPopup, setShowCreateEventPopup] = useState(false);
  const [eventTime, setEventTime] = useState<{
    startDate: Date | null;
    endDate: Date | null;
  } | null>(null);
  // Sample events
  const [events, setEvents] = useState([
    {
      title: "Event 1",
      start: new Date(),
      end: new Date(moment().add(1, "hours")),
    },
    {
      title: "Event 2",
      start: new Date(moment().add(1, "days")),
      end: new Date(moment().add(1, "days").add(2, "hours")),
    },
  ]);

  return (
    <div>
      <CreateEventModal
        key={showcreateEventPopup ? 1 : 0}
        isOpen={showcreateEventPopup}
        closeModal={() => setShowCreateEventPopup(false)}
        startDate={eventTime?.startDate}
        endDate={eventTime?.endDate}
      />
      <h2>My Calendar</h2>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: "50px" }}
        selectable
        onSelectSlot={(slotInfo) => {
          const { start, end } = slotInfo;
          setEventTime({ startDate: start, endDate: end });
          setShowCreateEventPopup(!showcreateEventPopup);
        }}
      />
    </div>
  );
};

export default MyCalendar;
