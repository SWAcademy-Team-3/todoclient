// 더미 이미지
import YenaImg from "../../assets/images/yena.jpg";
import kimImg from "../../assets/images/kim.jpg";

import { useEffect } from "react";
import axios from "axios";
import { useUser } from "../../contexts/userProvider";

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
  const { user } = useUser();

  const getPostRequestData = async () => {
    try {
      const response = await axios.get(
        `http://49.50.163.197:8080/api/member/friend/post-requests/${user.memberId}/receive`,
        {
          memberId: user.memberId,
        }
      );
      // TODO 데이터 화면에 뿌리기
      console.log(response.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getPostRequestData();
  }, []);

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
