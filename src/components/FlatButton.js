export default function FlatButton({ name, color, onClick }) {
  return (
    <button
      style={{
        backgroundColor: color,
        border: `1px solid ${color}`,
        outline: "none",
        borderRadius: "15px",
        boxShadow: "0.5px 0.5px 1px 1px gray",
      }}
      onClick={onClick}
    >
      {name}
    </button>
  );
}
