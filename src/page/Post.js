import { useState } from "react";
import PostClose from "./PostComponents/PostClose";
import PostOpen from "./PostComponents/PostOpen";
import Chip from "../components/Chip";
import Modal from "../components/Modal";
import EditIcon from "@mui/icons-material/Edit";

import coinEmoji from "../assets/images/coinEmoji.png";
import postEmoji from "../assets/images/postEmoji.png";
import { useNavigate } from "react-router";
import { axios_get } from "../api/api";

export default function Post() {
  let navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handlePostClick = () => {
    if (!open) {
      setOpen(!open);
      setTimeout(() => {
        setModalOpen(!modalOpen);
      }, 300);
    } else {
      setOpen(false);
      setModalOpen(false);
    }
  };

  const handleModalClick = () => {
    handlePostClick();
  };

  const navigateToReceive = () => {
    navigate("/receive");
  };

  // const getUnreadPost = async () => {
  //   const data =
  //   const response = axios_get("post", )
  // }

  return (
    <>
      <div className="marginDiv">
        <div className="PostHeader">
          <span className="linkText" onClick={navigateToReceive}>
            이전 편지 읽으러 가기
          </span>
          <div style={{ display: "flex" }}>
            <Chip number={10} emoji={postEmoji} />
            <Chip number={100} emoji={coinEmoji} />
          </div>
        </div>
      </div>
      <div className="PostDiv" onClick={handlePostClick}>
        {open ? <PostOpen /> : <PostClose />}
      </div>
      {modalOpen ? (
        <Modal type="alert" handleModalClick={handleModalClick}>
          <span className="modalMessage">
            읽을 편지가 존재하지 않습니다. 편지를 요청해보세요
          </span>
        </Modal>
      ) : null}
      <div className="floatingButton" onClick={() => navigate("/find")}>
        <EditIcon sx={{ fontSize: 40, marginTop: "18px" }} />
      </div>
    </>
  );
}
