import React, { useState, useEffect, useRef } from "react";

export default function TodoInput() {
  const [todoText, setTodoText] = useState("");
  const todoInput = useRef();

  const onChange = (e) => {
    setTodoText(e.target.value);
  };

  return (
    <div className="InputBox">
      <input
        type={"text"}
        placeholder="계획 입력창"
        ref={todoInput}
        value={todoText}
        onChange={(e) => onChange(e)}
      ></input>
    </div>
  );
}
