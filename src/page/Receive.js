import { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Card from "../components/Card";
import Chip from "../components/Chip";
import Modal from "../components/Modal";
import PostRead from "../components/PostRead";
import coinEmoji from "../assets/images/coinEmoji.png";
import ToastPopUp from "../components/ToastPopUp";

import useSlideBack from "../hooks/useSlideBack";
import { useUser } from "../contexts/userProvider";
import { axios_get } from "../api/api";
import { useDate } from "../contexts/dateProvider";

export default function Receive() {
  const { state } = useLocation();
  const [modalOpen, setModalOpen] = useState(false);
  const [postOpen, setPostOpen] = useState(false);
  const [toastOpen, setToastOpen] = useState("");
  const [letterId, setLetterId] = useState();
  const [selectedData, setSelectedData] = useState({});
  const [period, setPeriod] = useState({
    startDate: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    endDate: new Date(),
  });
  const [isOpen, setIsOpen] = useState(true);
  const [periodText, setPeriodText] = useState("1개월");
  const [sort, setSort] = useState(true);
  const [postData, setPostData] = useState([]);
  const [startX, setStartX] = useState(0);
  const { user, changeUserData } = useUser();
  const { DateToStringFormat } = useDate();
  const [count, setCount] = useState(0);
  let navigate = useNavigate();

  useSlideBack("touchmove", startX, () => {
    navigate(-1);
  });

  const handlePostOpen = (
    isOpen,
    title,
    content,
    sender,
    cheerDo,
    date,
    letterId
  ) => {
    if (isOpen) {
      setSelectedData({ title, content, sender, cheerDo, date });
      setPostOpen(true);
    } else {
      setLetterId(letterId);
      setModalOpen(true);
    }
  };

  const handleNewPostOpen = async (state) => {
    if (state === "yes") {
      // 코인 수 만큼 차감하고 편지 내용 보여주기
      try {
        const response = await axios_get("letter", {
          letterId,
        });
        setSelectedData({
          title: response.title,
          content: response.message,
          sender: response.senderName,
          cheerDo: response.todoContent,
          date: response.sendDate,
        });
        setPostOpen(true);
        changeUserData({ ...user, coinCount: user.coinCount - 2 });
        getAllPosts();
      } catch (e) {
        console.error(e);
      } finally {
        setModalOpen(false);
      }
    } else {
      setModalOpen(false);
    }
  };

  const handleToast = (periodValue, sortValue, openValue, customDate) => {
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
      setIsOpen(openValue);
      setToastOpen("");
    }
  };

  const getAllPosts = useCallback(async () => {
    if (count === 0) {
      state && setIsOpen(false);
    }
    const data = {
      startDate:
        typeof period.startDate === "string"
          ? period.startDate
          : DateToStringFormat(period.startDate),
      endDate:
        typeof period.endDate === "string"
          ? period.endDate
          : DateToStringFormat(period.endDate),
      memberId: user.memberId,
      open: count === 0 && state ? false : isOpen,
      sortType: sort ? "ASC" : "DESC",
    };
    const response = await axios_get("post", data, "json", true);
    setPostData(response);
    setCount(count + 1);
  }, [period, DateToStringFormat, count, isOpen, sort, state, user.memberId]) 

  useEffect(() => {
    const handleTouchStart = (e) => {
      setStartX(e.targetTouches[0].screenX);
    };
    window.addEventListener("touchstart", (e) => handleTouchStart(e));
    return () => {
      window.removeEventListener("touchstart", (e) => handleTouchStart(e));
    };
  }, [startX]);

  useEffect(() => {
    getAllPosts();
  }, [period, getAllPosts]);

  return (
    <>
      <div className="marginDiv">
        <div className="smallHeader">
          <div onClick={handleToast}>
            <span>
              {periodText} - {sort ? "최신" : "오래된 순"} -{" "}
              {isOpen ? "읽은" : "안 읽은"}
            </span>
          </div>
          <Chip emoji={coinEmoji} number={user.coinCount} />
        </div>
        <section>
          {postData.length === 0 ? (
            <span>편지가 없습니다.</span>
          ) : (
            postData.map((data) => (
              <Card
                key={data.letterId}
                isOpen={isOpen}
                title={data.title}
                content={data.message}
                sender={data.senderName}
                cheerDo={data.todoContent}
                date={data.sendDate}
                onClick={handlePostOpen}
                letterId={data.letterId}
              />
            ))
          )}
        </section>
      </div>
      {modalOpen && (
        <Modal
          type="check"
          handleModalClick={handleNewPostOpen}
          banClickAway={true}
        >
          <span>편지를 열겠습니까? (코인 2개 필요)</span>
        </Modal>
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
        open={!(count === 0 && state)}
      />
    </>
  );
}
