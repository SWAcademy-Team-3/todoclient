import { useRef, useState } from "react";
import { useNavigate } from "react-router";

// 임시이미지
import myImg from "../assets/images/chuu.jpg";
import friendImg from "../assets/images/kim.jpg";
import FlatButton from "../components/FlatButton";

export default function Write({ initialState }) {
  let navigate = useNavigate();
  const titleRef = useRef();
  const contentRef = useRef();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedFriend, setSelectedFriend] = useState(initialState);

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleContent = (e) => {
    setContent(e.target.value);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "inherit",
        gap: "16px",
        margin: "16px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <span>보낸이 : </span>
          <div
            className="profileImgDiv"
            style={{ width: "40px", height: "40px" }}
          >
            <img src={myImg} alt="profileImg" className="profileImg" />
          </div>
          <span>chuu</span>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <span>받는이 : </span>
          <div
            className="profileImgDiv"
            style={{ width: "40px", height: "40px" }}
          >
            <img src={friendImg} alt="profileImg" className="profileImg" />
          </div>
          <span>_chaechae_1</span>
        </div>
      </div>
      <div
        style={{
          border: "1px solid black",
          borderRadius: "5px",
          height: "38px",
        }}
      >
        <input
          className="blankInput"
          type="text"
          placeholder="편지제목을 입력하세요"
          style={{ fontSize: "22px", fontWeight: 700 }}
          ref={titleRef}
          onChange={(e) => handleTitle(e)}
        />
      </div>
      <div
        style={{
          flexGrow: 1,
          border: "1px solid black",
          borderRadius: "5px",
        }}
      >
        <textarea
          className="blankInput"
          type="text"
          placeholder="내용을 입력하세요"
          ref={contentRef}
          onChange={(e) => handleContent(e)}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <FlatButton name="편지쓰기" width="120px" height="50px" />
        <FlatButton
          name="편지취소"
          width="120px"
          height="50px"
          onClick={() => navigate(-1)}
        />
      </div>
    </div>
  );
}
