function StatCard({ title, count, icon }) {
  return (
    <div className="stat-card">

      <div>
        <p>{title}</p>
        <h2>{count}</h2>
      </div>

      <div className="stat-icon">
        {icon}
      </div>

    </div>
  );
}

export default StatCard;