import { useRef, useState } from "react";

import TextButton from "../../components/TextButton";
import TimePicker from "../../components/TimePicker";
import RadioGroup from "../../components/RadioGroup";
import Radio from "../../components/Radio";

export default function TimePickToast({ setOpenTimePicker }) {
  const todoInput = useRef();
  const [todoText, setTodoText] = useState("");
  const [addState, setAddState] = useState("TODO");
  const onChange = (e) => {
    setTodoText(e.target.value);
  };
  return (
    <div className="modalBackground">
      <div className="modal">
        <div style={{ width: "90%" }}>
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
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
            <TimePicker />
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
          <TextButton text="추가" />
          <TextButton text="취소" onClick={() => setOpenTimePicker(false)} />
        </div>
      </div>
    </div>
  );
}
