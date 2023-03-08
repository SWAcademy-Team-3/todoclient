import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelIcon from "@mui/icons-material/Cancel";

const Toast = ({ message, type }) => {
  return (
    <div
      className="ToastDiv fadeInDiv"
      style={{ backgroundColor: type ? "lightgreen" : "tomato" }}
    >
      {type ? (
        <CheckCircleOutlineIcon sx={{ color: "green" }} />
      ) : (
        <CancelIcon sx={{ color: "red" }} />
      )}
      <span>{message}</span>
    </div>
  );
};

export default Toast;
