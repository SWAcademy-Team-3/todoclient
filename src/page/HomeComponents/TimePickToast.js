import { useRef, useState } from "react";

import TextButton from "../../components/TextButton";
import TimePicker from "../../components/TimePicker";
import RadioGroup from "../../components/RadioGroup";
import Radio from "../../components/Radio";
import DatePicker from "../../components/DatePicker";

const DateToStringFormat = (source, delimeter = "-") => {
  const year = source.getFullYear();
  const month =
    `${source.getMonth() + 1}`.length === 1
      ? `0${source.getMonth() + 1}`
      : `${source.getMonth() + 1}`;
  const day =
    `${source.getDate()}`.length === 1
      ? `0${source.getDate()}`
      : `${source.getDate()}`;

  return [year, month, day].join(delimeter);
};

export default function TimePickToast({ setOpenTimePicker, addTodo }) {
  const todoInput = useRef();
  const [todoText, setTodoText] = useState("");
  const [addState, setAddState] = useState("TODO");

  const [hour, setHour] = useState("00");
  const [minutes, setMinutes] = useState("00");

  const [startDate, setStartDate] = useState(DateToStringFormat(new Date()));
  const [endDate, setEndDate] = useState(DateToStringFormat(new Date()));

  const onChange = (e) => {
    setTodoText(e.target.value);
  };
  const handleAddBtn = () => {
    if (addState === "TODO") {
      addTodo(addState, todoText, `${hour} : ${minutes}`);
    } else {
      addTodo(addState, todoText);
    }
    setOpenTimePicker(false);
  };
  return (
    <div className="modalBackground">
      <div className="modal">
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
      </div>
    </div>
  );
}
