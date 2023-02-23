import React, { useState, useEffect } from "react";
import { axios_get, axios_post } from "../api/api";
import { v4 as uuidv4 } from "uuid";

import TodoInput from "./HomeComponents/TodoInput";
import TodoList from "./HomeComponents/TodoList";
import SimpleCalendar from "./HomeComponents/SimpleCalendar";
import CalendarToggle from "./HomeComponents/CalendarToggle";

import "../style/index.scss";
import Calendar from "./HomeComponents/Calendar";
import TimePickModal from "./HomeComponents/TimePickModal";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/userProvider";
import { useDate } from "../contexts/dateProvider";
import { getCookie } from "../service/Cookie";

export default function Home() {
  let navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [habits, setHabits] = useState([]);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [openTimePicker, setOpenTimePicker] = useState(false);
  const { user } = useUser();
  const { date } = useDate();

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
    let res1 = await axios_get(
      "todo",
      {
        searchData: "2023-02-22",
        type: "TODO",
        userId: user.memberId,
      },
      user.access_token
    );
    // let res2 = await axios_get("todo", dummy_param2);
    setTodos(res1);
    // setHabits(res2);
  };
  useEffect(() => {
    if (getCookie("userId") === undefined) {
      //TODO 알림 후 로그인으로 갈 수 있게 수정
      navigate("/login");
    }
    // getData();
  }, []);

  return (
    <>
      <div className="Mainheader">
        <SimpleCalendar />
        <hr />
      </div>
      <div id="homeContents">
        <span style={{ fontSize: "18px" }}>
          <strong>{user.memberId}</strong> 님의 할일 목록
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
    </>
  );
}
