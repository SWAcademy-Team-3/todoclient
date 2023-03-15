import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router";
import useSlideBack from "../hooks/useSlideBack";

import CameraAltIcon from "@mui/icons-material/CameraAlt";
import FlatButton from "../components/FlatButton";
import ColumnText from "../components/ColumnText";
import Modal from "../components/Modal";
import { axios_post } from "../api/api";
import { useUser } from "../contexts/userProvider";

const EditProfile = () => {
  let navigate = useNavigate();
  const { state } = useLocation();
  const { user, changeUserData } = useUser();

  const [startX, setStartX] = useState(0);
  const [name, setName] = useState(state.name);
  const [bio, setBio] = useState(state.bio);
  const [profileImg, setProfileImg] = useState(state.profileImg);
  const [uploadImg, setUploadImg] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [modalText, setModalText] = useState("");

  const nameRef = useRef(null);
  const bioRef = useRef(null);
  const imgRef = useRef(null);

  const handleChooseFile = () => {
    imgRef.current.click();
  };

  const handleImgInput = (e) => {
    // TODO 이미지 아닌 파일 예외처리
    const file = e.target.files[0];
    setUploadImg(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setProfileImg(reader.result);
    };
  };

  const handleNameInput = (e) => {
    setName(e.target.value);
  };

  const handleBioInput = (e) => {
    setBio(e.target.value);
  };

  const handleModalOpen = (text) => {
    setModalText(text);
    setOpenModal(true);
  };

  const handleModalClick = async (value) => {
    if (value === "yes") {
      if (
        modalText === "나가면 변경사항이 수정되지 않습니다. 나가시겠습니까?"
      ) {
        navigate(-1);
      } else {
        // TODO 프로필 업데이트
        let flag = false;
        try {
          const data = {
            memberId: state.memberId,
            updateBio: bio,
            updateName: name,
            uploadImage: uploadImg,
          };
          await axios_post("info", data, "form", true);
          changeUserData({...user, memberName: name})
          setModalText("프로필 업데이트에 성공하였습니다.");
          flag = true;
        } catch (e) {
          console.error(e);
          setModalText("프로필 업데이트에 실패하였습니다.");
        } finally {
          setTimeout(() => {
            setOpenModal(false);
            flag && navigate(-1);
          }, 1500);
        }
      }
    } else {
      setOpenModal(false);
    }
  };

  useSlideBack("touchmove", startX, () => {
    if (
      state.name !== name ||
      state.bio !== bio ||
      state.profileImg !== profileImg
    ) {
      // TODO 모달로 경고창 나가시겠습니까?
      handleModalOpen("나가면 변경사항이 수정되지 않습니다. 나가시겠습니까?");
    } else {
      navigate(-1);
    }
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
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                ref={imgRef}
                onChange={handleImgInput}
              />
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
                onClick={handleChooseFile}
              />
            </div>
          </div>
          <h2>{state.memberId}</h2>
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
            <ColumnText title="보낸 편지" content={state.sendPost} />
            <ColumnText title="받은 편지" content={state.receivePost} />
            <ColumnText title="습관 진행" content={`+${state.dPlus}`} />
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
            onClick={() => handleModalOpen("프로필을 수정하시겠습니까?")}
          />
        </section>
        {openModal && (
          <Modal type="check" handleModalClick={handleModalClick}>
            <span>{modalText}</span>
          </Modal>
        )}
      </div>
    </>
  );
};

export default EditProfile;
