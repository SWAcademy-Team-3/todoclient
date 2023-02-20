import { useState } from "react";
import { useDate } from "../../contexts/dateProvider";
import Modal from "../../components/Modal";
import TextButton from "../../components/TextButton";
import CalendarContents from "./CalendarContents";

export default function Calendar({ setOpenCalendar }) {
  const { date, changeDate } = useDate();
  const [selectedDate, setSelectedDate] = useState(date);
  const handleChangeDate = () => {
    changeDate(new Date(selectedDate));
    setOpenCalendar(false);
  };

  return (
    <Modal
      buttonType="text"
      style={{ height: "45vh", padding: "0 10px" }}
      handleModalClick={() => setOpenCalendar(false)}
    >
      <CalendarContents
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <div className="textBtnDiv" style={{ marginTop: "15px" }}>
        <TextButton onClick={handleChangeDate} text="확인" />
        <TextButton onClick={() => setOpenCalendar(false)} text="취소" />
      </div>
    </Modal>
  );
}
