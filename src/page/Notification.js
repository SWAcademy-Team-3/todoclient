import Header from "../components/Header";
import Modal from "../components/Modal";
import RequestTile from "./FriendsComponents/RequestTile";
import useSlideBack from "../hooks/useSlideBack";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const dummyData = ["카리나", "윈터", "우기", "민니"];

export default function Notification() {
  const [startX, setStartX] = useState(0);
  const [modal, setModal] = useState(null);
  let navigate = useNavigate();

  const handleModalClick = (type) => {
    if (type === "yes") {
      //TODO 친구 요청 수락 / 거절
    }
    setModal(null);
  };

  const handleAccept = () => {
    setModal(
      <Modal
        type="check"
        message="친구 요청을 수락하시겠습니까?"
        handleModalClick={handleModalClick}
      />
    );
  };

  const handleDelete = () => {
    setModal(
      <Modal
        type="check"
        message="친구 요청을 거절하시겠습니까?"
        handleModalClick={handleModalClick}
      />
    );
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
    <div className="marginDiv">
      <Header left="친구 요청" isHr={true} />
      <div style={{ margin: "12px 0" }}></div>
      {dummyData.map((name, index) => {
        if (index === dummyData.length - 1) {
          return (
            <RequestTile
              key={index}
              name={name}
              acceptClick={handleAccept}
              deleteClick={handleDelete}
              isHr={false}
            />
          );
        }
        return (
          <RequestTile
            key={index}
            name={name}
            acceptClick={handleAccept}
            deleteClick={handleDelete}
            isHr={true}
          />
        );
      })}
      {modal}
    </div>
  );
}
