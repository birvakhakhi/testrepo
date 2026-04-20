// ============================================
//  RainChart.jsx
//  Bar chart showing hourly rain probability
// ============================================
function RainChart({ hourly }) {
  return (
    <div className="section fu fu2">
      <div className="card">
        <div className="sec-title">Rain Probability — Today</div>
        <div className="rain-chart">
          {hourly.map((h, i) => (
            <div key={i} className="rain-bar-wrap">
              <div className="rain-bar-outer">
                <div
                  className="rain-bar-inner"
                  style={{ height: `${Math.max(h.rain, 2)}%` }}
                />
              </div>
              <span className="rain-bar-label">{h.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
