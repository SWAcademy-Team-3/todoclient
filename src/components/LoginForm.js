import useForm from "../hooks/useForm";
import "../style/form.scss";
import { axios_post } from "../api/api";

export default function Loginform({ onSubmit }) {
  const { errors, isLoading, handleChange, handleSubmit } = useForm({
    initialState: {
      id: "",
      password: "",
    },
    onSubmit,
    validate: ({ id, password }) => {
      const newErrors = {};
      if (!id) newErrors.id = "아이디를 입력해주세요";
      if (!password) newErrors.password = "비밀번호를 입력해주세요";
      return newErrors;
    },
  });

  return (
    <form className="Cardform" onSubmit={handleSubmit}>
      <h1 className="title">Login</h1>
      <input
        type="text"
        name="id"
        placeholder="id"
        onChange={handleChange}
        className="FormInput"
      />
      {errors.id && <span className="ErrorText">{errors.id}</span>}
      <input
        type="password"
        name="password"
        placeholder="password"
        onChange={handleChange}
        className="FormInput"
      />
      {errors.password && <span className="ErrorText">{errors.password}</span>}
      <button className="submitButton" type="submit" disabled={isLoading}>
        Login
      </button>
    </form>
  );
}
