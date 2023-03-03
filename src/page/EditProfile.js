import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import useSlideBack from "../hooks/useSlideBack";

import CameraAltIcon from "@mui/icons-material/CameraAlt";

//지울 것
import profileImg from "../assets/images/chuu.jpg";
import FlatButton from "../components/FlatButton";
import ColumnText from "../components/ColumnText";
import { display, height } from "@mui/system";

const EditProfile = () => {
  let navigate = useNavigate();
  const [startX, setStartX] = useState(0);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");

  const nameRef = useRef(null);
  const bioRef = useRef(null);

  const handleNameInput = (e) => {
    setName(e.target.value);
  };

  const handleBioInput = (e) => {
    setBio(e.target.value);
  };

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
    <>
      <div
        style={{
          height: "inherit",
          margin: "24px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <section
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div>
            <div className="profileBadge">
              <img src={profileImg} alt="profileImg" className="profileImg" />
              <CameraAltIcon
                sx={{
                  position: "absolute",
                  bottom: 0,
                  right: 10,
                  zIndex: 10,
                  fontSize: "32px",
                  backgroundColor: "white",
                  borderRadius: "50%",
                  padding: "8px",
                }}
              />
            </div>
          </div>
          <h2>Chuu</h2>
        </section>
        <section
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: "20px",
            flexGrow: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "0.83em",
            }}
          >
            <ColumnText title="보낸 편지" content="6" />
            <ColumnText title="받은 편지" content="10" />
            <ColumnText title="습관 진행" content="+5" />
          </div>
          <span>사용자 이름</span>
          <input
            className="underlineInput"
            type="text"
            ref={nameRef}
            value={name}
            onChange={handleNameInput}
          />
          <span>한줄 소개</span>
          <input
            className="underlineInput"
            type="text"
            ref={bioRef}
            value={bio}
            onChange={handleBioInput}
          />
          <FlatButton
            name="수정 완료"
            style={{ marginTop: "auto", height: "60px", borderRadius: "20px" }}
          />
        </section>
        {/* <span>수정하시겠습니까 모달창</span> */}
      </div>
    </>
  );
};

export default EditProfile;
