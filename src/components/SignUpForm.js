import useForm from "../hooks/useForm";
import "../style/form.scss";

export default function SignUpForm({ onSubmit }) {
  const { errors, isLoading, handleChange, handleSubmit } = useForm({
    initialState: {
      name: "",
      memberId: "",
      password: "",
      passwordConfirm: "",
      bio: "",
    },
    onSubmit,
    validate: ({ name, memberId, password, passwordConfirm }) => {
      const newErrors = {};
      if (!name) newErrors.name = "이름을 입력해주세요";
      if (!memberId) newErrors.memberId = "ID를 입력해 주세요";
      if (!password) newErrors.password = "비밀번호를 입력해주세요";
      if (password !== passwordConfirm)
        newErrors.passwordConfirm = "비밀번호가 일치하지 않습니다.";
      return newErrors;
    },
  });
  return (
    <form className="Cardform" onSubmit={handleSubmit}>
      <h1 className="title">SignUp</h1>
      <div className="FormDiv">
        <span>이름</span>
        <input
          type="text"
          name="name"
          placeholder="name"
          onChange={handleChange}
          className="FormInput"
        />
      </div>
      {errors.name && <span className="ErrorText">{errors.name}</span>}
      <div className="FormDiv">
        <span>ID</span>
        <input
          type="text"
          name="memberId"
          placeholder="ID는 8글자~12글자"
          onChange={handleChange}
          className="FormInput"
        />
      </div>
      {errors.memberId && <span className="ErrorText">{errors.memberId}</span>}
      <div className="FormDiv">
        <span>비밀번호</span>
        <input
          type="password"
          name="password"
          placeholder="영어 대소문자,특수문자 포함 8글자 이상"
          onChange={handleChange}
          className="FormInput"
        />
      </div>
      {errors.password && <span className="ErrorText">{errors.password}</span>}
      <div className="FormDiv">
        <span>비밀번호확인</span>
        <input
          type="password"
          name="passwordConfirm"
          placeholder="passwordConfirm"
          onChange={handleChange}
          className="FormInput"
        />
      </div>
      {errors.passwordConfirm && (
        <span className="ErrorText">{errors.passwordConfirm}</span>
      )}
      <div className="FormDiv">
        <span>한줄 자기소개</span>
        <input
          type="text"
          name="bio"
          placeholder="한줄 소개"
          onChange={handleChange}
          className="FormInput"
        />
      </div>
      <button className="submitButton" type="submit" disabled={isLoading}>
        SignUp
      </button>
    </form>
  );
}
