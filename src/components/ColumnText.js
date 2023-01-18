import "../style/index.scss";

export default function ColumnText({ title, content }) {
  return (
    <div className="ColumnText">
      <span className="textTitle">{title}</span>
      <span className="textContent">{content}</span>
    </div>
  );
}
