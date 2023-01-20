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
              onClick={handleModalClick}
              name="확인"
            />
          ) : (
            <>
              <FlatButton
                borderRadius="0px"
                border="none"
                value="yes"
                onClick={handleModalClick}
                name="예"
              />
              <FlatButton
                borderRadius="0px"
                border="none"
                value="yes"
                onClick={handleModalClick}
                name="아니오"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
