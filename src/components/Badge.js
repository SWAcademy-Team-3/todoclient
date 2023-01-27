const Badge = ({ children, count, maxCount, onClick }) => {
  let badge = null;

  if (count < maxCount) {
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
