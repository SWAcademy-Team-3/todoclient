import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import useTimeout from "../hooks/useTimeout";
import useSlideBack from "../hooks/useSlideBack";

import SearchIcon from "@mui/icons-material/Search";

//지울 것
import tempImg1 from "../assets/images/kim.jpg";
import tempImg2 from "../assets/images/yena.jpg";
import Tile from "../components/Tile";
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

export default function FindFriends() {
  let navigate = useNavigate();
  const [typingAnimationEnd, setTypingAnimationEnd] = useState(false);
  const [fadeAnimationEnd, setFadeAnimationEnd] = useState(false);
  const [startX, setStartX] = useState(0);
  const [searchText, setSearchText] = useState("");
  const inputRef = useRef();
  const [typingAnimation, typingClear] = useTimeout(() => {
    setTypingAnimationEnd(true);
  }, 3000);
  const [fadeAnimation, fadeClear] = useTimeout(() => {
    setFadeAnimationEnd(true);
  }, 4400);

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

  const handleMoveWrite = (profileImg, memId) => {
    navigate("/write", {
      state: {
        profileImg,
        memId,
        location: "findFriends",
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
          className="fadeInDiv"
          style={{ display: !typingAnimationEnd ? "none" : "block" }}
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
              handleClick={() => handleMoveWrite(profileImg, memId)}
            />
          ))}
        </div>
      </div>
    </>
  );
}
