import tempCardOpen from "../assets/images/tempCardOpen.jpg";
import tempCardClose from "../assets/images/tempCardClose.png";

export default function Card({ isOpen, title, content, sender, onClick }) {
  return (
    <div
      className="cardContainer"
      onClick={() => onClick(isOpen, title, content, sender)}
    >
      <div className="cardImgDiv">
        <img className="cardImg" src={isOpen ? tempCardOpen : tempCardClose} />
      </div>
      <div className="cardContents">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "8px",
          }}
        >
          <span
            className="limitText"
            style={{ fontSize: "22px", fontWeight: "600" }}
          >
            {title}
          </span>
          <span style={{ fontSize: "16px" }}>{sender}</span>
        </div>
        <span
          className="limitText"
          style={{ fontSize: "16px", marginLeft: "8px" }}
        >
          {isOpen ? content : "편지를 확인해야 볼 수 있습니다."}
        </span>
      </div>
    </div>
  );
}
