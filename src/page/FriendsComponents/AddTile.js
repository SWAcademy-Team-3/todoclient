import AddIcon from "@mui/icons-material/Add";

export default function AddTile({ profileImg, memId, name }) {
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
      <AddIcon sx={{ marginLeft: "auto" }} />
    </div>
  );
}
