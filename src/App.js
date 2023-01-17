import { React } from "react";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";

import Home from "./page/Home";
import Receive from "./page/Receive";
import My from "./page/My";
import Friends from "./page/Friends";
import Login from "./page/Login";
import Register from "./page/Register";
import PageNotFound from "./page/PageNotFound";
import Navigation from "./Navigation";

import "./style/index.scss";

function App() {
  //Route 바깥에서 경로를 가져오는 방법이 없나
  const pathname = window.location.pathname;
  return (
    <div className="App">
      <BrowserRouter>
        <div className="contents">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/receive" element={<Receive />}></Route>
            <Route path="/my" element={<My />}></Route>
            <Route path="/friends" element={<Friends />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="*" element={<PageNotFound />}></Route>
          </Routes>
        </div>
        {pathname === "/login" || pathname === "/register" ? null : (
          <Navigation />
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
