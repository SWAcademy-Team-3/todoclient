import FlatButton from "./FlatButton";
import ReportIcon from "@mui/icons-material/Report";
import InfoIcon from "@mui/icons-material/Info";
import useClickAway from "../hooks/useClickAway";

const Alert = ({ type, children, onClick, ...props }) => {
  const Icon =
    type === "info" ? (
      <InfoIcon sx={{ color: "green" }} />
    ) : (
      <ReportIcon sx={{ color: "red" }} />
    );
  const popRef = useClickAway((e) => {
    if (
      !(
        e.target.tagName === "BUTTON" ||
        e.target.tagName === "svg" ||
        e.target.tagName === "path"
      )
    ) {
      onClick();
    }
  });
  return (
    <div className="modalBackground">
      <div className="Alert" ref={popRef} {...props}>
        <div style={{ display: "flex" }}>
          {Icon}
          {children}
        </div>
        <FlatButton
          name="확인"
          style={{ marginTop: "8px" }}
          onClick={onClick}
        />
      </div>
    </div>
  );
};

export default Alert;
