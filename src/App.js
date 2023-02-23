import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Home from "./page/Home";
import Post from "./page/Post";
import My from "./page/My";
import Friends from "./page/Friends";
import Notification from "./page/Notification";
import AddFriends from "./page/AddFriends";
import Receive from "./page/Receive";
import Login from "./page/Login";
import Register from "./page/Register";
import PageNotFound from "./page/PageNotFound";
import Write from "./page/Write";
import Navigation from "./Navigation";

import "./style/index.scss";
import FindFriends from "./page/FindFriends";

function App() {
  let location = useLocation();
  // Resize (모바일키보드 올라올 시 네비게이션 안보이기)

  return (
    <div className="App">
      <div className="contents">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/post" element={<Post />}></Route>
          <Route path="/find" element={<FindFriends />}></Route>
          <Route path="/write" element={<Write />}></Route>
          <Route path="/my" element={<My />}></Route>
          <Route path="/receive" element={<Receive />}></Route>
          <Route path="/friends" element={<Friends />}></Route>
          <Route path="/notification" element={<Notification />}></Route>
          <Route path="/addFriends" element={<AddFriends />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
      </div>
      {location.pathname === "/login" ||
      location.pathname === "/register" ? null : (
        <Navigation />
      )}
    </div>
  );
}

export default App;
