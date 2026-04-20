// ============================================
//  HourlyForecast.jsx
//  Horizontally scrollable hourly weather cards
// ============================================
function HourlyForecast({ hourly, activeH, setActiveH, unit }) {
  return (
    <div className="section fu fu1">
      <div className="sec-title">Hourly Forecast</div>
      <div className="hourly-scroll">
        {hourly.map((h, i) => (
          <div
            key={i}
            className={`hour-card${activeH === i ? ' active' : ''}`}
            onClick={() => setActiveH(i)}
          >
            <span className="h-time">{h.label}</span>
            <span className="h-icon">{h.icon}</span>
            <span className="h-temp">{dispTempNum(h.temp, unit)}°</span>
            {h.rain > 0 && <span className="h-rain">💧{h.rain}%</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
