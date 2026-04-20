// ============================================
//  DailyForecast.jsx
//  3-day forecast rows with temperature range bars
// ============================================
function DailyForecast({ daily, unit }) {
  const minT = Math.min(...daily.map(d => d.lo));
  const maxT = Math.max(...daily.map(d => d.hi));
  const totalRange = maxT - minT || 1;

  return (
    <div className="card">
      <div className="sec-title">3-Day Forecast</div>
      {daily.map((d, i) => {
        const barLeft = ((d.lo - minT) / totalRange) * 100;
        const barW    = ((d.hi - d.lo) / totalRange) * 100;
        return (
          <div className="day-row" key={i}>
            <span className="day-name">{d.name}</span>
            <span className="day-icon-col">{d.icon}</span>
            <span className="day-cond">{d.desc}</span>
            <div className="day-temp-bar">
              <span className="day-low">{dispTempNum(d.lo, unit)}°</span>
              <div className="temp-range">
                <div className="temp-range-fill" style={{ left: `${barLeft}%`, width: `${barW}%` }}/>
              </div>
              <span className="day-high">{dispTempNum(d.hi, unit)}°</span>
            </div>
            <span className="day-rain-pct">💧{d.rainPct}%</span>
          </div>
        );
      })}
    </div>
  );
}
