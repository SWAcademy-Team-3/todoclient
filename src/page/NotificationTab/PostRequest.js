// 더미 이미지
import YenaImg from "../../assets/images/yena.jpg";
import kimImg from "../../assets/images/kim.jpg";

const dummyData = [
  {
    sender: "yena",
    date: "2023-02-13",
    profileImg: YenaImg,
  },
  {
    sender: "_chaechae_1",
    date: "2023-02-12",
    profileImg: kimImg,
  },
];

export default function PostRequest({ activeTab }) {
  return (
    <div className="TabContent2">
      {dummyData.map((val, idx) => (
        <div key={idx}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <div
              className="profileImgDiv"
              style={{ flex: "none", marginRight: "8px" }}
            >
              <img
                src={val.profileImg}
                alt="profileImg"
                className="profileImg"
              />
            </div>
            <div>
              {val.sender} 님이 편지를 요청했어요! 편지를 쓰러 가볼까요?
              <br />
              <span style={{ fontSize: "12px", color: "#bbb" }}>
                {val.date}
              </span>
            </div>
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
}
