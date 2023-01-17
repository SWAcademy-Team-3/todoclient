import useForm from "../hooks/useForm";
import "../style/login.scss";

export default function Loginform({ onSubmit }) {
  const { errors, isLoading, handleChange, handleSubmit } = useForm({
    initialState: {
      name: "",
      password: "",
    },
    onSubmit,
    validate: ({ name, password }) => {
      const newErrors = {};
      if (!name) newErrors.name = "이름을 입력해주세요";
      if (!password) newErrors.password = "비밀번호를 입력해주세요";
      return newErrors;
    },
  });

  return (
    <>
      <form className="Cardform" onSubmit={handleSubmit}>
        <h1 className="title">Login</h1>
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
        {errors.password && (
          <span className="ErrorText">{errors.password}</span>
        )}
        <button className="submitButton" type="submit" disabled={isLoading}>
          Login
        </button>
      </form>
    </>
  );
}
