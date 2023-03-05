export default function TextButton({ text, onClick, ...props }) {
  return (
    <button className="TextButton" onClick={onClick} {...props}>
      {text}
    </button>
  );
}
