import FlatButton from "./FlatButton";

export default function Modal({ type, message, handleModalClick }) {
  return (
    <div className="modalBackground">
      <div className="modal">
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
