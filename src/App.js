import { React } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import Login from "./page/Login";
import PageNotFound from "./page/PageNotFound";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
        <div>
          <p>네비게이션 넣을꺼야 여기존재해도 되는거니?</p>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
