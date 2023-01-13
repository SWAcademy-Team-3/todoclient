import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import AddIcon from "@mui/icons-material/Add";

import React, { useState, useEffect, useRef } from "react";

export default function TodoInput() {
  const [todoText, setTodoText] = useState("");
  const todoInput = useRef();

  const onChange = (e) => {
    setTodoText(e.target.value);
  };

  // TODO API와 함께 투두 추가 할 수 있도록 구현
  // TODO 시간 설정할 수 있는 토스트 창 추가
  // TODO TODO인지 HABIT인지 맨 앞 컴포넌트 변경

  return (
    <div className="InputBox">
      <div>
        <span>TODO</span>
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
        <AddIcon />
      </div>
    </div>
  );
}
