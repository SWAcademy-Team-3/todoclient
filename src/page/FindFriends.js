import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import useTimeout from "../hooks/useTimeout";
import useSlideBack from "../hooks/useSlideBack";

import SearchIcon from "@mui/icons-material/Search";

//지울 것
import tempImg1 from "../assets/images/kim.jpg";
import tempImg2 from "../assets/images/yena.jpg";
import Tile from "../components/Tile";
import SimpleCalendar from "./HomeComponents/SimpleCalendar";
import TodoList from "./HomeComponents/TodoList";
import DateProvider from "../contexts/dateProvider";
import { v4 } from "uuid";
const dummyData = [
  {
    profileImg: tempImg1,
    memId: "_chaechae_1",
    name: "김채원 (CHAEWON)",
  },
  {
    profileImg: tempImg2,
    memId: "yena",
    name: "최예나",
  },
];
const dummyToDo = [
  {
    todo: "TODO1",
    limitTime: "17:00",
    isClear: true,
    tempId: v4(),
  },
  {
    todo: "TODO2",
    limitTime: "22:00",
    isClear: false,
    tempId: v4(),
  },
];

const dummyHabit = [
  {
    todo: "HABIT1",
    limitTime: null,
    isClear: false,
    tempId: v4(),
  },
];

export default function FindFriends() {
  let navigate = useNavigate();
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
  }, []);

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
          {dummyData.map(({ profileImg, memId, name }, index) => (
            <Tile
              key={index}
              profileImg={profileImg}
              memId={memId}
              name={name}
              type="check"
              handleClick={() => handleSelectFriend(profileImg, memId)}
            />
          ))}
        </div>
      </div>
      <DateProvider>
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
              data={dummyToDo}
              handleClick={handleMoveWrite}
              my={false}
            />
            <TodoList
              category={"HABIT"}
              data={dummyHabit}
              handleClick={handleMoveWrite}
              my={false}
            />
          </div>
        </div>
      </DateProvider>
    </>
  );
}
