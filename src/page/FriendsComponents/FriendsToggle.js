import "../../style/index.scss";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useState, useEffect } from "react";
import FlatButton from "../../components/FlatButton";
import ProfileDetail from "../../components/PorfileDetail";
import { axios_get } from "../../api/api";

import basicProfile from "../../assets/images/basic_profile.jpeg";

export default function FriendsToggle({ user, handleModal, relationId }) {
  const [isOpen, setIsOpen] = useState(false);
  const [info, setInfo] = useState({
    sendPost: 0,
    receivePost: 0,
    dPlus: 0,
    bio: "한 줄 소개를 입력해주세요",
    img: basicProfile,
  });

  const handlePostRequest = () => {
    handleModal(`${user}에게 편지를 요청하시겠습니까?`, relationId);
  };
  const handleOpen = (e) => {
    if (e.target.tagName !== "BUTTON") {
      setIsOpen(!isOpen);
    }
  };

  const getFriendsDetail = async () => {
    const response = await axios_get("friendInfo", {
      relationId,
    });
    setInfo({
      sendPost: response.sendLetterCount,
      receivePost: response.getLetterCount,
      dPlus: response.dplusCount,
      bio: response.bio,
      img: response.img !== null ? basicProfile : response.img,
    });
  };

  useEffect(() => {
    getFriendsDetail();
  }, []);

  return (
    <>
      <div className="FriendsToggleHead" onClick={(e) => handleOpen(e)}>
        <ArrowForwardIosIcon
          sx={{
            fontSize: "small",
            transform: isOpen ? "rotate(90deg)" : undefined,
            transition: "transform 0.5s ease-out",
          }}
        />
        <div>
          <span style={{ marginRight: "6px" }}>{user}</span>
          <FlatButton
            name="편지 요청"
            color="#BECAD6"
            style={{ marginRight: "6px", borderRadius: "12px" }}
            onClick={handlePostRequest}
          />
          <FlatButton
            name="편지 쓰기"
            style={{ borderRadius: "12px" }}
            color="#bb254a"
          />
        </div>
        <button
          className="DeleteButton"
          onClick={(e) => handleModal(`${user} 친구를 삭제할까요?`, relationId)}
        >
          X
        </button>
      </div>

      <div className={`FriendsToggleBody-${isOpen}`}>
        <ProfileDetail
          profileImg={info.img}
          sendPost={info.sendPost}
          receivePost={info.receivePost}
          dPlus={info.dPlus}
          introduce={info.bio}
        />
      </div>
    </>
  );
}
