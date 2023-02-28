import useForm from "../hooks/useForm";
import "../style/form.scss";

export default function SignUpForm({ onSubmit }) {
  const { values, errors, isLoading, handleChange, handleSubmit } = useForm({
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
      <input
        type="text"
        name="name"
        placeholder="name"
        onChange={handleChange}
        className="FormInput"
      />
      {errors.name && <span className="ErrorText">{errors.name}</span>}
      <input
        type="text"
        name="memberId"
        placeholder="ID"
        onChange={handleChange}
        className="FormInput"
      />
      {errors.memberId && <span className="ErrorText">{errors.memberId}</span>}
      <input
        type="password"
        name="password"
        placeholder="password"
        onChange={handleChange}
        className="FormInput"
      />
      {errors.password && <span className="ErrorText">{errors.password}</span>}
      <input
        type="password"
        name="passwordConfirm"
        placeholder="passwordConfirm"
        onChange={handleChange}
        className="FormInput"
      />
      {errors.passwordConfirm && (
        <span className="ErrorText">{errors.passwordConfirm}</span>
      )}
      <input
        type="text"
        name="bio"
        placeholder="한줄 소개"
        onChange={handleChange}
        className="FormInput"
      />
      <button className="submitButton" type="submit" disabled={isLoading}>
        SignUp
      </button>
    </form>
  );
}
