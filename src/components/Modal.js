import FlatButton from "./FlatButton";
import useClickAway from "../hooks/useClickAway";

export default function Modal({
  type,
  children,
  handleModalClick,
  buttonType,
  banClickAway = false,
  ...props
}) {
  const popRef = useClickAway((e) => {
    if (
      !(
        e.target.tagName === "BUTTON" ||
        e.target.tagName === "svg" ||
        e.target.tagName === "path"
      )
    ) {
      !banClickAway && handleModalClick("no");
    }
  });
  return (
    <div className="modalBackground">
      <div className="modal" ref={popRef} {...props}>
        {children}
        {buttonType === "text" ? (
          <></>
        ) : (
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
        )}
      </div>
    </div>
  );
}
