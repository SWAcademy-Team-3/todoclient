import { useEffect, useRef, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Tile from "../components/Tile";
import Modal from "../components/Modal";

import useSlideBack from "../hooks/useSlideBack";
import useDebounce from "../hooks/useDebounce";

import basicImg from "../assets/images/basic_profile.jpeg";
import { axios_post } from "../api/api";
import { useUser } from "../contexts/userProvider";
import Toast from "../components/Toast";
import useTimeout from "../hooks/useTimeout";

export default function AddFriends() {
  const [searchText, setSearchText] = useState("");
  const [startX, setStartX] = useState(0);
  const [searchResult, setSearchResult] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState();
  const [openToast, setOpenToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const { user } = useUser();
  let navigate = useNavigate();
  const inputRef = useRef(null);

  const [toastClose, _] = useTimeout(() => {
    setOpenToast(false);
  }, 2000);

  const handleTextInput = (e) => {
    setSearchText(e.target.value);
    localStorage.setItem("friendSearch", e.target.value);
  };
  const handleAddButton = (friendId) => {
    setSelectedFriend(friendId);
    setOpenModal(true);
  };

  const handleRequestAddFriend = async (value) => {
    if (value === "yes") {
      const data = {
        friendId: selectedFriend,
        memberId: user.memberId,
      };
      const response = await axios_post("friend_request", data, "json", true);
      if (response === "") {
        setToastMessage(`${selectedFriend}님에게 친구 요청을 보냈어요`);
      } else {
        setToastMessage(`친구 요청에 실패했어요 다시보내보세요`);
      }
      setOpenToast(true);
      toastClose();
    }
    setOpenModal(false);
  };
  const handleSearchFriends = async () => {
    try {
      const response = await axios.get(
        `http://49.50.163.197:8080/api/member/friend/search/${searchText}`,
        {
          searchStr: searchText,
        }
      );
      setSearchResult(response.data);
    } catch (e) {
      console.error(e);
    }
  };

  const InitdataGet = async (text) => {
    try {
      const response = await axios.get(
        `http://49.50.163.197:8080/api/member/friend/search/${text}`,
        {
          searchStr: text,
        }
      );
      setSearchResult(response.data);
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

  useEffect(() => {
    const text = localStorage.getItem("friendSearch");
    InitdataGet(text);
  }, []);

  useDebounce(
    () => {
      handleSearchFriends();
    },
    300,
    [searchText]
  );

  return (
    <>
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
        {searchResult.map((friend) => (
          <Tile
            key={friend.memberId}
            profileImg={
              friend.image ? `data:image/;base64,${friend.image}` : basicImg
            }
            memId={friend.memberId}
            name={friend.name}
            type="add"
            handleClick={() => handleAddButton(friend.memberId)}
          />
        ))}
        {openModal && (
          <Modal handleModalClick={handleRequestAddFriend}>
            <span>친구 추가요청을 보내시겠습니까?</span>
          </Modal>
        )}
      </div>
      {openToast && (
        <Toast
          message={toastMessage}
          type={toastMessage !== "친구 요청에 실패했어요 다시보내보세요"}
        />
      )}
    </>
  );
}
