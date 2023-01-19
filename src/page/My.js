import Header from "../components/Header";
import Chip from "../components/Chip";
import FlatButton from "../components/FlatButton";

import coinEmoji from "../assets/images/coinEmoji.png";
import ProfileDetail from "../components/PorfileDetail";

//지울 것
import tempImg from "../assets/images/chuu.jpg";

export default function My() {
  const coinChip = <Chip emoji={coinEmoji} number={100} />;
  return (
    <div className="myDiv">
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
        hegiht="35px"
        marginBottom="20px"
      />
      <span className="tileText">비밀번호 변경</span>
      <span className="tileText">편지목록</span>
      <span className="tileText">화면설정</span>
      <span className="tileText">친구목록</span>
    </div>
  );
}
