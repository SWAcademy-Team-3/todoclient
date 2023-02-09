export default function Header({ left, middle, right, isHr = false }) {
  return (
    <div
      className="header"
      style={{ borderBottom: isHr ? "1px solid #888" : "undefined" }}
    >
      <div className="header-child-left">{left}</div>
      <div className="header-child-middle">{middle}</div>
      <div className="header-child-right">{right}</div>
    </div>
  );
}
