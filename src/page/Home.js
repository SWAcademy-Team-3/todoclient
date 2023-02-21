import React, { useState, useEffect } from "react";
import { axios_get, axios_post } from "../api/api";
import { v4 as uuidv4 } from "uuid";

import TodoInput from "./HomeComponents/TodoInput";
import TodoList from "./HomeComponents/TodoList";
import SimpleCalendar from "./HomeComponents/SimpleCalendar";
import CalendarToggle from "./HomeComponents/CalendarToggle";
import DateProvider from "../contexts/dateProvider";

import "../style/index.scss";
import Calendar from "./HomeComponents/Calendar";
import TimePickModal from "./HomeComponents/TimePickModal";

// 임시이미지
import myImg from "../assets/images/chuu.jpg";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [habits, setHabits] = useState([]);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [openTimePicker, setOpenTimePicker] = useState(false);

  // API 통신 안정시 제거
  const dummy_param1 = {
    searchData: "2023-01-12",
    type: "TODO",
    userId: "userId",
  };
  const dummy_param2 = {
    searchData: new Date("2023-01-12"),
    type: "HABIT",
    userId: "userId",
  };

  // TODO리스트에 추가
  const addTodo = (addState, todo, time = null) => {
    const type = addState === "TODO" ? "TODO" : "HABIT";
    const data = {
      memberid: "userId",
      type,
      todo,
    };
    // axios_post("todo", data);
    // 낙관적 업데이트
    if (type === "TODO") {
      setTodos([
        ...todos,
        {
          todo,
          limitTime: time,
          isClear: false,
          tempId: uuidv4(),
        },
      ]);
    } else {
      setHabits([
        ...habits,
        {
          todo,
          limitTime: time,
          isClear: false,
          tempId: uuidv4(),
        },
      ]);
    }
  };

  const handleClick = (targetId, type, category) => {
    switch (type) {
      case "DELETE":
        category === "TODO"
          ? setTodos(todos.filter((val) => val.tempId !== targetId))
          : setHabits(habits.filter((val) => val.tempId !== targetId));
        break;
      case "UPDATE":
        category === "TODO"
          ? setTodos(
              todos.map((val) => {
                if (val.tempId === targetId) {
                  val.isClear = !val.isClear;
                }
                return val;
              })
            )
          : setHabits(
              habits.map((val) => {
                if (val.tempId === targetId) {
                  val.isClear = !val.isClear;
                }
                return val;
              })
            );
        break;
      default:
        alert("오류 발생");
    }
  };

  // User TODO API 받기
  const getData = async () => {
    let res1 = await axios_get("todo", dummy_param1);
    let res2 = await axios_get("todo", dummy_param2);
    setTodos(res1);
    setHabits(res2);
  };
  useEffect(() => {
    //getData();
  }, []);

  return (
    <DateProvider>
      <div className="Mainheader">
        <SimpleCalendar />
        <hr />
      </div>
      <div id="homeContents">
        <span style={{ fontSize: "18px" }}>
          <strong>chuu</strong> 님의 할일 목록
        </span>
        <TodoList category={"TODO"} data={todos} handleClick={handleClick} />
        <TodoList category={"HABIT"} data={habits} handleClick={handleClick} />
      </div>
      <CalendarToggle setOpenCalendar={setOpenCalendar} />
      <TodoInput addTodo={addTodo} setOpenTimePicker={setOpenTimePicker} />
      {openCalendar && <Calendar setOpenCalendar={setOpenCalendar} />}
      {openTimePicker && (
        <TimePickModal
          setOpenTimePicker={setOpenTimePicker}
          addTodo={addTodo}
        />
      )}
    </DateProvider>
  );
}
