import React, { useState, useEffect } from "react";
import { axios_delete, axios_get, axios_post, axios_put } from "../api/api";
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
import useDebounce from "../hooks/useDebounce";

export default function Home() {
  let navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [habits, setHabits] = useState([]);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [openTimePicker, setOpenTimePicker] = useState(false);
  const { user } = useUser();
  const { date, DateToStringFormat } = useDate();

  // TODO리스트에 추가
  const addTodo = (addState, todo, time = null) => {
    const type = addState === "TODO" ? "TODO" : "HABIT";
    // TODO 서버에서 올바른 API 만들어 졌을 때 추가하기
    const data = {
      userId: user.memberId,
      type,
      todo,
    };
    axios_post("todo", data, "json", true);
    // 낙관적 업데이트
    if (type === "TODO") {
      setTodos([
        ...todos,
        {
          todo,
          limitTime: time,
          success: false,
          todoId: uuidv4(),
        },
      ]);
    } else {
      setHabits([
        ...habits,
        {
          todo,
          limitTime: time,
          success: false,
          todoId: uuidv4(),
        },
      ]);
    }
  };

  const handleClick = (targetId, type, category) => {
    switch (type) {
      case "DELETE":
        axios_delete("todo", {
          todoId: targetId,
        });
        category === "TODO"
          ? setTodos(todos.filter((val) => val.todoId !== targetId))
          : setHabits(habits.filter((val) => val.todoId !== targetId));
        break;
      case "UPDATE":
        axios_put("success", {
          todoId: targetId,
        });
        category === "TODO"
          ? setTodos(
              todos.map((val) => {
                if (val.todoId === targetId) {
                  val.success = !val.success;
                }
                return val;
              })
            )
          : setHabits(
              habits.map((val) => {
                if (val.todoId === targetId) {
                  val.success = !val.success;
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
    const data = {
      searchDate: DateToStringFormat(date),
      type: "TODO",
      userId:
        user.memberId === null
          ? JSON.parse(localStorage.getItem("userData")).memberId
          : user.memberId,
    };
    let res1 = await axios_get("todo", data);
    let res2 = await axios_get("todo", { ...data, type: "HABIT" });
    setTodos(res1);
    setHabits(res2);
  };
  useEffect(() => {
    // TODO access TOKEN 확인해서 만료시 로그인으로 갈 수 있도록 수정
    // login check 통신 시 401라면 로그인화면으로 갈 수 있도록 변경
    if (user === null) {
      //TODO 알림 후 로그인으로 갈 수 있게 수정
      navigate("/login");
    }
  }, []);
  // 날짜 변경후 0.5초 뒤에 데이터를 불러오는 동작
  useDebounce(
    () => {
      getData();
    },
    500,
    [date]
  );

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
