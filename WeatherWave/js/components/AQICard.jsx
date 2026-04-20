// ============================================
//  AQICard.jsx
//  Air Quality Index card with color-coded bar
// ============================================
function AQICard({ hero }) {
  const aqi     = aqiFromHumidity(hero.humidity, hero.code);
  const aqiInfo = aqiLabel(aqi);
  const safeMsg = aqi <= 50  ? 'Safe for all activities'
                : aqi <= 100 ? 'Acceptable for most people'
                :              'Sensitive groups should limit outdoor exposure';

  return (
    <div className="card aqi-card fu fu4">
      <div className="sec-title">Air Quality Index</div>
      <div className="aqi-top">
        <div className="aqi-status" style={{ color: aqiInfo.color }}>
          Overall: {aqiInfo.label} — {safeMsg}
        </div>
        <div className="aqi-badge">AQI {aqi}</div>
      </div>
      <div className="aqi-bar">
        <div className="aqi-dot" style={{ left: `${aqiInfo.pct}%` }}/>
      </div>
      <div className="aqi-scale">
        <span>Good</span>
        <span>Moderate</span>
        <span>Unhealthy</span>
        <span>Hazardous</span>
      </div>
    </div>
  );
}
