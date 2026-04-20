// ============================================
//  AirDetails.jsx
//  Air quality metrics with animated progress bars
// ============================================
function AirDetails({ hero }) {
  const metrics = [
    { label: "Humidity",    value: hero.humidity,   unit: "%",    pct: hero.humidity },
    { label: "Wind Speed",  value: hero.wind,        unit: "km/h", pct: Math.min(hero.wind / 80 * 100, 100) },
    { label: "Visibility",  value: hero.visibility,  unit: "km",   pct: Math.min(hero.visibility / 10 * 100, 100) },
    { label: "Pressure",    value: hero.pressure,    unit: "hPa",  pct: Math.min((hero.pressure - 950) / 100 * 100, 100) },
    { label: "Cloud Cover", value: hero.cloudCover,  unit: "%",    pct: hero.cloudCover },
    { label: "UV Index",    value: hero.uvi,         unit: "/11",  pct: hero.uvi / 11 * 100 },
  ];

  return (
    <div className="card">
      <div className="sec-title">Air Details</div>
      <div className="air-grid">
        {metrics.map((m, i) => (
          <div key={i}>
            <div className="air-lbl">{m.label}</div>
            <div className="air-val">{m.value}<small> {m.unit}</small></div>
            <div className="air-bar">
              <div className="air-fill" style={{ width: `${m.pct}%` }}/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
