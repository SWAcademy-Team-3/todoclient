import React, { useState, useEffect } from "react";

export default function SimpleCalendar({ date, changeDate }) {
  const [month, setMonth] = useState();
  const [day, setDay] = useState(3);
  const [dayString, setDayString] = useState();

  useEffect(() => {
    let dateString = date.toDateString().split(" ");
    setMonth(dateString[1].toUpperCase());
    setDayString(dateString[0].toUpperCase());
  }, []);
  return (
    <div className="SimpleCalendar">
      <span>{month}</span>
      <div>
        <span>{day - 1}</span>
        <div id="selectedDay">
          <span>{day}</span>
        </div>
        <span>{day + 1}</span>
      </div>
      <span>{dayString}</span>
    </div>
  );
}
