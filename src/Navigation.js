import { React, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./style/index.scss";

import NavigatorBox from "./components/NavigatorBox";

function Navigation() {
  const [selectNav, setSelectNav] = useState("");
  let locationPath = useLocation().pathname;

  useEffect(() => {
    if (locationPath === "/") {
      setSelectNav("Home");
    } else if (locationPath === "/post") {
      setSelectNav("Post");
    } else if (locationPath === "/my") {
      setSelectNav("My");
    } else if (locationPath === "/friends") {
      setSelectNav("Friends");
    }
  }, [locationPath]);

  let navigate = useNavigate();
  const onNavigation = (navName) => {
    if (navName === "Home") {
      navigate("/");
    } else if (navName === "Post") {
      navigate("/post");
    } else if (navName === "My") {
      navigate("/my");
    } else {
      navigate("/friends");
    }
  };
  return (
    <div className="Navigation">
      <NavigatorBox
        navName="Home"
        onNavigation={onNavigation}
        selectNav={selectNav}
      />
      <NavigatorBox
        navName="Post"
        onNavigation={onNavigation}
        selectNav={selectNav}
      />
      <NavigatorBox
        navName="My"
        onNavigation={onNavigation}
        selectNav={selectNav}
      />
      <NavigatorBox
        navName="Friends"
        onNavigation={onNavigation}
        selectNav={selectNav}
      />
    </div>
  );
}

export default Navigation;
