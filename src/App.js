import { React } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./page/Home";
import Login from "./page/Login";
import PageNotFound from "./page/PageNotFound";
import Navigation from "./Navigation";

import "./style/index.scss";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="contents">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="*" element={<PageNotFound />}></Route>
          </Routes>
        </div>
        <Navigation />
      </BrowserRouter>
    </div>
  );
}

export default App;
