import { useState } from "react";
import PostClose from "./PostComponents/PostClose";
import PostOpen from "./PostComponents/PostOpen";
import Chip from "../components/Chip";
import Modal from "../components/Modal";

import coinEmoji from "../assets/images/coinEmoji.png";
import postEmoji from "../assets/images/postEmoji.png";

export default function Post() {
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
  return (
    <>
      <div className="marginDiv">
        <div className="PostHeader">
          <span className="linkText">이전 편지 읽으러 가기</span>
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
        <Modal
          message="읽을 편지가 존재하지 않습니다. 편지를 요청해보세요"
          type="alert"
          handleModalClick={handleModalClick}
        />
      ) : null}
    </>
  );
}
