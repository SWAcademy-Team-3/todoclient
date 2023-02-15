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

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [habits, setHabits] = useState([]);
  const [openCalendar, setOpenCalendar] = useState(false);

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
  const addTodo = (addState, todo) => {
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
          isClear: false,
          tempId: uuidv4(),
        },
      ]);
    } else {
      setHabits([
        ...habits,
        {
          todo,
          isClear: false,
          tempId: uuidv4(),
        },
      ]);
    }
  };

  const removeTodo = () => {};

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
        <TodoList category={"TODO"} data={todos} setData={setTodos} />
        <TodoList category={"HABIT"} data={habits} setData={setHabits} />
      </div>
      <CalendarToggle setOpenCalendar={setOpenCalendar} />
      <TodoInput addTodo={addTodo} />
      {openCalendar && <Calendar setOpenCalendar={setOpenCalendar} />}
    </DateProvider>
  );
}
