import Loginform from "../components/LoginForm";
import "../style/form.scss";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const onSubmit = () => {
    //TODO 데이터 전송 지정하기
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
    </div>
  );
}
