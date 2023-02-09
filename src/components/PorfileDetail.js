import ColumnText from "./ColumnText";

export default function ProfileDetail({
  profileImg,
  sendPost,
  receivePost,
  dPlus,
  introduce,
  ...props
}) {
  return (
    <div style={{ ...props.style }}>
      <div className="detail">
        <div className="profileImgDiv">
          <img src={profileImg} alt="profileImg" className="profileImg" />
        </div>
        <ColumnText title="보낸 편지" content={sendPost} />
        <ColumnText title="받은 편지" content={receivePost} />
        <ColumnText title="습관 D+day" content={dPlus} />
      </div>
      <div className="introduce">
        <span>{introduce}</span>
      </div>
    </div>
  );
}
