const Badge = ({ children, hasAlram, onClick }) => {
  let badge = null;

  if (hasAlram) {
    badge = <sup className="supDot noti"></sup>;
  }
  return (
    <div className="BadgeContainer" onClick={onClick}>
      {children}
      {badge}
    </div>
  );
};

export default Badge;
