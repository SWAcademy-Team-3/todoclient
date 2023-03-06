import Header from "../components/Header";
import Badge from "../components/Badge";
import AddIcon from "@mui/icons-material/Add";
import NotificationsIcon from "@mui/icons-material/Notifications";

import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FriendsToggle from "./FriendsComponents/FriendsToggle";
import Modal from "../components/Modal";
import { useUser } from "../contexts/userProvider";

export default function Friends() {
  const { user } = useUser();
  const [friendsList, setFriendsList] = useState([]);
  const [modalText, setModalText] = useState("");
  const [modal, setModal] = useState(null);
  const handleModalClick = (type) => {
    if (type === "yes") {
      //TODO 편지요청 / 친구삭제 로직
    }
    setModal(null);
  };
  const handleModal = (type, message) => {
    setModalText(message);
    setModal(
      <Modal type={type} handleModalClick={handleModalClick}>
        <span className="modalMessage">{modalText}</span>
      </Modal>
    );
  };
  let navigate = useNavigate();

  const getFriendList = async () => {
    try {
      const response = await axios.get(
        `http://49.50.163.197:8080/api/member/friend/list/${user.memberId}`,
        {
          memberId: user.memberId,
        }
      );
      // TODO 친구 목록 데이터 뿌리기
      console.log(response.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getFriendList();
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
