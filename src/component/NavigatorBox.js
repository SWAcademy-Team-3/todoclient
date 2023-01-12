import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import MailIcon from "@mui/icons-material/Mail";
import PersonIcon from "@mui/icons-material/Person";
import PeopleIcon from "@mui/icons-material/People";
import "../style/index.scss";

export default function NavigatorBox({ navName, onNavigation, selectNav }) {
  const iconRender = (navName, selectNav) => {
    if (navName === "Home") {
      if (selectNav === navName) {
        return (
          <>
            <HomeIcon sx={{ fontSize: 40, color: "#bb254a" }} />
            <span style={{ color: "#bb254a" }}>{navName}</span>
          </>
        );
      } else {
        return (
          <>
            <HomeIcon sx={{ fontSize: 40 }} />
            <span>{navName}</span>
          </>
        );
      }
    } else if (navName === "Receive") {
      if (selectNav === navName) {
        return (
          <>
            <MailIcon sx={{ fontSize: 40, color: "#bb254a" }} />
            <span style={{ color: "#bb254a" }}>{navName}</span>
          </>
        );
      } else {
        return (
          <>
            <MailIcon sx={{ fontSize: 40 }} />
            <span>{navName}</span>
          </>
        );
      }
    } else if (navName === "My") {
      if (selectNav === navName) {
        return (
          <>
            <PersonIcon sx={{ fontSize: 40, color: "#bb254a" }} />
            <span style={{ color: "#bb254a" }}>{navName}</span>
          </>
        );
      } else {
        return (
          <>
            <PersonIcon sx={{ fontSize: 40 }} />
            <span>{navName}</span>
          </>
        );
      }
    } else if (navName === "Friends") {
      if (selectNav === navName) {
        return (
          <>
            <PeopleIcon sx={{ fontSize: 40, color: "#bb254a" }} />
            <span style={{ color: "#bb254a" }}>{navName}</span>
          </>
        );
      } else {
        return (
          <>
            <PeopleIcon sx={{ fontSize: 40 }} />
            <span>{navName}</span>
          </>
        );
      }
    }
  };
  return (
    <div className="NavigatorBox" onClick={() => onNavigation(navName)}>
      {iconRender(navName, selectNav)}
    </div>
  );
}
