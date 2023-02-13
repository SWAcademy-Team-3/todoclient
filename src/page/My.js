import Header from "../components/Header";
import Chip from "../components/Chip";
import FlatButton from "../components/FlatButton";

import coinEmoji from "../assets/images/coinEmoji.png";
import ProfileDetail from "../components/PorfileDetail";

import { useNavigate } from "react-router-dom";
//지울 것
import tempImg from "../assets/images/chuu.jpg";

export default function My() {
  let navigate = useNavigate();
  const coinChip = <Chip emoji={coinEmoji} number={100} />;

  const handlePagination = (path) => {
    navigate(path);
  };
  return (
    <div className="marginDiv">
      <Header left={"chuu"} right={coinChip} />
      <ProfileDetail
        profileImg={tempImg}
        sendPost={5}
        receivePost={8}
        dPlus={78}
        introduce="한 줄 소개를 입력해주세요"
        style={{ margin: "16px 0" }}
      />
      <FlatButton
        name="프로필 수정"
        color="#e5a8a6"
        width="100%"
        height="35px"
        marginBottom="20px"
      />
      <span className="tileText">비밀번호 변경</span>
      <span className="tileText" onClick={() => handlePagination("/receive")}>
        지난편지목록
      </span>
      <span className="tileText">알림설정</span>
      <span className="tileText">공지사항</span>
      <span className="tileText">상점</span>
    </div>
  );
}
