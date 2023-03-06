import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { axios_get } from "../api/api";

import useTimeout from "../hooks/useTimeout";
import useSlideBack from "../hooks/useSlideBack";
import useDebounce from "../hooks/useDebounce";

import SearchIcon from "@mui/icons-material/Search";
import basicProfile from "../assets/images/basic_profile.jpeg";

import Tile from "../components/Tile";
import SimpleCalendar from "./HomeComponents/SimpleCalendar";
import TodoList from "./HomeComponents/TodoList";
import DateProvider from "../contexts/dateProvider";
import { useUser } from "../contexts/userProvider";
import { useDate } from "../contexts/dateProvider";

export default function FindFriends() {
  let navigate = useNavigate();
  const { user } = useUser();
  const { date, DateToStringFormat } = useDate();

  const [friendsList, setFriendsList] = useState([]);
  const [friendTodo, setFriendTodo] = useState([]);
  const [friendHabit, setFriendHabit] = useState([]);

  const [typingAnimationEnd, setTypingAnimationEnd] = useState(false);
  const [fadeAnimationEnd, setFadeAnimationEnd] = useState(false);
  const [fadeAnimationEnd2, setFadeAnimationEnd2] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState({
    profileImg: null,
    memId: null,
  });
  const [startX, setStartX] = useState(0);
  const [searchText, setSearchText] = useState("");
  const inputRef = useRef();
  const [typingAnimation, typingClear] = useTimeout(() => {
    setTypingAnimationEnd(true);
  }, 3000);
  const [fadeAnimation, fadeClear] = useTimeout(() => {
    setFadeAnimationEnd(true);
  }, 4400);
  const [fadeAnimation2, fadeClear2] = useTimeout(() => {
    setFadeAnimationEnd2(true);
  }, 1000);

  useSlideBack("touchmove", startX, () => {
    navigate(-1);
  });

  const handleAnimation = () => {
    typingAnimation();
    fadeAnimation();
  };

  const handleTextInput = (e) => {
    setSearchText(e.target.value);
  };

  const handleSelectFriend = (profileImg, memId) => {
    setSelectedFriend({
      profileImg,
      memId,
    });
    getFriendTodoData(memId);
    fadeAnimation2();
  };

  const handleMoveWrite = (todoId, type, category, todo) => {
    navigate("/write", {
      state: {
        profileImg: selectedFriend.profileImg,
        memId: selectedFriend.memId,
        location: "findFriends",
        todo,
        category,
      },
    });
  };

  const getFriendTodoData = async (memberId) => {
    const todoResponse = await axios_get("todo", {
      memberId,
      searchDate: DateToStringFormat(date),
      type: "TODO",
    });
    const HabitResponse = await axios_get("habit", {
      memberId,
      searchDate: DateToStringFormat(date),
      type: "HABIT",
    });
    setFriendTodo(todoResponse);
    setFriendHabit(HabitResponse);
  };

  const getFriendList = async () => {
    try {
      const response = await axios.get(
        `http://49.50.163.197:8080/api/member/friend/list/${user.memberId}`,
        {
          memberId: user.memberId,
        }
      );
      const result = [];
      await response.data.map(async (list) => {
        const relationId = list.relationId;
        const res = await axios_get("friendInfo", {
          relationId,
        });
        result.push({
          name: list.name,
          memberId: list.memberId,
          relationId: list.relationId,
          profileImg:
            res.image === undefined || res.image === null
              ? basicProfile
              : `data:image/;base64,${res.image}`,
        });
      });
      setFriendsList(result);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const handleTouchStart = (e) => {
      setStartX(e.targetTouches[0].screenX);
    };
    window.addEventListener("touchstart", (e) => handleTouchStart(e));
    return () => {
      window.removeEventListener("touchstart", (e) => handleTouchStart(e));
    };
  }, [startX]);

  useEffect(() => {
    handleAnimation();
    getFriendList();
  }, []);

  useDebounce(
    () => {
      if (selectedFriend.memId !== null) {
        getFriendTodoData(selectedFriend.memId);
      }
    },
    300,
    [date]
  );

  return (
    <>
      <div className="marginDiv">
        <div
          className={`loadingDiv ${typingAnimationEnd && "clearDiv"}`}
          style={{ display: fadeAnimationEnd && "none" }}
        >
          <h3 className="typewriter">편지를 쓸 친구를 찾고 선택해보세요</h3>
        </div>
        <div
          className={`${
            selectedFriend.memId !== null ? "clearDiv" : "fadeInDiv"
          }`}
          style={{
            display:
              !typingAnimationEnd || fadeAnimationEnd2 ? "none" : "block",
          }}
        >
          <div className="searchBar">
            <input
              className="blankInput"
              type="text"
              value={searchText}
              ref={inputRef}
              onChange={handleTextInput}
              placeholder="친구 ID로 검색해 보세요"
            />
            <SearchIcon />
          </div>
          <hr style={{ margin: 0 }} />
          {friendsList.map((friend) => (
            <Tile
              key={friend.relationId}
              profileImg={friend.profileImg}
              memId={friend.memberId}
              name={friend.name}
              type="check"
              handleClick={() =>
                handleSelectFriend(friend.profileImg, friend.memberId)
              }
            />
          ))}
        </div>
      </div>
      <div
        className="fadeInDiv"
        style={{ display: !fadeAnimationEnd2 ? "none" : "block" }}
      >
        <div className="Mainheader">
          <SimpleCalendar />
          <hr />
        </div>
        <div id="homeContents">
          <span style={{ fontSize: "18px" }}>
            <strong>{selectedFriend.memId}</strong> 님의 할일 목록
          </span>
          <TodoList
            category={"TODO"}
            data={friendTodo}
            handleClick={handleMoveWrite}
            my={false}
          />
          <TodoList
            category={"HABIT"}
            data={friendHabit}
            handleClick={handleMoveWrite}
            my={false}
          />
        </div>
      </div>
    </>
  );
}
