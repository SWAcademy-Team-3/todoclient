export default function PostRead({ selectedData, onClose }) {
  const { title, content, sender, cheerDo, date } = selectedData;
  return (
    <div className="modalBackground">
      <button onClick={onClose} className="closeBtn">
        편지 닫기 X
      </button>
      <div className="postContent">
        <h4 style={{ margin: "8px 0" }}> 제목 : {title}</h4>
        <h5 style={{ margin: "8px 0" }}> 응원한 TODO : {cheerDo}</h5>
        <span>{content}</span>
        <span>
          보낸이 : {sender} {`${date[0]}-${date[1]}-${date[2]}`}
        </span>
      </div>
    </div>
  );
}
