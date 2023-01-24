import { useState } from "react";

import Card from "../components/Card";
import Chip from "../components/Chip";
import Modal from "../components/Modal";
import PostRead from "../components/PostRead";
import coinEmoji from "../assets/images/coinEmoji.png";
import ToastPopUp from "../components/ToastPopUp";

const dummyData = [
  {
    title: "test",
    content: "testcontetnt",
    sender: "yena",
    isOpen: false,
    timestamp: "2023-01-24",
  },
  {
    title: "지우야 사랑해",
    content:
      "김지우 지켜츄 김지우 지켜츄 김지우 지켜츄 김지우 지켜츄 김지우 지켜츄",
    sender: "im_younique",
    isOpen: true,
    timestamp: "2023-01-23",
  },
  {
    title: "test3",
    content: "testcontetntttttttttttttttttttttttttttttttttttasdafsdfsda",
    sender: "yena",
    isOpen: true,
    timestamp: "2023-01-23",
  },
  {
    title: "제목이 길어져볼께ㅔㅔㅔㅔㅔㅔㅔㅔㅔㅔㅔㅔㅔㅔㅔㅔㅔ",
    content: "testcontetntttttttttttttttttttttttttttttttttttasdafsdfsda",
    sender: "yena",
    isOpen: true,
    timestamp: "2022-12-17",
  },
];

export default function Receive() {
  const [modalOpen, setModalOpen] = useState(false);
  const [postOpen, setPostOpen] = useState(false);
  const [toastOpen, setToastOpen] = useState("");
  const [selectedData, setSelectedData] = useState({});
  const handlePostOpen = (isOpen, title, content, sender) => {
    if (isOpen) {
      setPostOpen(true);
      setSelectedData({ title, content, sender });
    } else {
      setModalOpen(true);
    }
  };

  const handleNewPostOpen = (state) => {
    if (state === "yes") {
      // 코인 수 만큼 차감하고 편지 내용 보여주기
    } else {
      setModalOpen(false);
    }
  };

  const handleToast = () => {
    if (toastOpen === "") {
      setToastOpen("toastOpen");
    } else {
      setToastOpen("");
    }
  };

  return (
    <>
      <div className="marginDiv">
        <div className="smallHeader">
          <div onClick={handleToast}>
            <span>1개월 - 전체 - 최신</span>
          </div>
          <Chip emoji={coinEmoji} number={100} />
        </div>
        <section>
          {dummyData
            .filter((data) => data.isOpen === true)
            .map((data, index) => (
              <Card
                key={index}
                isOpen={data.isOpen}
                title={data.title}
                content={data.content}
                sender={data.sender}
                onClick={handlePostOpen}
              />
            ))}
        </section>
      </div>
      {modalOpen && (
        <Modal
          type="check"
          message="편지를 열겠습니까? (코인 2개 필요)"
          handleModalClick={handleNewPostOpen}
        />
      )}
      {postOpen && (
        <PostRead
          selectedData={selectedData}
          onClose={() => setPostOpen(false)}
        />
      )}
      <ToastPopUp openClass={toastOpen} handleToast={handleToast} />
    </>
  );
}
