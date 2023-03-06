import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Card from "../components/Card";
import Chip from "../components/Chip";
import Modal from "../components/Modal";
import PostRead from "../components/PostRead";
import coinEmoji from "../assets/images/coinEmoji.png";
import ToastPopUp from "../components/ToastPopUp";

import useSlideBack from "../hooks/useSlideBack";
import { useUser } from "../contexts/userProvider";

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
  const [period, setPeriod] = useState({
    startDate: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    endDate: new Date(),
  });
  const [periodText, setPeriodText] = useState("1개월");
  const [sort, setSort] = useState(true);
  const [startX, setStartX] = useState(0);
  const { user } = useUser();
  let navigate = useNavigate();

  useSlideBack("touchmove", startX, () => {
    navigate(-1);
  });

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

  const handleToast = (periodValue, sortValue, customDate) => {
    if (toastOpen === "") {
      setToastOpen("toastOpen");
    } else {
      if (periodValue === "1") {
        setPeriod({
          startDate: new Date(new Date().setMonth(new Date().getMonth() - 1)),
          endDate: new Date(),
        });
        setPeriodText("1개월");
      } else if (periodValue === "3") {
        setPeriod({
          startDate: new Date(new Date().setMonth(new Date().getMonth() - 3)),
          endDate: new Date(),
        });
        setPeriodText("3개월");
      } else if (periodValue === "-1") {
        setPeriod({
          startDate: new Date(new Date().setMonth(new Date().getMonth() - 2)),
          endDate: new Date(new Date().setMonth(new Date().getMonth() - 1)),
        });
        setPeriodText("지난달");
      } else if (periodValue === "custom") {
        setPeriod({
          startDate: customDate.startDate,
          endDate: customDate.endDate,
        });
        setPeriodText("직접설정");
      }
      if (sortValue === "lastest") {
        setSort(true);
      } else if (sortValue === "oldest") {
        setSort(false);
      }
      setToastOpen("");
    }
  };

  const handlePeriod = (value) => {};

  const getAllPosts = async () => {};

  useEffect(() => {
    const handleTouchStart = (e) => {
      setStartX(e.targetTouches[0].screenX);
    };
    window.addEventListener("touchstart", (e) => handleTouchStart(e));
    return () => {
      window.removeEventListener("touchstart", (e) => handleTouchStart(e));
    };
  }, [startX]);

  useEffect(() => {}, []);

  return (
    <>
      <div className="marginDiv">
        <div className="smallHeader">
          <div onClick={handleToast}>
            <span>
              {periodText} - {sort ? "최신" : "오래된 순"}
            </span>
          </div>
          <Chip emoji={coinEmoji} number={user.coinCount} />
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
      <ToastPopUp
        openClass={toastOpen}
        handleToast={handleToast}
        handlePeriod={handlePeriod}
      />
    </>
  );
}
