import useForm from "../hooks/useForm";
import "../style/login.scss";

const SignUpFrom = ({ onSubmit }) => {
  const { errors, isLoading, handleChange, handleSubmit } = useForm({
    initialState: {
      name: "",
      password: "",
      passwordConfirm: "",
    },
    onSubmit,
    validate: ({ name, password, passwordConfirm }) => {
      const newErrors = {};
      if (!name) newErrors.name = "이름을 입력해주세요";
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
      />
      {errors.name && <span className="ErrorText">{errors.name}</span>}
      <input
        type="password"
        name="password"
        placeholder="password"
        onChange={handleChange}
      />
      {errors.password && <span className="ErrorText">{errors.password}</span>}
      <input
        type="password"
        name="passwordConfirm"
        placeholder="passwordConfirm"
        onChange={handleChange}
      />
      {errors.passwordConfirm && (
        <span className="ErrorText">{errors.passwordConfirm}</span>
      )}
      <button className="submitButton" type="submit" disabled={isLoading}>
        SignUp
      </button>
    </form>
  );
};
