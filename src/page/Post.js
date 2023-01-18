import { useState } from "react";
import PostClose from "./PostComponents/PostClose";
import PostOpen from "./PostComponents/PostOpen";

export default function Post() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="PostHeader">
        <span>이전 편지 읽으러 가기</span>
        <button onClick={() => setOpen(!open)}>임시버튼</button>
      </div>
      <div className="PostDiv">{open ? <PostOpen /> : <PostClose />}</div>
    </>
  );
}
