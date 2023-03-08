import Header from "../components/Header";
import Chip from "../components/Chip";
import FlatButton from "../components/FlatButton";

import coinEmoji from "../assets/images/coinEmoji.png";
import ProfileDetail from "../components/PorfileDetail";

import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/userProvider";
import { removeCookie } from "../service/Cookie";
//지울 것
import basicImage from "../assets/images/basic_profile.jpeg";
import { useCallback, useEffect, useState } from "react";
import { axios_get } from "../api/api";

export default function My() {
  let navigate = useNavigate();
  const { user, changeUserData } = useUser();
  const [dPlus, setDPlus] = useState(0);
  const [bio, setBio] = useState("한 줄 소개를 입력해주세요.");
  const [receivePost, setReceivePost] = useState(0);
  const [sendPost, setSendPost] = useState(0);
  const [profileImg, setProfileImg] = useState(basicImage);
  const coinChip = <Chip emoji={coinEmoji} number={user.coinCount} />;

  const handlePagination = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    //TODO 로그아웃 확인 Confirm 받고 로그아웃 시킬 것
    localStorage.removeItem("userData");
    removeCookie("access_token");
    changeUserData({
      memberId: "",
      newLetterCount: "",
      coinCount: "",
    });
    navigate("/login");
  };

  const getUserData = useCallback(async () => {
    const response = await axios_get("myInfo", {
      memberId: user.memberId,
    });
    setBio(response.bio);
    setDPlus(response.dplusCount);
    setReceivePost(response.receivePostCount);
    setSendPost(response.sendPostCount);
    response.image && setProfileImg(`data:image/;base64,${response.image}`);
  }, [user.memberId]) 

  useEffect(() => {
    //TODO user 정보를 토대로 bio, 주고받은 편지 등 정보 받아오기
    getUserData();
  }, [getUserData]);
  return (
    <div className="marginDiv">
      <Header left={user.memberName} right={coinChip} />
      <ProfileDetail
        profileImg={profileImg}
        sendPost={sendPost}
        receivePost={receivePost}
        dPlus={`+${dPlus}`}
        introduce={bio}
        style={{ margin: "16px 0" }}
      />
      <FlatButton
        name="프로필 수정"
        color="#e5a8a6"
        style={{
          width: "100%",
          height: "35px",
          marginBottom: "20px",
          borderRadius: "12px",
        }}
        borderRadius="12px"
        onClick={() =>
          navigate("/edit", {
            state: {
              name: user.memberName,
              memberId: user.memberId,
              bio,
              profileImg,
              dPlus,
              receivePost,
              sendPost,
            },
          })
        }
      />
      <span className="tileText">비밀번호 변경</span>
      <span className="tileText" onClick={() => handlePagination("/receive")}>
        지난편지목록
      </span>
      <span className="tileText">알림설정</span>
      <span className="tileText">공지사항</span>
      <span className="tileText">상점</span>
      <span className="tileText" onClick={handleLogout}>
        로그아웃
      </span>
    </div>
  );
}
