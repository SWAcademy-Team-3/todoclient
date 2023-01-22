import { useRef, useState } from "react";
import TextButton from "../../components/TextButton";

export default function Calendar({ date, setOpenCalendar, changeDate }) {
  let calendarRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState(
    `${date.getFullYear()}-${
      String(date.getMonth()).length === 1
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1
    }-${date.getDate()}`
  );
  console.log(selectedDate);
  const handleDate = (e) => {
    setSelectedDate(e.target.value);
  };
  const handleChangeDate = () => {
    changeDate(new Date(selectedDate));
    setOpenCalendar(false);
  };

  return (
    <div className="modalBackground">
      <div className="modal">
        <input
          type="date"
          value={selectedDate}
          ref={calendarRef}
          onChange={(e) => handleDate(e)}
        />
        <div className="textBtnDiv">
          <TextButton onClick={handleChangeDate} text="확인" />
          <TextButton onClick={() => setOpenCalendar(false)} text="취소" />
        </div>
      </div>
    </div>
  );
}
