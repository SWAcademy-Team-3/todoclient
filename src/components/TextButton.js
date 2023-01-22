export default function TextButton({ text, onClick, ...props }) {
  return (
    <div className="TextButton" onClick={onClick}>
      {text}
    </div>
  );
}
