import "../../style/index.scss";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useState } from "react";
import FlatButton from "../../components/FlatButton";
import ProfileDetail from "../../components/PorfileDetail";

//지울 것
import tempImg from "../../assets/images/yena.jpg";

export default function FriendsToggle({ user }) {
  const [isOpen, setIsOpen] = useState(false);

  const handlePostRequest = () => {
    console.log("편지 요청");
  };
  return (
    <>
      <div className="FriendsToggleHead" onClick={() => setIsOpen(!isOpen)}>
        <ArrowForwardIosIcon
          sx={{
            fontSize: "small",
            transform: isOpen ? "rotate(90deg)" : undefined,
            transition: "transform 0.5s ease-out",
          }}
        />
        <div>
          <span style={{ marginRight: "4px" }}>최예나</span>
          <FlatButton
            name="편지 요청"
            color="#BECAD6"
            onClick={handlePostRequest}
          />
        </div>
        <button className="DeleteButton">X</button>
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
