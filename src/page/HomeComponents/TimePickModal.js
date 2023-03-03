import { useRef, useState } from "react";

import TextButton from "../../components/TextButton";
import TimePicker from "../../components/TimePicker";
import RadioGroup from "../../components/RadioGroup";
import Radio from "../../components/Radio";
import DatePicker from "../../components/DatePicker";
import Modal from "../../components/Modal";
import { useDate } from "../../contexts/dateProvider";

export default function TimePickModal({ setOpenTimePicker, addTodo }) {
  const todoInput = useRef();
  const [todoText, setTodoText] = useState("");
  const [addState, setAddState] = useState("TODO");
  const { DateToStringFormat } = useDate();

  const [hour, setHour] = useState("09");
  const [minutes, setMinutes] = useState("30");

  const [startDate, setStartDate] = useState(DateToStringFormat(new Date()));
  const [endDate, setEndDate] = useState(DateToStringFormat(new Date()));

  const onChange = (e) => {
    setTodoText(e.target.value);
  };
  const handleAddBtn = () => {
    if (addState === "TODO") {
      addTodo(addState, todoText, `${hour}:${minutes}`);
    } else {
      addTodo(addState, todoText);
    }
    setOpenTimePicker(false);
  };
  return (
    <Modal buttonType="text" handleModalClick={() => setOpenTimePicker(false)}>
      <div style={{ width: "90%" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <div>
            <RadioGroup>
              <Radio
                name="TODO"
                value="TODO"
                checked={addState === "TODO"}
                onChange={() => setAddState("TODO")}
              >
                TODO
              </Radio>
              <Radio
                name="HABIT"
                value="HABIT"
                checked={addState === "HABIT"}
                onChange={() => setAddState("HABIT")}
              >
                HABIT
              </Radio>
            </RadioGroup>
          </div>
          {addState === "TODO" ? (
            <TimePicker
              hour={hour}
              setHour={setHour}
              minutes={minutes}
              setMinutes={setMinutes}
            />
          ) : (
            <DatePicker
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
            />
          )}
        </div>
        <div className="searchBar">
          <input
            className="blankInput"
            type="text"
            placeholder="계획 입력"
            ref={todoInput}
            value={todoText}
            onChange={(e) => onChange(e)}
          />
        </div>
      </div>
      <div className="textBtnDiv">
        <TextButton text="추가" onClick={handleAddBtn} />
        <TextButton text="취소" onClick={() => setOpenTimePicker(false)} />
      </div>
    </Modal>
  );
}
