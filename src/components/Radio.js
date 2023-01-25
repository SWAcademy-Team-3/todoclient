export default function Radio({ children, value, name, checked, onChange }) {
  return (
    <label className={`customRadio ${checked && "radioCheck"}`}>
      <input
        type="radio"
        className="none_input"
        value={value}
        name={name}
        checked={checked}
        onChange={(e) => onChange(e.target.value)}
      />
      {children}
    </label>
  );
}
