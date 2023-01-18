import Header from "../components/Header";
import AddIcon from "@mui/icons-material/Add";
import NotificationsIcon from "@mui/icons-material/Notifications";

import { useState, useEffect } from "react";
import FriendsToggle from "./FriendsComponents/FriendsToggle";

export default function Friends() {
  const [friendsList, setFriendsList] = useState([]);

  useEffect(() => {
    //TODO 친구목록 불러오기
  }, []);

  const HeaderLeft = <span>나의 친구</span>;
  const HeaderRight = (
    <>
      <NotificationsIcon /> <AddIcon />
    </>
  );
  return (
    <>
      <Header left={HeaderLeft} right={HeaderRight} isHr={true} />
      <div id="friendsContents">
        <FriendsToggle />
        <FriendsToggle />
        <FriendsToggle />
        <FriendsToggle />
        <FriendsToggle />
      </div>
    </>
  );
}
