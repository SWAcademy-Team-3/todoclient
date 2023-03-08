import { useState, useEffect, useCallback } from "react";
import axios from "axios";

import Modal from "../../components/Modal";
import { useUser } from "../../contexts/userProvider";
import RequestTile from "../FriendsComponents/RequestTile";
import { axios_post } from "../../api/api";

export default function FriendsRequest({ activeTab }) {
  const [openModal, setOpenModal] = useState(false);
  const [modalText, setModalText] = useState("");
  const [relationId, setRelationId] = useState(0);
  const [requestList, setRequestList] = useState([]);
  const { user } = useUser();

  const handleModalClick = async (type) => {
    if (type === "yes") {
      //TODO requestId 받아서 넣기
      const data = {
        accept: modalText === "친구 요청을 수락하시겠습니까?",
        relationId,
      };
      await axios_post("friend_request_control", data, "json", true);
      getRequestData();
    }
    setOpenModal(false);
  };

  const getRequestData = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://49.50.163.197:8080/api/member/friend/requests/${user.memberId}/receive`,
        {
          memberId: user.memberId,
        }
      );
      // TODO Tile에 데이터 집어 넣기
      setRequestList(response.data);
    } catch (e) {
      console.error(e);
    }
  }, [user.memberId]) 

  useEffect(() => {
    getRequestData();
  }, [getRequestData]);

  const handleButton = (value, id) => {
    setRelationId(id);
    if (value === "yes") {
      setModalText("친구 요청을 수락하시겠습니까?");
      setOpenModal(true);
    } else {
      setModalText("친구 요청을 거절하시겠습니까?");
      setOpenModal(true);
    }
  };
  return (
    <div className={`TabContent1 ${activeTab === 1 && "reverse"}`}>
      {requestList.length === 0 ? (
        <span>친구 요청 목록이 없어요</span>
      ) : (
        requestList.map((data, index) => {
          if (index === requestList.length - 1) {
            return (
              <RequestTile
                key={data.memberId}
                name={data.name}
                acceptClick={() => handleButton("yes", data.relationId)}
                deleteClick={() => handleButton("no", data.relationId)}
                isHr={false}
              />
            );
          }
          return (
            <RequestTile
              key={data.memberId}
              name={data.name}
              acceptClick={() => handleButton("yes", data.relationId)}
              deleteClick={() => handleButton("no", data.relationId)}
              isHr={true}
            />
          );
        })
      )}
      {openModal && (
        <Modal type="check" handleModalClick={handleModalClick}>
          <span className="modalMessage">{modalText}</span>
        </Modal>
      )}
    </div>
  );
}
