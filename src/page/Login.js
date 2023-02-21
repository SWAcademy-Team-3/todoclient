import Loginform from "../components/LoginForm";
import "../style/form.scss";
import { useNavigate } from "react-router-dom";
import { axios_post } from "../api/api";

export default function Login() {
  const navigate = useNavigate();
  const onSubmit = async (values) => {
    //TODO 데이터 전송 지정하기
    let formData = new FormData();
    formData.append("memberId", `${values.id}`);
    formData.append("password", `${values.password}`);
    const response = await axios_post("login", formData, "form");
    // responseData에서 token을 받을 시 axios.defaults.headers.common["Authorization"] 지정
    // 
    console.log(response);
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
