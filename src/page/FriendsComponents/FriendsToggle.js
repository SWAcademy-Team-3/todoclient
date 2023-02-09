import "../../style/index.scss";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useState } from "react";
import FlatButton from "../../components/FlatButton";
import ProfileDetail from "../../components/PorfileDetail";

//지울 것
import tempImg from "../../assets/images/yena.jpg";

export default function FriendsToggle({ user, handleModal }) {
  const [isOpen, setIsOpen] = useState(false);

  const handlePostRequest = () => {
    handleModal("check", `${user}에게 편지를 요청하시겠습니까?`);
  };
  const handleOpen = (e) => {
    if (e.target.tagName !== "BUTTON") {
      setIsOpen(!isOpen);
    }
  };
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
          <span style={{ marginRight: "4px" }}>{user}</span>
          <FlatButton
            name="편지 요청"
            color="#BECAD6"
            onClick={handlePostRequest}
          />
        </div>
        <button
          className="DeleteButton"
          onClick={(e) => handleModal("check", `${user} 친구를 삭제할까요?`)}
        >
          X
        </button>
      </div>

      <div className={`FriendsToggleBody-${isOpen}`}>
        <ProfileDetail
          profileImg={tempImg}
          sendPost={4}
          receivePost={7}
          dPlus={34}
          introduce="친구가 작성 한줄 소개글을 이곳에서 확인할 수 있습니다."
        />
      </div>
    </>
  );
}
