export default function RadioGroup({ label, children }) {
  return (
    <fieldset className="customfieldset">
      <legend style={{ marginBottom: "8px" }}>{label}</legend>
      {children}
    </fieldset>
  );
}
