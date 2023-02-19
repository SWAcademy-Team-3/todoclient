export default function DatePicker({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}) {
  return (
    <div>
      <span>습관 기간 설정</span>
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />
    </div>
  );
}
