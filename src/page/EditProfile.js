import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import useSlideBack from "../hooks/useSlideBack";

import CameraAltIcon from "@mui/icons-material/CameraAlt";

//지울 것
import profileImg from "../assets/images/chuu.jpg";
import FlatButton from "../components/FlatButton";

const EditProfile = () => {
  let navigate = useNavigate();
  const [startX, setStartX] = useState(0);
  const [name, setName] = useState();
  const [bio, setBio] = useState();

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
      <div style={{ margin: "24px" }}>
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
          style={{ display: "flex", flexDirection: "column", fontSize: "20px" }}
        >
          <span>사용자 이름</span>
          <input className="underlineInput" type="text" />
          <span>한줄 소개</span>
          <input className="underlineInput" type="text" />
          <FlatButton name="수정 완료" />
        </section>
        {/* <span>수정하시겠습니까 모달창</span> */}
      </div>
    </>
  );
};

export default EditProfile;
