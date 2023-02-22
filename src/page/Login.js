import Loginform from "../components/LoginForm";
import "../style/form.scss";
import { useNavigate } from "react-router-dom";
import { axios_post } from "../api/api";
import { setCookie } from "../service/Cookie";
import { useUser } from "../contexts/userProvider";

export default function Login() {
  const navigate = useNavigate();
  const { changeUserData } = useUser();
  const onSubmit = async (values) => {
    //TODO 데이터 전송 지정하기
    const data = {
      memberId: values.id,
      password: values.password,
    };
    const response = await axios_post("login", JSON.stringify(data), "json");
    console.log(response);
    setCookie("a_token", response.access_token);
    setCookie("r_token", response.refresh_token);
    changeUserData({
      memberId: response.memberId,
      newLetterCount: response.newLetterCount,
      coinCount: response.coinCount,
    });
    navigate("/");
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
