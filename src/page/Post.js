import { useState } from "react";
import PostClose from "./PostComponents/PostClose";
import PostOpen from "./PostComponents/PostOpen";
import Chip from "../components/Chip";

import coinEmoji from "../assets/images/coinEmoji.png";
import postEmoji from "../assets/images/postEmoji.png";

export default function Post() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="PostHeader">
        <span className="linkText">이전 편지 읽으러 가기</span>
        <div style={{ display: "flex" }}>
          <Chip number={10} emoji={postEmoji} />
          <Chip number={100} emoji={coinEmoji} />
        </div>
      </div>
      <div className="PostDiv" onClick={() => setOpen(!open)}>
        {open ? <PostOpen /> : <PostClose />}
      </div>
    </>
  );
}
