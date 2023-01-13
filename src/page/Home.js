import React, { useState, useEffect } from "react";
import { axios_get } from "../api/api";
import TodoInput from "./HomeComponent/TodoInput";
import TodoList from "./HomeComponent/TodoList";
import SimpleCalendar from "./HomeComponent/SimpleCalendar";
import CalendarToggle from "./HomeComponent/CalendarToggle";

import "../style/index.scss";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [habits, setHabits] = useState([]);
  const [date, setDate] = useState(new Date());

  const changeDate = () => {
    // TODO 사용자가 날짜를 바꿨을 때의 처리하는 곳
  };
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
    <>
      <div className="container">
        <SimpleCalendar date={date} changeDate={changeDate} />
        <hr />
        <TodoList category={"TODO"} data={todos} />
        <TodoList category={"HABIT"} data={habits} />
      </div>
      <CalendarToggle />

      <TodoInput />
    </>
  );
}
