import AddIcon from "@mui/icons-material/Add";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";

export default function Tile({ profileImg, memId, name, type, handleClick }) {
  return (
    <div className="addTileDiv">
      <div className="profileImgDiv">
        <img src={profileImg} alt="profileImg" className="profileImg" />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginLeft: "12px",
        }}
      >
        <span style={{ fontWeight: "bold", fontSize: "18px" }}>{memId}</span>
        <span style={{ fontSize: "12px", marginTop: "4px" }}>{name}</span>
      </div>
      {type === "add" ? (
        <AddIcon sx={{ marginLeft: "auto" }} onClick={handleClick} />
      ) : (
        <CheckBoxOutlinedIcon
          sx={{ marginLeft: "auto" }}
          onClick={handleClick}
        />
      )}
    </div>
  );
}
