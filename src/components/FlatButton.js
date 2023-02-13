export default function FlatButton({
  name,
  color,
  onClick,
  width,
  height,
  borderRadius,
  border,
  marginBottom,
}) {
  const flatButtonStyle = {
    width: width ? width : "none",
    height: height ? height : "none",
    marginBottom: marginBottom ? marginBottom : "none",
    backgroundColor: color ? color : "#e5a8a6",
    border: border ? border : `1px solid ${color}`,
    outline: "none",
    borderRadius: borderRadius ? borderRadius : "12px",
    boxShadow: "0.5px 0.5px 1px 1px gray",
    fontFamily: "GowunBatang",
    fontWeight: "bold",
  };
  return (
    <button style={{ ...flatButtonStyle }} onClick={onClick}>
      {name}
    </button>
  );
}
