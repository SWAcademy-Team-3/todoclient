import "../../style/index.scss";

import ColumnText from "../../components/ColumnText";
import tempImg from "../../assets/images/yena.jpg";

export default function FriendsDetail() {
  return (
    <div>
      <div className="detail">
        <div className="profileImgDiv">
          <img src={tempImg} alt="profileImg" className="profileImg" />
        </div>
        <ColumnText title="보낸 편지" content="4" />
        <ColumnText title="받은 편지" content="7" />
        <ColumnText title="습관 D+day" content="D+34" />
      </div>
      <div className="introduce">
        <span>친구가 작성 한줄 소개글을 이곳에서 확인할 수 있습니다.</span>
      </div>
    </div>
  );
}
