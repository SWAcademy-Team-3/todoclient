export default function FlatButton({
  name,
  color,
  onClick,
  borderRadius,
  border,
  ...props
}) {
  const flatButtonStyle = {
    backgroundColor: color ? color : "#e5a8a6",
    border: border ? border : `1px solid ${color}`,
    outline: "none",
    boxShadow: "0.5px 0.5px 1px 1px gray",
    fontFamily: "GowunBatang",
    fontWeight: "bold",
  };
  return (
    <button style={{ ...props.style, ...flatButtonStyle }} onClick={onClick}>
      {name}
    </button>
  );
}
