// ============================================
//  WindCompass.jsx
//  Animated compass needle showing wind direction
// ============================================
function WindCompass({ hero }) {
  return (
    <div className="card">
      <div className="sec-title">Wind Details</div>
      <div className="compass-wrap">
        <div className="compass">
          <div className="compass-ring"/>
          <span className="compass-dir n">N</span>
          <span className="compass-dir s">S</span>
          <span className="compass-dir e">E</span>
          <span className="compass-dir w">W</span>
          <div
            className="compass-needle"
            style={{ transform: `rotate(${hero.windDir}deg)` }}
          />
          <div className="compass-center"/>
        </div>
        <div className="wind-stats">
          <div className="wind-stat">
            <div className="wind-stat-val">{hero.wind}</div>
            <div className="wind-stat-lbl">Speed km/h</div>
          </div>
          <div className="wind-stat">
            <div className="wind-stat-val">{hero.windDirStr}</div>
            <div className="wind-stat-lbl">Direction</div>
          </div>
        </div>
      </div>
    </div>
  );
}
