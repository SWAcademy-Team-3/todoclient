import { useState } from "react";
import Modal from "../../components/Modal";
import RequestTile from "../FriendsComponents/RequestTile";

const dummyData = ["카리나", "윈터", "우기", "민니"];

export default function FriendsRequest({ activeTab }) {
  const [modal, setModal] = useState(null);

  const handleModalClick = (type) => {
    if (type === "yes") {
      //TODO 친구 요청 수락 / 거절
    }
    setModal(null);
  };

  const handleAccept = () => {
    setModal(
      <Modal type="check" handleModalClick={handleModalClick}>
        <span className="modalMessage">친구 요청을 수락하시겠습니까?</span>
      </Modal>
    );
  };

  const handleDelete = () => {
    setModal(
      <Modal type="check" handleModalClick={handleModalClick}>
        <span className="modalMessage">친구 요청을 거절하시겠습니까?</span>
      </Modal>
    );
  };
  return (
    <div className={`TabContent1 ${activeTab === 1 && "reverse"}`}>
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
