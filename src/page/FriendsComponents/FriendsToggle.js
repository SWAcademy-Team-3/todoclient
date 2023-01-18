import "../../style/index.scss";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useState } from "react";
import FriendsDetail from "./FriendsDetail";
import FlatButton from "../../components/FlatButton";

export default function FriendsToggle({ user }) {
  const [isOpen, setIsOpen] = useState(false);

  const handlePostRequest = () => {
    console.log("편지 요청");
  };
  return (
    <>
      <div className="FriendsToggleHead" onClick={() => setIsOpen(!isOpen)}>
        <ArrowForwardIosIcon
          sx={{
            fontSize: "small",
            transform: isOpen ? "rotate(90deg)" : undefined,
            transition: "transform 0.5s ease-out",
          }}
        />
        <div>
          <span style={{ marginRight: "4px" }}>최예나</span>
          <FlatButton
            name="편지 요청"
            color="#BECAD6"
            onClick={handlePostRequest}
          />
        </div>
        <button className="DeleteButton">X</button>
      </div>

      <div className={`FriendsToggleBody-${isOpen}`}>
        <FriendsDetail />
      </div>
    </>
  );
}
