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
import { axios_post } from "../api/api";
import Toast from "../components/Toast";
import useTimeout from "../hooks/useTimeout";
import { getCookie } from "../service/Cookie";

export default function Friends() {
  const { user } = useUser();
  const [friendsList, setFriendsList] = useState([]);
  const [modalText, setModalText] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [relationId, setRelationId] = useState();
  const [toastMessage, setToastMessage] = useState("");
  const [openToast, setOpenToast] = useState(false);
  const [hasAlram, setHasAlram] = useState(false);
  const [toastClose, _] = useTimeout(() => {
    setOpenToast(false);
  }, 2000);
  const handleModalClick = async (type) => {
    if (type === "yes") {
      if (modalText.slice(9).trim() === "요청하시겠습니까?") {
        try {
          await axios_post(
            "post_request",
            {
              relationId,
            },
            "json",
            true
          );
          setToastMessage("편지 요청을 성공적으로 보냈습니다.");
        } catch (e) {
          console.error(e);
          setToastMessage("편지 요청에 실패하였습니다.");
        } finally {
          setOpenToast(true);
          toastClose();
        }
      } else {
        // TODO 친구삭제
        try {
          axios.defaults.headers.delete["Authorization"] = `Bearer ${getCookie(
            "access_token"
          )}`;
          await axios.delete(
            `http://49.50.163.197:8080/api/member/friend/relation/${relationId}`,
            {
              relationId,
            }
          );
          setToastMessage("친구를 삭제했습니다.");
          getFriendList();
        } catch (e) {
          setToastMessage("친구 삭제 중 오류 발생");
        } finally {
          setOpenToast(true);
          toastClose();
        }
      }
    }
    setOpenModal(false);
  };
  const handleModal = (message, relationId) => {
    setModalText(message);
    setRelationId(relationId);
    setOpenModal(true);
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
      setFriendsList(response.data);
    } catch (e) {
      console.error(e);
    }
  };

  const getNotificationInfo = async () => {
    try {
      const response = await axios.get(
        `http://49.50.163.197:8080/api/member/friend/requests/${user.memberId}/receive`,
        {
          memberId: user.memberId,
        }
      );
      response.data.length !== 0 && setHasAlram(true) 
    } catch (e) {
      console.error(e)
    }
  }
  useEffect(() => {
    getFriendList();
    getNotificationInfo()
  }, []);

  const HeaderLeft = <span>나의 친구</span>;
  const HeaderRight = (
    <>
      <Badge hasAlram={hasAlram} onClick={() => navigate("/notification")}>
        <NotificationsIcon />
      </Badge>
      <AddIcon onClick={() => navigate("/addFriends")} />
    </>
  );
  return (
    <div className="marginDiv">
      <Header left={HeaderLeft} right={HeaderRight} isHr={true} />
      <div id="friendsContents">
        {friendsList.length === 0 ? (
          <span style={{ marginTop: "8px"}}>아직은 친구가 없어요, 친구를 찾아보세요!</span>
        ) : (
          friendsList.map((friend) => (
            <FriendsToggle
              key={friend.memberId}
              user={friend.name}
              memberId={friend.memberId}
              relationId={friend.relationId}
              handleModal={handleModal}
            />
          ))
        )}
      </div>
      {openModal && (
        <Modal type="check" handleModalClick={handleModalClick}>
          <span className="modalMessage">{modalText}</span>
        </Modal>
      )}
      {openToast && (
        <Toast
          message={toastMessage}
          type={
            !(
              toastMessage === "편지 요청에 실패하였습니다." ||
              toastMessage === "친구 삭제 중 오류 발생"
            )
          }
        />
      )}
    </div>
  );
}
