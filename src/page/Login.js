import Loginform from "../components/LoginForm";
import Alert from "../components/Alert";
import "../style/form.scss";
import { useNavigate } from "react-router-dom";
import { axios_post } from "../api/api";
import { setCookie } from "../service/Cookie";
import { useUser } from "../contexts/userProvider";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const { changeUserData } = useUser();
  const [showAlert, setShowAlert] = useState(false);
  const onSubmit = async (values) => {
    //TODO 데이터 전송 지정하기
    const data = {
      memberId: values.id,
      password: values.password,
    };
    const response = await axios_post("login", JSON.stringify(data), "json");
    if (response === undefined || response === "") {
      setShowAlert(true);
    } else {
      // TODO username도 넣어두기
      localStorage.setItem(
        "userData",
        JSON.stringify({
          memberName: response.memberName,
          memberId: response.memberId,
          newLetterCount: response.newLetterCount,
          coinCount: response.coinCount,
        })
      );
      setCookie(
        "access_token",
        response.access_token,
        {
          path: "/",
          secure: true,
        },
        1
      );
      changeUserData({
        memberName: response.memberName,
        memberId: response.memberId,
        newLetterCount: response.newLetterCount,
        coinCount: response.coinCount,
      });
      navigate("/");
    }
  };
  return (
    <div className="FormContainer">
      <Loginform onSubmit={onSubmit} />
      <div className="LoginNav">
        <span className="LinkText" onClick={() => navigate("/findPw")}>
          비밀번호 찾기
        </span>
        <span className="LinkText" onClick={() => navigate("/register")}>
          회원가입
        </span>
      </div>
      {showAlert && (
        <Alert onClick={() => setShowAlert(false)}>
          <span>로그인 실패, 잘못된 사용자 정보입니다.</span>
        </Alert>
      )}
    </div>
  );
}
