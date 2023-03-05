import { axios_post } from "../api/api";
import SignUpForm from "../components/SignUpForm";
import "../style/form.scss";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import { useState } from "react";

export default function Register() {
  const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleModalClick = () => {
    if (message === "회원 가입에 성공하였습니다. 다시 로그인 해주세요") {
      setOpenModal(false);
      navigate("/login");
    } else {
      setOpenModal(false);
    }
  };

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
    if (response.message !== undefined || response.status === 500) {
      setMessage(response.message !== undefined ? response.message : "error");
      setOpenModal(true);
    } else {
      setMessage("회원 가입에 성공하였습니다. 다시 로그인 해주세요");
      setOpenModal(true);
    }
  };
  return (
    <div className="FormContainer">
      <SignUpForm onSubmit={onSubmit} />
      {openModal && (
        <Modal type="alert" handleModalClick={handleModalClick}>
          <div style={{ textAlign: "center" }}>{message}</div>
        </Modal>
      )}
    </div>
  );
}
