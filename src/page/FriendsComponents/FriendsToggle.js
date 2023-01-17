import "../../style/index.scss";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useState } from "react";

export default function FriendsToggle({ user }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="FriendsToggleHead" onClick={() => setIsOpen(!isOpen)}>
        <ArrowForwardIosIcon sx={{ fontSize: "small" }} />
        <span>친구이름</span>
        <button className="DeleteButton">X</button>
      </div>

      <div className={`FriendsToggleBody-${isOpen}`}>
        <span>데이터가 들어갈꺼야 응애</span>
      </div>
    </>
  );
}
