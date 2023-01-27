export default function RequestTile({ name, acceptClick, deleteClick, isHr }) {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "0 12px",
        }}
      >
        <span>{name}</span>
        <div>
          <button className="CheckButton" onClick={acceptClick}>
            V
          </button>
          <button className="DeleteButton" onClick={deleteClick}>
            X
          </button>
        </div>
      </div>
      {isHr ? <hr style={{ margin: "12px", color: "#eee" }} /> : null}
    </>
  );
}
