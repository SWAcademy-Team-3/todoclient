import { useEffect, useRef, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Tile from "../components/Tile";
// 지울 것
import profileImg from "../assets/images/kim.jpg";
import useSlideBack from "../hooks/useSlideBack";
import useDebounce from "../hooks/useDebounce";

export default function AddFriends() {
  const [searchText, setSearchText] = useState("");
  const [startX, setStartX] = useState(0);
  let navigate = useNavigate();
  const inputRef = useRef(null);

  const handleTextInput = (e) => {
    setSearchText(e.target.value);
  };
  const handleAddButton = () => {
    console.log("친구를 추가하겠냐는 멘트");
  };
  const handleSearchFriends = async () => {
    try {
      const response = await axios.get(
        `http://49.50.163.197:8080/api/member/friend/search/${searchText}`,
        {
          searchStr: searchText,
        }
      );
      console.log(response.data);
    } catch (e) {
      console.error(e);
    }
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

  useDebounce(
    () => {
      handleSearchFriends();
    },
    300,
    [searchText]
  );

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
      <Tile
        profileImg={profileImg}
        memId="_chaechae_1"
        name="김채원 (CHAEWON)"
        type="add"
        handleClick={handleAddButton}
      />
    </div>
  );
}
