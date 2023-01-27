import FlatButton from "./FlatButton";
import useClickAway from "../hooks/useClickAway";

export default function Modal({ type, message, handleModalClick }) {
  const popRef = useClickAway((e) => {
    if (e.target.tagName !== "BUTTON") {
      handleModalClick("no");
    }
  });
  return (
    <div className="modalBackground">
      <div className="modal" ref={popRef}>
        <span className="modalMessage">{message}</span>
        <div className="modalButton">
          {type === "alert" ? (
            <FlatButton
              borderRadius="0px"
              border="none"
              value="yes"
              onClick={() => handleModalClick("check")}
              name="확인"
            />
          ) : (
            <>
              <FlatButton
                borderRadius="0px"
                border="none"
                value="yes"
                onClick={() => handleModalClick("yes")}
                name="예"
              />
              <FlatButton
                borderRadius="0px"
                border="none"
                value="yes"
                onClick={() => handleModalClick("no")}
                name="아니오"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
