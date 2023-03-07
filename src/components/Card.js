import tempCardOpen from "../assets/images/tempCardOpen.jpg";
import tempCardClose from "../assets/images/tempCardClose.png";

export default function Card({
  isOpen,
  title,
  content,
  sender,
  cheerDo,
  date,
  onClick,
  letterId,
}) {
  return (
    <div
      className="cardContainer"
      onClick={() =>
        onClick(isOpen, title, content, sender, cheerDo, date, letterId)
      }
    >
      <div className="cardImgDiv">
        <img className="cardImg" src={isOpen ? tempCardOpen : tempCardClose} />
      </div>
      <div className="cardContents">
        <div
          style={{
            display: "flex",
            margin: "8px",
          }}
        >
          <span
            className="limitText"
            style={{ fontSize: "22px", fontWeight: "600", flex: 3 }}
          >
            {title}
          </span>
          <span style={{ fontSize: "16px", flex: 1, textAlign: "right" }}>
            {sender}
          </span>
        </div>
        <div
          style={{
            display: "flex",
            margin: "8px",
            alignItems: "center",
          }}
        >
          <span
            className="limitText"
            style={{ fontSize: "16px", marginLeft: "8px", flex: 5 }}
          >
            {isOpen ? content : "편지를 열어주세요."}
          </span>
          <span style={{ fontSize: "8px", flex: 2, textAlign: "right" }}>
            {`${date[0]}-${date[1]}-${date[2]}`}
          </span>
        </div>
      </div>
    </div>
  );
}
