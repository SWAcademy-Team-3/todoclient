import Header from "../components/Header";
import Badge from "../components/Badge";
import AddIcon from "@mui/icons-material/Add";
import NotificationsIcon from "@mui/icons-material/Notifications";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FriendsToggle from "./FriendsComponents/FriendsToggle";
import Modal from "../components/Modal";

export default function Friends() {
  const [friendsList, setFriendsList] = useState([]);
  const [modal, setModal] = useState(null);
  const handleModalClick = (type) => {
    if (type === "yes") {
      //TODO 친구 삭제 로직
    }
    setModal(null);
  };
  const handleModal = (type, message) => {
    setModal(
      <Modal
        type={type}
        message={message}
        handleModalClick={handleModalClick}
      />
    );
  };
  let navigate = useNavigate();

  useEffect(() => {
    //TODO 친구목록 불러오기
  }, []);

  const HeaderLeft = <span>나의 친구</span>;
  const HeaderRight = (
    <>
      <Badge count={2} maxCount={3} onClick={() => navigate("/notification")}>
        <NotificationsIcon />
      </Badge>
      <AddIcon onClick={() => navigate("/addFriends")} />
    </>
  );
  return (
    <div className="marginDiv">
      <Header left={HeaderLeft} right={HeaderRight} isHr={true} />
      <div id="friendsContents">
        <FriendsToggle user="최예나" handleModal={handleModal} />
        <FriendsToggle user="최예나" handleModal={handleModal} />
        <FriendsToggle user="최예나" handleModal={handleModal} />
        <FriendsToggle user="최예나" handleModal={handleModal} />
        <FriendsToggle user="최예나" handleModal={handleModal} />
      </div>
      {modal}
    </div>
  );
}
