export default function FlatButton({
  name,
  color,
  onClick,
  width,
  hegiht,
  borderRadius,
  border,
  marginBottom,
}) {
  return (
    <button
      style={{
        width: width ? width : "none",
        height: hegiht ? hegiht : "none",
        marginBottom: marginBottom ? marginBottom : "none",
        backgroundColor: color,
        border: border ? border : `1px solid ${color}`,
        outline: "none",
        borderRadius: borderRadius ? borderRadius : "12px",
        boxShadow: "0.5px 0.5px 1px 1px gray",
      }}
      onClick={onClick}
    >
      {name}
    </button>
  );
}
