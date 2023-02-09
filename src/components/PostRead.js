export default function PostRead({ selectedData, onClose }) {
  const { title, content, sender } = selectedData;
  return (
    <div className="modalBackground">
      <button onClick={onClose} className="closeBtn">
        편지 닫기 X
      </button>
      <div className="postContent">
        <h3>{title}</h3>
        <span>{content}</span>
        <span>보낸이 : {sender}</span>
      </div>
    </div>
  );
}
