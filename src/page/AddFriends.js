import { useEffect, useRef, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

import AddTile from "./FriendsComponents/AddTile";
// 지울 것
import profileImg from "../assets/images/kim.jpg";
import useSlideBack from "../hooks/useSlideBack";

export default function AddFriends() {
  const [searchText, setSearchText] = useState("");
  const [startX, setStartX] = useState(0);
  let navigate = useNavigate();
  const inputRef = useRef(null);

  const handleTextInput = (e) => {
    setSearchText(e.target.value);
  };
  //윈도우 전역에 터치가 시작될 때의 좌표를 기록함
  //윈도우 전역에서 터치가 이동할 때 x좌표가 + 쪽으로 어느정도 이동하면 navigate(-1)을 한다.
  useSlideBack("touchmove", startX, () => {
    navigate(-1);
  });
  useEffect(() => {
    const handleTouchStart = (e) => {
      setStartX(e.targetTouches[0].screenX);
    };
    window.addEventListener("touchstart", (e) => handleTouchStart(e));
    return () => {
      window.removeEventListener("touchstart", (e) => handleTouchStart(e));
    };
  }, [startX]);
  return (
    <div className="marginDiv">
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
      <AddTile
        profileImg={profileImg}
        memId="_chaechae_1"
        name="김채원 (CHAEWON)"
      />
    </div>
  );
}