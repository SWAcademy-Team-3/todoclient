import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import AddIcon from "@mui/icons-material/Add";

import React, { useState, useRef } from "react";

export default function TodoInput({ addTodo }) {
  const [todoText, setTodoText] = useState("");
  const [addState, setAddState] = useState("TODO");
  const todoInput = useRef();

  const onChange = (e) => {
    setTodoText(e.target.value);
  };

  const changeAddState = () => {
    if (addState === "TODO") {
      setAddState("HABIT");
    } else {
      setAddState("TODO");
    }
  };

  const handleAddTodo = () => {
    addTodo(addState, todoText);
    setTodoText("");
  };
  // TODO 엔터를 입력해도 추가될 수 있도록 구현
  // TODO 시간 설정할 수 있는 토스트 창 추가

  return (
    <div className="InputBox">
      <div
        style={{ backgroundColor: addState === "TODO" ? "#e5a8a6" : "#BECAD6" }}
        onClick={changeAddState}
      >
        <span>{addState}</span>
      </div>
      <input
        type={"text"}
        placeholder="계획 입력창"
        ref={todoInput}
        value={todoText}
        onChange={(e) => onChange(e)}
      ></input>
      <div>
        <AccessAlarmIcon />
        <AddIcon onClick={handleAddTodo} />
      </div>
    </div>
  );
}
