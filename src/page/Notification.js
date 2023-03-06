import useSlideBack from "../hooks/useSlideBack";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import FriendsRequest from "./NotificationTab/FriendsRequest";
import PostRequest from "./NotificationTab/PostRequest";

export default function Notification() {
  const [startX, setStartX] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  let navigate = useNavigate();

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
      <div className="TabHeader">
        <button
          className={`tab ${activeTab === 0 ? "select" : undefined}`}
          onClick={() => setActiveTab(0)}
        >
          친구 요청 목록
        </button>
        <button
          className={`tab ${activeTab === 1 ? "select" : undefined}`}
          onClick={() => setActiveTab(1)}
        >
          편지 요청 목록
        </button>
      </div>
      {activeTab === 0 ? (
        <FriendsRequest activeTab={activeTab} />
      ) : (
        <PostRequest activeTab={activeTab} />
      )}
    </div>
  );
}
