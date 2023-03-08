import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { useUser } from "../contexts/userProvider";

import basic_profile from "../assets/images/basic_profile.jpeg";
import FlatButton from "../components/FlatButton";
import { axios_get, axios_post } from "../api/api";
import Modal from "../components/Modal";

export default function Write() {
  let navigate = useNavigate();
  const { user, changeUserData } = useUser();
  const { state } = useLocation();
  const titleRef = useRef();
  const contentRef = useRef();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [myProfileImg, setMyProfileImg] = useState(basic_profile);

  const [openModal, setOpenModal] = useState(false);
  const [modalText, setModalText] = useState("");

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleContent = (e) => {
    setContent(e.target.value);
  };

  const getMyProfileImg = useCallback(async () => {
    const response = await axios_get("myInfo", {
      memberId: user.memberId,
    });
    response.image && setMyProfileImg(`data:image/;base64,${response.image}`);
  }, [user.memberId]) 

  const handleWritePost = async () => {
    if (title === "" || content === "") {
      // 빈 내용 입력 방지
      setModalText("제목, 내용을 작성해 주세요");
      setOpenModal(true);
    }
    const data = {
      message: content,
      relationId: state.relationId,
      title,
      todoId: state.todoId,
    };
    try {
      await axios_post("letter", data, "json", true);
      changeUserData({ ...user, coinCount: user.coinCount + 5 });
      setModalText("편지 쓰기에 성공하였습니다.");
    } catch (e) {
      setModalText("편지 쓰기에 실패하였습니다. 다시 시도해주세요");
    } finally {
      setOpenModal(true);
    }
  };

  const handleModalAlertClick = () => {
    if (modalText === "편지 쓰기에 성공하였습니다.") {
      setOpenModal(false);
      navigate("/post");
    } else {
      setOpenModal(false);
    }
  };

  useEffect(() => {
    getMyProfileImg();
  }, [getMyProfileImg]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "inherit",
        gap: "16px",
        margin: "16px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <span>보낸이 : </span>
          <div
            className="profileImgDiv"
            style={{ width: "40px", height: "40px" }}
          >
            <img src={myProfileImg} alt="profileImg" className="profileImg" />
          </div>
          <span>{user.memberId}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <span>받는이 : </span>
          <div
            className="profileImgDiv"
            style={{ width: "40px", height: "40px" }}
          >
            <img
              src={state.profileImg}
              alt="profileImg"
              className="profileImg"
            />
          </div>
          <span>{state.memId}</span>
        </div>
      </div>
      <div>
        <span>
          응원할 {state.category} : {state.todo}
        </span>
      </div>
      <div
        style={{
          border: "1px solid black",
          borderRadius: "5px",
          height: "38px",
        }}
      >
        <input
          className="blankInput"
          type="text"
          placeholder="편지제목을 입력하세요"
          style={{ fontSize: "22px", fontWeight: 700, width: "98%" }}
          ref={titleRef}
          value={title}
          onChange={(e) => handleTitle(e)}
        />
      </div>
      <div
        style={{
          flexGrow: 1,
          border: "1px solid black",
          borderRadius: "5px",
        }}
      >
        <textarea
          className="blankInput"
          type="text"
          placeholder="내용을 입력하세요"
          style={{ width: "100%", height: "100%" }}
          ref={contentRef}
          value={content}
          onChange={(e) => handleContent(e)}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <FlatButton
          name="편지쓰기"
          style={{ width: "120px", height: "50px", borderRadius: "12px" }}
          onClick={handleWritePost}
        />
        <FlatButton
          name="편지취소"
          style={{ width: "120px", height: "50px", borderRadius: "12px" }}
          onClick={() =>
            state.location === "findFriends" ? navigate(-2) : navigate(-1)
          }
        />
      </div>
      {openModal && (
        <Modal type="alert" handleModalClick={handleModalAlertClick}>
          {modalText}
        </Modal>
      )}
    </div>
  );
}
