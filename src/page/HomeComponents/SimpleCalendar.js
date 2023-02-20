import React, { useState, useEffect } from "react";
import "../../style/index.scss";
import { useDate } from "../../contexts/dateProvider";

export default function SimpleCalendar() {
  const { date, changeDate } = useDate();
  const [month, setMonth] = useState();
  const [dayMinusOne, setDayMinusOne] = useState();
  const [dayPlusOne, setDayPlusOne] = useState();
  const [day, setDay] = useState(1);
  const [dayString, setDayString] = useState();

  useEffect(() => {
    let dateString = date.toDateString().split(" ");
    setMonth(dateString[1].toUpperCase());
    setDayString(dateString[0].toUpperCase());
    setDay(parseInt(dateString[2]));
    let nextDay = new Date(date);
    nextDay = new Date(nextDay.setDate(nextDay.getDate() + 1))
      .toDateString()
      .split(" ")[2];
    let prevDay = new Date(date);
    prevDay = new Date(prevDay.setDate(prevDay.getDate() - 1))
      .toDateString()
      .split(" ")[2];
    setDayMinusOne(parseInt(prevDay));
    setDayPlusOne(parseInt(nextDay));
  }, [date]);

  const changeOneDate = (day) => {
    const updateDate = new Date(date.setDate(date.getDate() + day));
    changeDate(updateDate);
  };
  return (
    <div className="SimpleCalendar">
      <span>{month}</span>
      <div>
        <span onClick={() => changeOneDate(-1)}>{dayMinusOne}</span>
        <div
          id="selectedDay"
          style={{ padding: String(day).length === 1 ? "0px 14px" : "0px 8px" }}
        >
          <span>{day}</span>
        </div>
        <span onClick={() => changeOneDate(1)}>{dayPlusOne}</span>
      </div>
      <span>{dayString}</span>
    </div>
  );
}
