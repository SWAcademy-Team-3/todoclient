export default function Chip({ number, emoji }) {
  //TODO number가 4자리수 이상이면 잘라야함
  return (
    <div className="ChipDiv">
      <img src={emoji} />
      <span>{number}</span>
    </div>
  );
}
