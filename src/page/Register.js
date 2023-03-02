import { axios_post } from "../api/api";
import SignUpForm from "../components/SignUpForm";
import { setCookie } from "../service/Cookie";
import { useUser } from "../contexts/userProvider";
import "../style/form.scss";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const { changeUserData } = useUser();
  const onSubmit = async (values) => {
    //TODO onSubmit 지정하기
    const data = {
      name: values.name,
      memberId: values.memberId,
      password: values.password,
      passwordConfirm: values.passwordConfirm,
      bio: values.bio,
    };
    const response = await axios_post("register", JSON.stringify(data), "json");
    if (response === undefined) {
      alert(response.errorText);
    } else {
      console.log(response);
      localStorage.setItem(
        "userData",
        JSON.stringify({
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
    }
    changeUserData({
      memberId: response.memberId,
      newLetterCount: response.newLetterCount,
      coinCount: response.coinCount,
    });
    navigate("/");
  };
  return (
    <div className="FormContainer">
      <SignUpForm onSubmit={onSubmit} />
    </div>
  );
}
