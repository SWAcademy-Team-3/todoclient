import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../../contexts/userProvider";

export default function PostRequest({ activeTab }) {
  const [data, setData] = useState([]);
  const { user } = useUser();

  const getPostRequestData = async () => {
    try {
      const response = await axios.get(
        `http://49.50.163.197:8080/api/member/friend/post-requests/${user.memberId}/receive`,
        {
          memberId: user.memberId,
        }
      );
      setData(response.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getPostRequestData();
  }, []);

  return (
    <div className="TabContent2">
      {data.length === 0 ? (
        <span>편지 요청 목록이 없어요</span>
      ) : (
        data.map((req) => (
          <div key={req.sendDateTime.join("")}>
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
                  src={`data:image/;base64,${req.memberImage}`}
                  alt="profileImg"
                  className="profileImg"
                />
              </div>
              <div>
                {req.friendName}님이 편지를 요청했어요! 편지를 쓰러 가볼까요?
                <br />
                <span style={{ fontSize: "12px", color: "#bbb" }}>
                  {`${req.sendDateTime[0]}-${req.sendDateTime[1]}-${req.sendDateTime[2]}`}
                </span>
              </div>
            </div>
            <hr />
          </div>
        ))
      )}
    </div>
  );
}
