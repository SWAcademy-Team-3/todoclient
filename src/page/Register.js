import SignUpForm from "../components/SignUpForm";
import "../style/form.scss";

export default function Register() {
  const onSubmit = () => {
    //TODO onSubmit 지정하기
  };
  return (
    <div className="FormContainer">
      <SignUpForm onSubmit={onSubmit} />
    </div>
  );
}
