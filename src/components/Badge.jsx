const colors = { Low: 'info', Med: 'warning', High: 'danger' };
const Badge = ({ label }) => (
  <span className={`badge bg-${colors[label] || 'secondary'}`}>{label}</span>
);
export default Badge;
